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

productsTest.post('/', (req, res) => {

  const {formatPrice, formatPriceOption, formatText, checkEmail, table} = req.body

  let tableVerify = table 

  if(!table) {
    res.status(400).json({
      status: 400,
      msg: "No estas enviando todo lo requerido",
    })
    return
  }


  if (formatPrice) {
    try{

      tableVerify = tableVerify.map((table) => {
        let priceVerify = typeof table.price === typeof Number 
          ? table.price
          : /^\d+$/.test(table.price) 
          ? Number(table.price)
          : false
          
        
        const priceFormat =  new Intl.NumberFormat(formatPriceOption.locale || "es-CL", {
          style: "currency",
          currency: formatPriceOption.moneda || "CLP",
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2,
        }).format(priceVerify || 0)

        return {...table, price: priceFormat, priceError: !priceVerify}
      })
    }
    catch(error){
      res.status(400).json({
        msg: "Se encontro un error con la configuracion para el formato de los numeros",
        status: 400,
        error: error
      })
    }
  }

  if (formatText) {
    tableVerify = tableVerify.map((table) =>  ({...table, nombre: table.nombre.charAt(0).toUpperCase().concat(table.nombre.slice(1, table.nombre.lenght))}) )
  }

  if (checkEmail) {
    tableVerify = tableVerify.map((table) => {
      const email = table.email

      const verify = /[\w]+@(gmail\.com|hotmail\.com)/.test(email)

      return verify 
        ? {...table, email, emailError: false}
        : {...table, email, emailError: true}
    })
  }

  res.json({
    status: 200,
    msg: "Funciona perfectamente",
    table: tableVerify
  })
})

module.exports = productsTest;