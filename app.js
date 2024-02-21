require('dotenv').config();
//async errors

const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

//middlewares
app.use(express.json());

//Routes

app.get('/', (req, res) => {
  res.send('<h1>Store-API</h1><a href="/api/v1/products">Products Route</a>');
});

//Products Routes

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, console.log(`Server started on port: ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
