const productsTest = require('express').Router();

const { products_json } = require('../store'); 


const products = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(products_json);
    } catch (error) {
      reject(error);
    }
  });
}

productsTest.get('/', (req, res) => {
  products()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener los productos', details: error.message });
    });
})

module.exports = productsTest;