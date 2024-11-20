const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  categoria: {
    type: String,
    required: true,
    enum: [
      'Electrónica',
      'Moda',
      'Libros',
      'Hogar',
      'Juguetes',
      'Arte',
      'Autos',
      'Inmuebles',
      'Otro',
    ],
  },
  imgUrls: {
    type: [String],
    required: true,
  },
  precioInit: {
    type: Number,
    required: true,
    min: 0,
  },
  caducaSubasta: {
    type: Date,
    required: true,
  },
  vendedor: {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    imgUrl: {
      type: String,
    },
  },
  ofertas: [
    {
      usuario: {
        email: {
          type: String,
          trim: true,
        },
        imgUrl: {
          type: String,
          required: true,
        },
      },
      monto: {
        type: Number,
        min: 0,
      },
      fecha: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  estado: {
    type: String,
    enum: ['activo', 'finalizado', 'cancelado'],
    default: 'activo',
  },
  creadoEn: {
    type: Date,
    default: Date.now,
  },
});

// Crea el modelo
const Product = mongoose.model('productSubasta', productSchema);

module.exports = Product;
