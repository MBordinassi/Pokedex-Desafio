from rest_framework import serializers
from .models import Pokemon, PokemonType, PokemonAbility

class PokemonTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PokemonType
        fields = ['name']

class PokemonAbilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = PokemonAbility
        fields = ['name', 'is_hidden']

class PokemonListSerializer(serializers.ModelSerializer):
    types = PokemonTypeSerializer(many=True, read_only=True)
    
    # Format the sprites in the same structure as PokeAPI for frontend compatibility
    sprites = serializers.SerializerMethodField()
    
    def get_sprites(self, obj):
        return {
            'front_default': obj.sprite_front_default,
            'back_default': obj.sprite_back_default,
            'front_shiny': obj.sprite_front_shiny,
            'back_shiny': obj.sprite_back_shiny,
            'other': {
                'official-artwork': {
                    'front_default': obj.sprite_official_artwork
                }
            }
        }
    
    class Meta:
        model = Pokemon
        fields = ['id', 'name', 'types', 'sprites', 'is_favorite']

class PokemonDetailSerializer(serializers.ModelSerializer):
    types = serializers.SerializerMethodField()
    abilities = serializers.SerializerMethodField()
    sprites = serializers.SerializerMethodField()
    stats = serializers.SerializerMethodField()
    
    def get_types(self, obj):
        return [
            {
                'slot': i+1,
                'type': {
                    'name': type_obj.name,
                    'url': f'https://pokeapi.co/api/v2/type/{type_obj.name}'
                }
            }
            for i, type_obj in enumerate(obj.types.all())
        ]
    
    def get_abilities(self, obj):
        return [
            {
                'ability': {
                    'name': ability.name,
                    'url': f'https://pokeapi.co/api/v2/ability/{ability.name.lower().replace(" ", "-")}'
                },
                'is_hidden': ability.is_hidden,
                'slot': i+1
            }
            for i, ability in enumerate(obj.abilities.all())
        ]
    
    def get_sprites(self, obj):
        return {
            'front_default': obj.sprite_front_default,
            'back_default': obj.sprite_back_default,
            'front_shiny': obj.sprite_front_shiny,
            'back_shiny': obj.sprite_back_shiny,
            'other': {
                'official-artwork': {
                    'front_default': obj.sprite_official_artwork
                }
            }
        }
    
    def get_stats(self, obj):
        stat_mapping = {
            'hp': 'hp',
            'attack': 'attack',
            'defense': 'defense',
            'special-attack': 'special_attack',
            'special-defense': 'special_defense',
            'speed': 'speed'
        }
        
        return [
            {
                'base_stat': getattr(obj, stat_attr),
                'effort': 0,  # We don't store effort values
                'stat': {
                    'name': stat_name,
                    'url': f'https://pokeapi.co/api/v2/stat/{stat_name}'
                }
            }
            for stat_name, stat_attr in stat_mapping.items()
        ]
    
    class Meta:
        model = Pokemon
        fields = [
            'id', 'name', 'height', 'weight', 
            'types', 'abilities', 'sprites', 'stats',
            'is_favorite'
        ]