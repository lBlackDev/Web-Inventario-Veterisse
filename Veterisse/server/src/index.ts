require('dotenv').config();
import express from "express";
import routeProducts from './router/products';
import routerMovements from './router/movements';
import routerCategories from './router/categories';

const cors = require('cors');

const app = express();


app.use((req, _, next) => {
  console.log(`Solicitud recibida en: ${req.originalUrl}`)
  next()
})

app.use(cors());
app.use(express.json());

app.use('/api/products', routeProducts); 
app.use('/api/inventory', routerMovements);
app.use('/api/categories', routerCategories)

const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
  console.log(`🚀 API escuchando en http://localhost:${PORT}/`);
});