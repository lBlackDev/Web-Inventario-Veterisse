import express from "express";
import inventoryMovements from "../store/movementsHistory.json";
import { MovementsType } from "@/types";
import { HandleData } from "../utils/handleData";
const movementsRouter = express.Router();


const getMovements = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(inventoryMovements);
    } catch (error) {
      reject(error);
    }
  });
}

movementsRouter.get('/movements', async (_, res: any) => {
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

// movementsRouter.post('/movements', (req: any, res: any) => {
//   try{

//     const data = req.body;

//     if (!data) {
//       return res.status(400).json({ status: 400, message: 'No se proporcionaron datos' });
//     }

//     const HJson = new HandleData('../store/movementsHistory.json');

//     const getId = HJson.getId();

//     const newMovement: MovementsType = {
//       id: getId,
//       type: data.type,
//       description: data.description,
//       date: data.date,
//       quantity: data.quantity,
//       products: data.products,
//       reference: data.reference,
//     }

//     console.log("Procesando objeto")
//     HJson.addData(newMovement);

//     console.log("Finalizado")
//     res.status(200).json({ status: 200, message: 'Movimiento agregado correctamente', data: newMovement });
//   }
//   catch (error: any) {
//     console.error('Error al agregar el movimiento:', error.message);
//     res.status(500).json({ status: 500, message: 'Error al agregar el movimiento', details: error.message });
//   }
// })

export default movementsRouter;