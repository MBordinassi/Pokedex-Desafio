import requests
from django.conf import settings
from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiParameter
from .models import Pokemon, PokemonType, PokemonAbility
from .serializers import PokemonListSerializer, PokemonDetailSerializer, PokemonTypeSerializer

class PokemonViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Pokémon data.
    
    Provides listing, retrieving, and filtering Pokémon.
    """
    
    def get_queryset(self):
        queryset = Pokemon.objects.all().prefetch_related('types', 'abilities')
        
        # Filter by name
        name = self.request.query_params.get('name')
        if name:
            queryset = queryset.filter(name__icontains=name)
        
        # Filter by type
        type_param = self.request.query_params.get('type')
        if type_param:
            queryset = queryset.filter(types__name__iexact=type_param)
        
        # Filter favorites
        if self.action == 'favorites':
            queryset = queryset.filter(is_favorite=True)
            
        return queryset
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return PokemonDetailSerializer
        return PokemonListSerializer
    
    @extend_schema(
        parameters=[
            OpenApiParameter(name='name', description='Filter by Pokémon name', required=False, type=str),
            OpenApiParameter(name='type', description='Filter by Pokémon type', required=False, type=str),
        ]
    )
    def list(self, request, *args, **kwargs):
        """
        List Pokémon with optional filtering by name and type.
        
        If the database is empty, fetch initial data from the PokéAPI.
        """
        queryset = self.get_queryset()
        
        # If there are no Pokémon in the database, fetch initial data from PokeAPI
        if not Pokemon.objects.exists():
            self._fetch_initial_pokemon_data()
            queryset = self.get_queryset()
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve a specific Pokémon by ID.
        
        If it doesn't exist in the database, fetch it from the PokéAPI.
        """
        try:
            pokemon = Pokemon.objects.get(pk=kwargs['pk'])
            serializer = self.get_serializer(pokemon)
            return Response(serializer.data)
        except Pokemon.DoesNotExist:
            # Fetch from PokeAPI if not in our DB
            try:
                pokemon_data = self._fetch_pokemon_from_api(kwargs['pk'])
                # Create Pokemon instance from API data
                pokemon = self._create_pokemon_from_api_data(pokemon_data)
                serializer = self.get_serializer(pokemon)
                return Response(serializer.data)
            except Exception as e:
                return Response(
                    {"error": "Pokémon not found in database or PokeAPI."},
                    status=status.HTTP_404_NOT_FOUND
                )
    
    @extend_schema(description="List all available Pokémon types")
    @action(detail=False, methods=['get'])
    def types(self, request):
        """
        List all available Pokémon types.
        """
        types = PokemonType.objects.all().order_by('name')
        types_list = [type_obj.name for type_obj in types]
        return Response({"types": types_list})
    
    @extend_schema(description="List favorite Pokémon")
    @action(detail=False, methods=['get'])
    def favorites(self, request):
        """
        List favorite Pokémon.
        """
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @extend_schema(description="Toggle favorite status for a Pokémon")
    @action(detail=True, methods=['post'])
    def favorite(self, request, pk=None):
        """
        Toggle whether a Pokémon is marked as a favorite.
        """
        try:
            pokemon = Pokemon.objects.get(pk=pk)
            pokemon.is_favorite = not pokemon.is_favorite
            pokemon.save()
            return Response({
                "id": pokemon.id,
                "name": pokemon.name,
                "is_favorite": pokemon.is_favorite
            })
        except Pokemon.DoesNotExist:
            # Try to fetch from API first
            try:
                pokemon_data = self._fetch_pokemon_from_api(pk)
                pokemon = self._create_pokemon_from_api_data(pokemon_data)
                pokemon.is_favorite = True
                pokemon.save()
                return Response({
                    "id": pokemon.id,
                    "name": pokemon.name,
                    "is_favorite": pokemon.is_favorite
                })
            except:
                return Response(
                    {"error": "Pokémon not found"},
                    status=status.HTTP_404_NOT_FOUND
                )
    
    def _fetch_initial_pokemon_data(self, limit=60):
        """
        Fetch initial Pokémon data from the PokéAPI to populate the database.
        """
        try:
            response = requests.get(f"{settings.POKEAPI_URL}/pokemon?limit={limit}")
            response.raise_for_status()
            results = response.json().get('results', [])
            
            for result in results:
                pokemon_url = result['url']
                pokemon_response = requests.get(pokemon_url)
                pokemon_response.raise_for_status()
                self._create_pokemon_from_api_data(pokemon_response.json())
                
        except requests.RequestException as e:
            print(f"Error fetching initial Pokémon data: {e}")
    
    def _fetch_pokemon_from_api(self, pokemon_id):
        """
        Fetch a specific Pokémon from the PokéAPI.
        """
        response = requests.get(f"{settings.POKEAPI_URL}/pokemon/{pokemon_id}")
        response.raise_for_status()
        return response.json()
    
    def _create_pokemon_from_api_data(self, data):
        """
        Create or update a Pokémon model from PokéAPI data.
        """
        pokemon, created = Pokemon.objects.update_or_create(
            id=data['id'],
            defaults={
                'name': data['name'],
                'height': data['height'],
                'weight': data['weight'],
                'sprite_front_default': data['sprites'].get('front_default'),
                'sprite_back_default': data['sprites'].get('back_default'),
                'sprite_front_shiny': data['sprites'].get('front_shiny'),
                'sprite_back_shiny': data['sprites'].get('back_shiny'),
                'sprite_official_artwork': data['sprites'].get('other', {}).get('official-artwork', {}).get('front_default'),
            }
        )
        
        # Process types
        pokemon.types.clear()
        for type_data in data['types']:
            type_name = type_data['type']['name']
            type_obj, _ = PokemonType.objects.get_or_create(name=type_name)
            pokemon.types.add(type_obj)
        
        # Process abilities
        pokemon.abilities.clear()
        for ability_data in data['abilities']:
            ability_name = ability_data['ability']['name'].replace('-', ' ')
            ability_obj, _ = PokemonAbility.objects.get_or_create(
                name=ability_name,
                defaults={'is_hidden': ability_data['is_hidden']}
            )
            pokemon.abilities.add(ability_obj)
        
        # Process stats
        stat_mapping = {
            'hp': 'hp',
            'attack': 'attack',
            'defense': 'defense',
            'special-attack': 'special_attack',
            'special-defense': 'special_defense',
            'speed': 'speed'
        }
        
        for stat_data in data['stats']:
            stat_name = stat_data['stat']['name']
            if stat_name in stat_mapping:
                setattr(pokemon, stat_mapping[stat_name], stat_data['base_stat'])
        
        pokemon.save()
        return pokemon


class PokemonTypeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for Pokémon types.
    """
    queryset = PokemonType.objects.all()
    serializer_class = PokemonTypeSerializer