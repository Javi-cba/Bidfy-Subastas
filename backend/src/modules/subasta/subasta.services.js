const productModel = require('../../models/product.model');

async function get(idProduct) {
  try {
    const product = await productModel.findById(idProduct, 'ofertas');
    return product ? product.ofertas : null;
  } catch (error) {
    console.error('Error al obtener las ofertas:', error);
    throw new Error('Error al obtener las ofertas del producto');
  }
}

async function create(idProduct, subasta) {
  try {
    const result = await productModel.updateOne(
      { _id: idProduct },
      { $push: { ofertas: subasta } }
    );

    if (result.nModified === 0) {
      throw new Error(
        'No se pudo agregar la oferta, el producto no fue encontrado'
      );
    }

    return result;
  } catch (error) {
    console.error('Error al crear una oferta:', error);
    throw new Error('Error al crear una nueva oferta');
  }
}

async function cancelar(idProduct, idSubasta) {
  try {
    const result = await productModel.updateOne(
      { _id: idProduct },
      { $pull: { ofertas: { _id: idSubasta } } }
    );

    if (result.nModified === 0) {
      throw new Error('No se pudo cancelar la oferta, puede que no exista');
    }

    return result;
  } catch (error) {
    console.error('Error al cancelar la oferta:', error);
    throw new Error('Error al cancelar la oferta del producto');
  }
}

module.exports = { get, create, cancelar };
