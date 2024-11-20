const express = require('express');
const router = express.Router();
const prServices = require('./product.services');

router.get('/get', async (req, res) => {
  try {
    const product = await prServices.getAll();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/create', async (req, res) => {
  try {
    await prServices.create(req.body);
    res.status(201).json({ message: 'Producto insertado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/insert-many', async (req, res) => {
  try {
    await prServices.insertMany(req.body);
    res.status(201).json({ message: 'Productos insertados correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    await prServices.updateOne(req.params.id, req.body);
    res.status(201).json({ message: 'Producto modificado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/cancelar/:id', async (req, res) => {
  try {
    await prServices.cancelar(req.params.id);
    res.status(201).json({ message: 'Producto cancelado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
