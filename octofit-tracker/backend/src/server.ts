import { connectDatabase } from './config/database.js';
import app from './index.js';

const port = Number(process.env.PORT) || 8000;
const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${port}`;

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

void startServer();