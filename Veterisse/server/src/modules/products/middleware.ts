export const validateNewProduct = (req, res, next) => {
  const { name, price, stock } = req.body;

  if (!name || !price || !stock) {
    return res.status(400).json({ error: 'Faltan datos del producto' });
  }

  if (typeof name !== 'string' || typeof price !== 'number' || typeof stock !== 'number') {
    return res.status(400).json({ error: 'Datos del producto inválidos' });
  }

  next();
}