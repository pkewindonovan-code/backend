import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crudRoutes from './routes/crudRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origen no permitido por CORS'));
  }
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API CRUD funcionando correctamente' });
});

app.use('/api', crudRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend activo en puerto ${PORT}`);
});
