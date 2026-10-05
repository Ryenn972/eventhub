import express from 'express';

const app = express();
app.get('/api/health', (_req, res) => res.json({ status: 'ok', version: 2 }));
app.listen(3000, () => console.log('API on : http://localhost:3000'));
