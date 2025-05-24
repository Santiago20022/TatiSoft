// backend/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// Conexión a la base de datos (sin desestructurar porque connectDB ya no se exporta)
require('./config/db');

const bultoRoutes = require('./routes/bulto.routes');

const app = express();

app.use(cors());
app.use(express.json()); // Parseo de solicitudes en JSON

// Rutas 
app.use('/api', bultoRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
