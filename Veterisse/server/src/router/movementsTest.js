const movementsRouter = require('express').Router();
const { inventoryMovements } = require('../store.js');


const getMovements = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(inventoryMovements);
    } catch (error) {
      reject(error);
    }
  });
}

movementsRouter.get('/', async (req, res) => {
  try {
    getMovements()
      .then(movements => {
        res.status(200).json(movements);
      })
      .catch(error => {
        console.error('Error fetching movements:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  } catch (error) {
    console.error('Error fetching movements:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

module.exports = movementsRouter;