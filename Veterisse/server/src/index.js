require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { db } = require('./config/firebase');
const {productos_json} = require('./store.js');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;

const productos = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(productos_json);
    }, 2000)
  })
}

app.use(express.json());
// Test de conexión raiz
app.get('/', async (_, res) => {
    try {
      const snapshot = await db.collection('item').get();
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Fallo al consultar la BD', details: err.message });
    }
  });

app.get('/productos', async (_, res) => {
  productos()
  .then((productos) => {
    res.json(productos);
  })
})

app.listen(PORT, () => {
  console.log(`🚀 API escuchando en http://localhost:${PORT}/`);
});