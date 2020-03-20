const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// creating an Express (routing-middleware) instance
const app = express();

// constructing routers
userRouter = express.Router();
clientRouter = express.Router();

// providing a json-request(HTTP/HTTPS) parser middleware to app(Express instance)
app.use(bodyParser.json({ limit: '50mb' }));
// providing a urlencoded-request parser middleware to app(Express instance)
app.use(bodyParser.urlencoded({ extended: true }));
// providing a cross-origin requests handling middleware
app.use(cors());

app.use('/user', userRouter);
app.use('/client', clientRouter);

// exporting 'app' as a module
module.exports = app;