const categoriesRouter = require('express').Router();
const { products_json } = require('../store.js');


const getCategories = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(products_json);
    } catch (error) {
      reject(error);
    }
  });
}

categoriesRouter.get('', async (req, res) => {
  try {
    getCategories()
      .then(products => {
        const categories = products.reduce((acc, product) => {
          const existingCategory = acc.find(item => item.category === product.category);
          if (existingCategory) {
            existingCategory.quantity += 1;
          } else {
            acc.push({ category: product.category, quantity: 1 });
          }
          return acc;
        }, []);

        res.status(200).json(categories);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

module.exports = categoriesRouter;