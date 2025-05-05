require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { db } = require('./config/firebase');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;

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

app.listen(PORT, () => {
  console.log(`🚀 API escuchando en http://localhost:${PORT}/`);
});
