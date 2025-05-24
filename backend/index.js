// backend/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

require('./config/db');

const bultoRoutes = require('./routes/bulto.routes');
const pilaRoutes = require('./routes/pila.routes'); // 👈 NUEVO
const reporteRoutes = require('./routes/reporte.routes'); // 👈 NUEVO

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', bultoRoutes);
app.use('/api', pilaRoutes); // 👈 NUEVO
app.use('/api', reporteRoutes); // 👈 NUEVO

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
