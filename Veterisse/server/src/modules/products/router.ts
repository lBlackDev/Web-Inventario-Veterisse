
import express from 'express';
import type { ProductType } from '@/types';
import {
  getProducts, 
  getProductsById, 
  addProduct,
  getIdProduct,
  getCodeProduct,
  updateProduct,
  deleteProduct
} from './controller';

// const sql = require('mssql');
// import { sqlConfig, connectToDatabase } from '../config/VeterisseBD'
const product = express.Router();


/*
//Test de conexión raíz
product.get('/', async (_, res) => {
  try {
    await connectToDatabase()
      .then((conn) => {
        conn.request().query('SELECT * FROM products')
          .then((product: {recordset: any}) => {
            res.json(product.recordset); 
          })
          .catch((err: {message: string}) => {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).json({ error: 'Fallo al consultar la BD', details: err.message });
          });
      })
      .catch((err) => {
        console.error('Error al conectar a la base de datos:', err);
        res.status(500).json({ error: 'Fallo al conectar a la BD', details: err.message });
      })
  } catch (err: any) {
    res.status(500).json({ error: 'Fallo al consultar la BD', details: err.message });
  }
});

Endpoint para productos
product.get('/products', async (_, res) => {
  try {
    const pool = await sql.connect(sqlConfig);
    const result = await pool.request().query('SELECT * FROM productos');
    res.json(result.recordset);
  } catch (err: any) {
    res.status(500).json({ error: 'Fallo al consultar la BD', details: err.message });
  }
});


*/


// All Products
product.get('/', (_, res) => {
  getProducts()
    .then(data => JSON.parse(JSON.stringify(data)))
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener los productos', details: error.message })
      console.log(error);
    });
})

// Get Product by ID
product.get('/:id', (req, res) => {
  const { id } = req.params;

  getProductsById(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }

      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener el producto', details: error.message });
      console.log(error);
    });
})

// new product
product.post('/', async (req, res) => {
  const data = req.body

  if (!data || !data.name || !data.category || !data.price) {
    res.status(400).json({ status: 400, error: 'No se proporcionaron datos' });
    return;
  }

  // TODO : Validar los datos del producto antes de agregarlo o de su existencia en el body
  const newProduct: ProductType = {
    id: getIdProduct(),
    code: getCodeProduct(),
    name: data.name,
    img: data.img || '',
    description: data.description || '',
    category: data.category,
    stock: data.stock || 0,
    minStock: data.minStock || 0,
    price: data.price,
    costPrice: data.costPrice || 0,
    supplier: data.supplier || '',
    active: data.active || false,
  }

  try {
    addProduct(newProduct)
      .then((product) => {
        res.status(201).json(product);
      })
      .catch((error) => {
        res.status(400).json({ error: 'Error al agregar el producto', details: error.message });
        console.log(error);
      });
  } catch (error) {
    res.status(400).json({ error: 'Error al agregar el producto', details: error || 'Error desconocido' });
  }
})

// Update Product
product.put('/:id', (req, res) => {
  const { id } = req.params
  const data = req.body

  if (!data || !id) {
    res.status(400).json({ error: 'No se proporcionaron datos' });
    return;
  }

  getProductsById(id)
    .then((product) => {
      if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }

      const updatedProduct: ProductType = {
        ...product,
        ...data, // Actualiza los campos con los datos proporcionados
      };

      updateProduct(updatedProduct)
        .then(() => {
          res.status(200).json(updatedProduct);
        })
        .catch((error) => {
          res.status(400).json({ error: 'Error al actualizar el producto', details: error.message });
          console.log(error);
        });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al obtener el producto', details: error.message });
      console.log(error);
    });

})

// Delete Product
product.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'No se proporcionó el ID del producto' });
    return;
  }

  const product = await getProductsById(id)

  if (!product) {
    res.status(404).json({ error: 'Producto no encontrado' });
    return;
  }

  deleteProduct(id)
  .then(() => {
    res.status(204)
  })
  .catch((error) => {
    res.status(404).json({ message: "Producto no encontrado / No se puede eliminar el producto, tiene movimientos asociados", error: error.message });
  });

})

export default product;
