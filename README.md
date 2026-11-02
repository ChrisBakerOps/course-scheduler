# Aurora CS Course Scheduler

A React app that lists the Aurora CS course catalog, tracks which courses a student has completed, and enforces prerequisites. CSC3700, Milestone 1 (React + JSON Server).

Authors: Christopher Baker and Aidan Murphy

## Requirements

Node.js and npm installed.

## Setup

1. Clone the repository and open the project folder:

```
git clone https://github.com/ChrisBakerOps/course-scheduler
cd course-scheduler
```

2. Install the packages:

```
npm install
```

3. Create your `.env` file by copying the example:

```
cp .env.example .env
```

## Run the project

You need two terminals open at the same time, both inside the project folder.

**Terminal 1: start JSON Server**

```
npx json-server --watch db/db.json --port 3333
```

**Terminal 2: start the app**

```
npm run dev
```

Then open http://localhost:5173 in your browser.