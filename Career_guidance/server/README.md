# Backend (Express + MongoDB)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the `server/` directory with the following content:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
   Replace `your_mongodb_connection_string` with your actual MongoDB URI.

3. Start the backend server:
   ```bash
   npm run start:backend
   ```

## Development

To run both frontend and backend together:
```bash
npm run dev
```

## API
- Health check: `GET /`
- Add your REST API endpoints in `server/index.js` or separate route files.

## College API

Base URL: `/api/colleges`

- `GET /api/colleges` — Get all colleges
- `GET /api/colleges/:id` — Get a college by ID
- `POST /api/colleges` — Create a new college (body: `{ name, country, description }`)
- `PUT /api/colleges/:id` — Update a college (body: `{ name, country, description }`)
- `DELETE /api/colleges/:id` — Delete a college

## College Auth API

Base URL: `/api/colleges`

- `POST /api/colleges/signup` — College signup (body: `{ name, email, password, country, description }`)
- `POST /api/colleges/login` — College login (body: `{ email, password }`), returns JWT and college info
- `GET /api/colleges/me` — Get current college profile (JWT required in Authorization header) 