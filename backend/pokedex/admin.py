from django.contrib import admin
from .models import Pokemon, PokemonType, PokemonAbility

@admin.register(Pokemon)
class PokemonAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'display_types', 'is_favorite')
    list_filter = ('is_favorite', 'types')
    search_fields = ('name', 'id')
    
    def display_types(self, obj):
        return ", ".join([t.name for t in obj.types.all()])
    display_types.short_description = 'Types'

@admin.register(PokemonType)
class PokemonTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(PokemonAbility)
class PokemonAbilityAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_hidden')
    list_filter = ('is_hidden',)
    search_fields = ('name',)