// import express (after npm install express)
const express = require('express');

// create new express app and save it as "app"
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
    // localhost
    host: 'localhost',
    user: 'kingstonantiques_haider',
    password: 'woulzmvu54fz',
    database: 'kingstonantiques_1',
    port: 3306
});


    app.use(bodyParser.json());
  

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

// server configuration
const PORT = 9999;

// create a route for the app
app.get('/check', (req, res) => {
    connection.query('SELECT * FROM Authentication', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:\n');
        res.send(rows);
    });

});
app.post("/add_product", (req, res) => {
 
    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);
 console.log("add_product: ",req.body)
    connection.query(`INSERT INTO PRODUCTS(description,price) \
    VALUES('${req.body.description}',${req.body.price})`, (err, data)=> {
        console.log(err);
        res.status(200).json({
            message:"Product added.",
            productId: data
        });
    });
});

// make the server listen to requests
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
});