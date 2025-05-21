# Food API Project

A full-stack application that allows users to search for recipes and get detailed information about them using the Spoonacular API.

## Project Structure

```
food-api-project/
├── api/             # Backend server
├── client/          # Frontend application
├── package.json     # Root package.json for managing both client and server
└── README.md        # This file
```

## Prerequisites

- Node.js (v14 or higher)
- pnpm (v6 or higher)
- Spoonacular API key (get it from https://spoonacular.com/food-api)

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd food-api-project
```

2. Install dependencies for all parts of the application:

```bash
pnpm install:all
```

3. Create a `.env` file in the `api` directory with your Spoonacular API key:

```
SPOONACULAR_API_KEY=your_api_key_here
PORT=3001
```

## Running the Application

To run both the client and server concurrently:

```bash
pnpm start
```

Or run them separately:

- API server: `npm run start:api`
- Client: `npm run start:client`

## API Endpoints

The server provides the following endpoints:

- `GET /api/search?query=<search-term>` - Search for recipes

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express
- API: Spoonacular Food API
- Package Management: pnpm
