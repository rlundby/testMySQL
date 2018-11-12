const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// CORS Error Handling
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        return res.status(200).json({});
    }
    next();
});

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
const getProductsRoute = require('./routes/getProducts');
app.use('/api/getProducts', getProductsRoute);
// Export
module.exports = app;