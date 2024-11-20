const productModel = require('../../models/product.model');

async function getAll() {
  try {
    const products = await productModel.find({ estado: 'activo' });
    return products;
  } catch (error) {
    console.error('Error al obtener todos los productos:', error);
    throw new Error('Hubo un error al obtener los productos activos.');
  }
}

async function create(product) {
  try {
    const newProduct = await productModel.create(product);
    return {
      success: true,
      message: 'Producto creado correctamente.',
      data: newProduct,
    };
  } catch (error) {
    console.error('Error al crear el producto:', error);
    throw new Error('Hubo un error al crear el producto.');
  }
}

async function insertMany(products) {
  try {
    const result = await productModel.insertMany(products);
    return {
      success: true,
      message: 'Productos insertados correctamente.',
      data: result,
    };
  } catch (error) {
    console.error('Error al insertar múltiples productos:', error);
    throw new Error('Hubo un error al insertar los productos.');
  }
}

async function updateOne(id, updateData) {
  try {
    const result = await productModel.updateOne(
      { _id: id },
      { $set: updateData }
    );

    if (result.nModified > 0) {
      return { success: true, message: 'Producto actualizado correctamente.' };
    } else {
      return {
        success: false,
        message: 'No se encontraron cambios o el producto no existe.',
      };
    }
  } catch (error) {
    console.error('Error actualizando el producto:', error);
    throw new Error('Hubo un error al actualizar el producto.');
  }
}

async function cancelar(id) {
  try {
    const result = await productModel.updateOne(
      { _id: id },
      { $set: { estado: 'cancelado' } }
    );

    if (result.nModified > 0) {
      return { success: true, message: 'Producto cancelado correctamente.' };
    } else {
      return {
        success: false,
        message: 'No se pudo cancelar el producto, tal vez no exista.',
      };
    }
  } catch (error) {
    console.error('Error al cancelar el producto:', error);
    throw new Error('Hubo un error al cancelar el producto.');
  }
}

module.exports = { getAll, create, insertMany, updateOne, cancelar };
