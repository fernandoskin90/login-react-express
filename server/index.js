const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// mongo setup
const connectMongo = require('./mongo');
// routes
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

// connectMongo
connectMongo();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, resp) => {
  return resp.json({
    text: 'Hola Mundo'
  });
});

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`> API ready on localhost: ${PORT}`);
});
