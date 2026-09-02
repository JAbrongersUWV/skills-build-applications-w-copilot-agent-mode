import express from 'express';
import { createApiRouter } from './routes.js';

export const port = Number(process.env.PORT) || 8000;
export const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${port}`;

const app = express();
app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.get('/api', (_request, response) => {
  response.json({ apiBaseUrl, routes: ['/users/', '/teams/', '/activities/', '/leaderboard/', '/workouts/'] });
});

app.use('/api', createApiRouter());

export default app;