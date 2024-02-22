require('dotenv').config();
const url = process.env.MONGO_URI;
const express = require('express');
const app = express();
const connectDB = require('./db/connect.js');
const productsRouter = require('./routes/products');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());

//Routes
app.use('/api/v1/products', productsRouter);

app.get('/', (req, res) => {
  res.send('<h1>Store-API</h1><a href="/api/v1/products">Products Route</a>');
});
//Error Handlers
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB(url);
    app.listen(port, console.log(`Server started on port: ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
