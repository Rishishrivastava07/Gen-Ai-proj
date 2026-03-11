# InterviewForgeAI

Gen-AI Interview Planner is a full-stack web app that generates a personalized interview preparation report from a job description and a candidate profile. Users can register, sign in, upload a resume or enter a short self-description, and receive an AI-generated interview plan with technical questions, behavioral questions, skill gaps, a match score, and a day-by-day preparation roadmap.

## Features

- User authentication with JWT stored in HTTP-only cookies
- Protected frontend routes for authenticated users
- Resume upload with server-side file handling
- AI-generated interview reports based on:
  - job description
  - resume text
  - self-description
- Saved interview history per user
- Detailed report view with:
  - match score
  - technical interview questions
  - behavioral interview questions
  - skill gap analysis
  - preparation roadmap

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Sass
- Axios

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Multer for file uploads
- `pdf-parse` for resume text extraction
- Google Gemini via `@google/genai`
- Zod for AI response validation

## Project Structure

```text
Gen-AI/
├── Frontend/   # React + Vite client
└── Backend/    # Express API + MongoDB + Gemini integration
```

## How It Works

1. A user registers or logs in.
2. The user submits a job description and either:
   - a resume file, or
   - a self-description
3. The backend extracts resume text when a PDF is uploaded.
4. The backend sends the candidate context and job description to Gemini.
5. Gemini returns structured JSON for the interview report.
6. The backend validates and stores the report in MongoDB.
7. The frontend displays the saved report and previous report history.

## Environment Variables

### Backend

Create `Backend/.env` from `Backend/.env.example`:

```env
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
GOOGLE_API_KEY=your_google_ai_api_key
```

### Frontend

Create `Frontend/.env` from `Frontend/.env.example`:

```env
VITE_API_URL=http://localhost:3000
```

## Local Development

### 1. Install dependencies

```bash
cd Backend
npm install

cd ../Frontend
npm install
```

### 2. Start the backend

```bash
cd Backend
npm run dev
```

### 3. Start the frontend

```bash
cd Frontend
npm run dev
```

Frontend runs on `http://localhost:5173`.

Backend runs on `http://localhost:3000`.

## Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

### Backend

```bash
npm run dev
npm start
```

## API Overview

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/logout`
- `GET /api/auth/get-me`

### Interview Reports

- `POST /api/interview`
- `GET /api/interview`
- `GET /api/interview/:interviewId`

## Deployment

Recommended deployment split:

- Frontend: Vercel or Netlify
- Backend: Render or Railway
- Database: MongoDB Atlas

Production configuration:

- Set `Frontend` environment variable:
  - `VITE_API_URL=https://your-backend-url`
- Set `Backend` environment variables:
  - `NODE_ENV=production`
  - `CLIENT_URL=https://your-frontend-url`
  - `MONGO_URI`
  - `JWT_SECRET`
  - `GOOGLE_API_KEY`

## Notes and Current Limitations

- The backend currently extracts text from PDF resumes. The frontend UI mentions DOCX, but the backend parser is currently PDF-based.
- There are no automated tests yet.
- Gemini API usage may incur cost depending on your Google AI plan and traffic.

## Security Notes

- Do not commit `.env` files.
- Rotate secrets before public deployment if they were ever exposed locally or committed by mistake.
- Keep production secrets only in your hosting provider's environment variable settings.

## Future Improvements

- Add automated tests for auth and report generation flows
- Add stronger form validation and API error handling
- Add DOCX parsing support
- Add report export and sharing features
- Add loading and empty-state polish across screens
