# News Article App 📰

A full-stack news application for browsing, commenting, and voting on articles. Built with React and powered by a RESTful API.

[Live Demo](https://aloisa.netlify.app) | [Backend Repository](https://github.com/Alsamri/nc_project_news)

## Features

- 📖 Browse and filter articles by topic
- 🖼️ View full articles with images
- 👍👎 Upvote and downvote articles and comments
- 💬 Post and delete your own comments
- 📱 Fully responsive design

## Tech Stack

**Frontend:**
- React with React Router
- Axios for API requests
- Modern CSS with responsive design
- Vite build tool

**Backend:**
- Node.js & Express
- PostgreSQL database
- RESTful API architecture

## Prerequisites

- Node.js v23.3.0 or higher
- Docker (optional, for containerized setup)

## Getting Started

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Alsamri/fe_nc_news.git
   cd fe_nc_news
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

### Docker Setup

1. **Start the container**
   ```bash
   docker compose up --build
   ```

2. **Access the app**
   
   Open `http://localhost:5173` in your browser

3. **Stop the container**
   ```bash
   docker compose down
   ```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── utils/          # API utilities and helpers
│   ├── App.jsx         # Main app component
│   └── index.css       # Global styles
├── public/             # Static assets
├── Dockerfile          # Docker configuration
├── docker.yaml         # Docker Compose setup
└── vite.config.js      # Vite configuration
```

## API Integration

This frontend connects to the NC News API. Make sure the backend is running on `http://localhost:9000` or update the API base URL in your configuration.

Backend repository: [NC News API](https://github.com/Alsamri/nc_project_news)



---

**Portfolio Project:** Created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
