require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = new mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    port : process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
})
//Abrimos Conexion a la base de datos
pool.on('connection', conn => {
    console.log('Conectado a la base de datos MySQL');
    conn.on('error', err => {
        console.error('Error en la conexión a la base de datos:', err);
    });
    conn.on('close', () => {
        console.log('Conexión cerrada a la base de datos MySQL');
    });
});

module.exports = pool;
