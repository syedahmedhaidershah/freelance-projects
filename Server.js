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
    connection.query(`INSERT INTO Products(description,price) \
    VALUES('${req.body.description}',${req.body.price})`, (err, data)=> {
        console.log(err);
        res.status(200).json({
            message:"Product added.",
            productId: data
        });
    });
});

app.post("/add_invoice", (req, res) => {
 
    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);
 console.log("add_product: ",req.body)
    connection.query(`INSERT INTO Products(id,
        stallId,
        productId,
        description,
        price,
        finalPrice,
        salesPersonId,
        stallHolderId,
        dateTime,
        paymentMethod,
        total,
        customerId,
        quantity
        ) \
    VALUES('${req.body.id}'
    ,${req.body.stallId}
    ,${req.body.productId}
    ,${req.body.description}
    ,${req.body.price}
    ,${req.body.finalPrice}
    ,${req.body.salesPersonId}
    ,${req.body.stallHolderId}
    ,${req.body.dateTime}
    ,${req.body.paymentMethod}
    ,${req.body.total}
    ,${req.body.customerId}
    ,${req.body.quantity})`, (err, data)=> {
        if(!err){
        res.status(200).json({
            message:"Invoice added.",
            productId: data
        });
    } else {
        res.status(400).json({
            message:err
        });
    }
    });
});

// make the server listen to requests
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
});