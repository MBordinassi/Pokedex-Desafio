from django.db import models

class PokemonType(models.Model):
    """Model representing a Pokémon type (e.g., fire, water)."""
    name = models.CharField(max_length=50, unique=True)
    
    def __str__(self):
        return self.name

class PokemonAbility(models.Model):
    """Model representing a Pokémon ability."""
    name = models.CharField(max_length=100)
    is_hidden = models.BooleanField(default=False)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Pokemon abilities"

class Pokemon(models.Model):
    """Model representing a Pokémon."""
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    height = models.IntegerField()
    weight = models.IntegerField()
    types = models.ManyToManyField(PokemonType, related_name='pokemon')
    abilities = models.ManyToManyField(PokemonAbility, related_name='pokemon')
    
    # Sprite images
    sprite_front_default = models.URLField(null=True, blank=True)
    sprite_back_default = models.URLField(null=True, blank=True)
    sprite_front_shiny = models.URLField(null=True, blank=True)
    sprite_back_shiny = models.URLField(null=True, blank=True)
    sprite_official_artwork = models.URLField(null=True, blank=True)
    
    # Stats
    hp = models.IntegerField(default=0)
    attack = models.IntegerField(default=0)
    defense = models.IntegerField(default=0)
    special_attack = models.IntegerField(default=0)
    special_defense = models.IntegerField(default=0)
    speed = models.IntegerField(default=0)
    
    # Additional fields
    is_favorite = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"#{self.id} {self.name}"
    
    class Meta:
        ordering = ['id']