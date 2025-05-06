const router = require('express').Router();
const sql = require('mssql');
const { sqlConfig, connectToDatabase } = require('../config/VeterisseBD'); // Importar configuración desde el archivo


// Test de conexión raíz
router.get('/', async (_, res) => {
  try {
    await connectToDatabase()
      .then((conn) => {
        conn.request().query('SELECT * FROM products')
          .then((product) => {
            res.json(product.recordset); 
          })
          .catch((err) => {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).json({ error: 'Fallo al consultar la BD', details: err.message });
          });
      })
      .catch((err) => {
        console.error('Error al conectar a la base de datos:', err);
        res.status(500).json({ error: 'Fallo al conectar a la BD', details: err.message });
      })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fallo al consultar la BD', details: err.message });
  }
});

// Endpoint para productos
router.get('/products', async (_, res) => {
  try {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().query('SELECT * FROM productos');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fallo al consultar la BD', details: err.message });
  }
});


module.exports =  router;