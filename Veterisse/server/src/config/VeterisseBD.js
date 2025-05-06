require('dotenv').config(); 
const sql = require('mssql');

// Configuración de la conexión a SQL Server
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 1433, // Puerto por defecto de SQL Server
  options: {
    encrypt: false, 
    trustServerCertificate: false, 
  },
};

const connectToDatabase = async () => {
  try {
    const pool = await sql.connect(sqlConfig);
    console.log('Conexión a SQL Server exitosa');
    return pool;
  } catch (err) {
    console.error('Error al conectar a SQL Server:', err);
    throw err;
  }
};

module.exports = {sqlConfig, connectToDatabase };
