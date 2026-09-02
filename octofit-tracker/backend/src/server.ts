import { connectDatabase } from './config/database.js';
import app, { apiBaseUrl, port } from './index.js';

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