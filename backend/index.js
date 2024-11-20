require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Routers
const productRouter = require('./src/modules/product/product.routes');
const subastaRouter = require('./src/modules/subasta/subasta.routes');

const app = express();
const PORT = process.env.PORT;
const ORG = process.env.ORIGIN_CORS;

// Enable CORS
const corsOptions = {
  origin: ORG,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.options('', cors(corsOptions));
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Actualiza la conexión a MongoDB
mongoose.connect(process.env.DBUrl);

app.get('/', async (request, response) => {
  return response.send('Backend HOME node js express');
});

// Routers
app.use('/product', productRouter);
app.use('/subasta', subastaRouter);

app.listen(PORT, () => {
  console.log(` app listening on port http://localhost:${PORT}`);
});
