require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routeProducts = require('./router/products'); 
const routerMovements = require('./router/movements')
const routerCategroies = require('./router/categories')


const app = express();


app.use((req, res, next) => {
  console.log(`Solicitud recibida en: ${req.originalUrl}`)
  next()
})

app.use(cors());
app.use(express.json());

app.use('/products', routeProducts); 
app.use('/productsTest', require('./router/productsTest')); 
app.use('/inventory', routerMovements);
app.use('/categories', routerCategroies)

const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
  console.log(`🚀 API escuchando en http://localhost:${PORT}/`);
});