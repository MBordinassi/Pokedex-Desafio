# Pokédex Application

A full-stack Pokédex application with a Django backend and React frontend.

## Features

- Browse, search, and filter Pokémon
- View detailed information for each Pokémon
- Save your favorite Pokémon
- Responsive design for all devices
- API documentation with Swagger UI

## Backend (Django)

The backend uses Django REST Framework to create a RESTful API that:

- Fetches and caches data from PokéAPI
- Stores Pokémon data in a local database
- Provides endpoints for listing, filtering, and retrieving Pokémon
- Allows marking Pokémon as favorites

### API Endpoints

- `GET /api/pokemon/` - List all Pokémon
- `GET /api/pokemon/?name=pikachu` - Filter by name
- `GET /api/pokemon/?type=fire` - Filter by type
- `GET /api/pokemon/25/` - Get details for a specific Pokémon
- `POST /api/pokemon/25/favorite/` - Toggle favorite status
- `GET /api/pokemon/favorites/` - List favorite Pokémon
- `GET /api/pokemon/types/` - List all Pokémon types

### API Documentation

API documentation is available at:
- Swagger UI: `/api/schema/swagger-ui/`
- ReDoc: `/api/schema/redoc/`

## Frontend (React)

The frontend is built with React and includes:

- Home page with application information
- Pokémon list page with filtering and pagination
- Detailed Pokémon information page
- Favorites page
- Responsive design using Tailwind CSS

## Getting Started

### Running the Backend

```bash
cd backend
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Running the Frontend

```bash
npm install
npm run dev
```

## Technologies Used

### Backend
- Django
- Django REST Framework
- SQLite
- drf-spectacular for API documentation

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite
- Axios
- React Router