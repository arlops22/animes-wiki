import 'dotenv/config';
import { App } from './app.js';

const app = new App();
const PORT = process.env['PORT'] || '8000';

app.listen(PORT);
