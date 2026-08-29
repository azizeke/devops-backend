require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const APP_VERSION = process.env.APP_VERSION || '1.0.0';

app.use(cors());
app.use(express.json());

// GET / -> Uygulamanın çalıştığını gösteren cevap
app.get('/', (req, res) => {
  res.json({
    message: 'Backend application is running'
  });
});

// GET /api/health -> Sağlık durumu
app.get('/api/health', (req, res) => {
  res.json({
    status: 'UP'
  });
});

// GET /api/info -> Uygulama bilgisi
app.get('/api/info', (req, res) => {
  res.json({
    application: 'Backend Application',
    version: APP_VERSION,
    environment: NODE_ENV
  });
});

// Tanımsız route'lar için basit 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Backend server ${PORT} portunda çalışıyor (env: ${NODE_ENV}, version: ${APP_VERSION})`);
});
