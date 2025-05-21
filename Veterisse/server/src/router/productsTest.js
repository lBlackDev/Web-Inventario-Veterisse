const productsTest = require('express').Router();
const {addProduct} = require('../utils/newProducts')
// const { products_json } = require('../store'); 
const products_json = require('../store/products.json')


const products = () => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {

        resolve(products_json);
        console.log(products_json)
      }, 10); // Simula una demora de 1 segundo en la obtención de los produc
    } catch (error) {
      reject(error);
    }
  });
}

productsTest.get('/', (req, res) => {
  products()
    .then(data => JSON.parse(JSON.stringify(data)))
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener los productos', details: error.message })
      console.log(error);
    });
})

productsTest.post('/', (req, res) => {
  const data = req.body

  if (!data) {
    res.status(400).json({ error: 'No se proporcionaron datos' });
    return;
  }

  console.log(data)

  const newProduct = {
    id: data.id,
    code: data.code,
    name: data.name,
    img: data.img,
    description: data.description,
    category: data.category,
    stock: data.stock,
    minStock: data.minStock,
    price: data.price,
    costPrice: data.costPrice,
    supplier: data.supplier,
    active: data.active,
  }

  const product = addProduct(newProduct)

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
})



module.exports = productsTest;