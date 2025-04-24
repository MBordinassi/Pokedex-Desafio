from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PokemonViewSet, PokemonTypeViewSet

router = DefaultRouter()
router.register(r'pokemon', PokemonViewSet, basename='pokemon')
router.register(r'types', PokemonTypeViewSet, basename='types')

urlpatterns = [
    path('', include(router.urls)),
]