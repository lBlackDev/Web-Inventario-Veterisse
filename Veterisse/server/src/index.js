require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const {sqlConfig, connectToDatabase} = require('./config/VeterisseBD'); // Importar configuración desde el archivo

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;


// Test de conexión raíz
app.get('/', async (_, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query('SELECT * FROM products');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fallo al consultar la BD', details: err.message });
  }
});

// Endpoint para productos
app.get('/productos', async (_, res) => {
  try {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().query('SELECT * FROM productos');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fallo al consultar la BD', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API escuchando en http://localhost:${PORT}/`);
});
