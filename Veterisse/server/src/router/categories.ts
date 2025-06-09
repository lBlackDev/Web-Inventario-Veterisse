import express from 'express';
import productsJson from '../store/products.json';

const categoriesRouter = express.Router();


const getCategories = (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    try {
      resolve(productsJson as Product[]);
    } catch (error) {
      reject(error);
    }
  });
}

interface Product {
  category: string;
  quantity?: number;
}

categoriesRouter.get('', async (_, res) => {
  try {
    getCategories()
      .then((products: Product[]) => {
        const categories = products.reduce<Product[]>((acc, product) => {
          const existingCategory: Product | any = acc.find((item: Product) => item.category === product.category);
          if (existingCategory && existingCategory.quantity) {
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

export default categoriesRouter;