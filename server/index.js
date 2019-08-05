const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// mongo setup
const connectMongo = require('./mongo');
const routerUser = require('./routes/user');
const routerPosts = require('./routes/posts');

const PORT = process.env.PORT || 5000;

const app = express();

// connectMongo
connectMongo();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Config Routes
app.use('/user', routerUser);
app.use('/posts', routerPosts);

app.listen(PORT, () => {
  console.log(`> API ready on localhost: ${PORT}`);
});
