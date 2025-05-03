require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const pool    = require('./config/VeterisseBD');

const app = express();
app.use(cors());
app.use(express.json());
// Test de conexión raiz
app.get('/', async (_, res) => {
    try {
      const [rows] = await pool.query('select * from veterissedb.item');
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Fallo al consultar la BD', details: err.message });
    }
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 API escuchando en http://localhost:${PORT}/`);
});
