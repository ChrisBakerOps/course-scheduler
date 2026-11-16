# Aurora CS Course Scheduler

A React app that lists the Aurora CS course catalog, tracks which courses a student has completed, and enforces prerequisites. CSC3700, Milestone 2 (React + Node/Express + MySQL).

Authors: Christopher Baker and Aidan Murphy

## How it works

- **Front end:** React + Vite + Bootstrap, at http://localhost:5173
- **API:** Node + Express + mysql2, at http://localhost:3000
- **Database:** MySQL. Course data and completion state are stored in the database.

## Requirements

Node.js and npm installed, and access to a MySQL database.

## Setup

### 1. Clone the repository

```
git clone https://github.com/ChrisBakerOps/course-scheduler
cd course-scheduler
```

### 2. Create the server `.env` file

```
cp server/.env.example server/.env
```

Open `server/.env` and fill in your database values:

```
PORT=3000
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
CLIENT_ORIGIN=http://localhost:5173
```

### 3. Create the client `.env` file

```
cp .env.example .env
```

It should contain:

```
VITE_API_BASE_URL=http://localhost:3000
```

### 4. Create and fill the database

Run these two scripts against your database, in this order:

1. `server/sql/schema.sql` (creates the tables)
2. `server/sql/seed.sql` (loads courses, prerequisites, one user, and sample completions)

Check: the tables should hold 10 courses, 10 prerequisite rows, 1 user, and 2 completions.

## Run the project

You need two terminals open at the same time.

**Terminal 1: start the server**

```
cd server
npm install
npm run dev
```

You should see `Server started on http://localhost:3000`.

**Terminal 2: start the client** (from the project root)

```
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Testing the API

Open `server/requests.http` in WebStorm and run the requests. It has a request for every route, plus the error cases (404, 400 on a bad course, and 400 on a completions list that breaks a prerequisite).

## API routes

| Method | Route | Purpose |
|--------|-------|---------|
| GET | /api/courses | All courses with prerequisites |
| GET | /api/courses/:id | One course |
| POST | /api/courses | Create a course |
| PUT | /api/courses/:id | Update a course and its prerequisites |
| DELETE | /api/courses/:id | Delete a course |
| GET | /api/completions | Completed course ids |
| PUT | /api/completions | Replace the completed list (server checks prerequisites) |