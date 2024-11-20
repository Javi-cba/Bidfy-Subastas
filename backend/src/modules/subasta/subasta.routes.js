const express = require('express');
const router = express.Router();
const prServices = require('../../models/product.model');
const sbServices = require('./subasta.services');

router.get('/get/:idProduct', async (req, res) => {
  try {
    const subasta = await sbServices.get(req.params.idProduct);
    if (subasta === null) {
      return res.status(204).json({});
    } else {
      res.status(200).json(subasta);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/create/:idProduct', async (req, res) => {
  try {
    await sbServices.create(req.params.idProduct, req.body);
    res.status(201).json({ message: 'Subasta publicada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/cancelar/:idProduct/:idSubasta', async (req, res) => {
  const { idProduct, idSubasta } = req.params;
  if (!idProduct && idSubasta) {
    return res.status(400).json({ error: 'Faltan idProduct o idSubasta' });
  }

  try {
    await sbServices.cancelar(idProduct, idSubasta);
    res.status(200).json({ message: 'Subasta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
