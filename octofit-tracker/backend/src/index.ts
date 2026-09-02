import express from 'express';
import { connectDatabase } from './config/database.js';
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

async function startServer(): Promise<void> {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`Octofit API listening at ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Unable to start Octofit API:', error);
    process.exitCode = 1;
  }
}

if (process.env.NODE_ENV !== 'test') {
  void startServer();
}

export default app;