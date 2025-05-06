require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routeProducts = require('./router/products'); 


const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', routeProducts); 
app.use('/productsTest', require('./router/productsTest')); 

const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
  console.log(`🚀 API escuchando en http://localhost:${PORT}/`);
});