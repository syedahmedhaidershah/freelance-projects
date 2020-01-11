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

app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();

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
app.get('/get_invoices', (req, res) => {
    connection.query('SELECT * FROM Invoices', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:\n');
        res.send(rows);
    });

});
app.get('/get_products', (req, res) => {
    connection.query('SELECT * FROM Products', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:\n');
        res.send(rows);
    });

});
app.get('/get_products_id', (req, res) => {
    console.log(req.query.id);

    connection.query(`SELECT * FROM Products WHERE id = ${req.query.id}`, (err, rows) => {
        if (err) throw err;
        
        console.log('Data received from Db:\n');
        res.send(rows);
    });

});
app.get('/get_products_code', (req, res) => {
    console.log(req.query.code);

    connection.query(`SELECT * FROM Products WHERE barcode = '${req.query.code}'`, (err, rows) => {
        if (err) throw err;
        
        console.log('Data received from Db:\n');
        res.send(rows);
    });

});
app.get('/get_stall_id', (req, res) => {
    console.log(req.query.id);

    connection.query(`SELECT * FROM Stall WHERE id = '${req.query.id}'`, (err, rows) => {
        if (err) throw err;
        
        console.log('Data received from Db:\n');
        res.send(rows);
    });

});

app.get('/get_stalls', (req, res) => {
    connection.query('SELECT * FROM Stall', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:\n');
        res.send(rows);
    });

});
app.get('/get_stall_holders', (req, res) => {
    connection.query('SELECT * FROM StallHolder', (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:\n');
        res.send(rows);
    });

});
app.get('/get_stall_holder_id', (req, res) => {
    connection.query(`SELECT * FROM StallHolder where id = ${req.query.id}`, (err, rows) => {
        if (err) throw err;
        console.log('Data received from Db:\n');
        res.send(rows);
    });

});
app.post("/add_product", (req, res) => {

    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);
    console.log("add_product: ", req.body)

    var code = Math.floor(Math.random() * (99999 - 10000 + 1)) + min;

    connection.query(`INSERT INTO Products(description,price,barcode) \
    VALUES('${req.body.description}',${req.body.price},'${code}')`, (err, data) => {

        if (!err) {
            res.status(200).json({
                message: "Product added.",
                productId: data
            });
        } else {
            console.log(err);
            res.status(400).json({
                message: err
            });
        }
    });
});

app.post("/add_customer", (req, res) => {

    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);
    console.log("add_product: ", req.body)

    // var code = Math.floor(Math.random() * (99999 - 10000 + 1)) + min;

    connection.query(`INSERT INTO Customers( name, address, number, email) VALUES ('${req.body.name}','${req.body.address}','${req.body.number}','${req.body.email}')`, (err, data) => {

        if (!err) {
            res.status(200).json({
                message: "Customer added.",
                customerId: data
            });
        } else {
            console.log(err);
            res.status(400).json({
                message: err
            });
        }
    });
});




app.post("/edit_customer", (req, res) => {

    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);
    console.log("add_product: ", req.body)

    // var code = Math.floor(Math.random() * (99999 - 10000 + 1)) + min;

    connection.query(`UPDATE Customers SET name='${req.body.name}',address='${req.body.address}',number='${req.body.number}',email='${req.body.email}' WHERE id = ${req.body.id}`, 
     (err, data) => {

        if (!err) {
            res.status(200).json({
                message: "Customer editted.",
                customerId: data
            });
        } else {
            console.log(err);
            res.status(400).json({
                message: err
            });
        }
    });
});

app.post("/edit_stall", (req, res) => {

    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);
    console.log("edit_stall: ", req.body)

    // var code = Math.floor(Math.random() * (99999 - 10000 + 1)) + min;

    connection.query(`UPDATE Stall SET stallHolderId=${req.body.stallHolderId}  WHERE id = ${req.body.id}`, 
     (err, data) => {

        if (!err) {
            res.status(200).json({
                message: "Stall editted.",
                stallId: data
            });
        } else {
            console.log(err);
            res.status(400).json({
                message: err
            });
        }
    });
});

// app.post("/add_invoice", (req, res) => {

//     //read product information from request
//     // let product = new Product(req.body.prd_name, req.body.prd_price);
//  console.log("add_product: ",req.body)
//     connection.query(`INSERT INTO Invoices(id,stallId,productId,description,price,finalPrice,salesPersonId,stallHolderId,dateTime,paymentMethod,total,customerId,quantity) \
//     VALUES(${v.id},'${v.stallId}',${v.productId},'${req.body.description}',${req.body.price},${req.body.finalPrice},'${req.body.salesPersonId}','${req.body.stallHolderId}','${req.body.dateTime}','${req.body.paymentMethod}',${req.body.total},${req.body.customerId},${req.body.quantity})`, (err, data)=> {
//         if(!err){
//         res.status(200).json({
//             message:"Invoice added.",
//             productId: data
//         });
//     } else {
//         res.status(400).json({
//             message:err
//         });
//     }
//     });
// });

app.post("/add_invoice", (req, res) => {

    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);
    console.log("add_product: ", req.body)
    var error = null
    var body = req.body
    body.items.map(v => {
        connection.query(`INSERT INTO Invoices(id,stallId,productId,description,price,finalPrice,salesPersonId,stallHolderId,dateTime,paymentMethod,total,customerId,quantity) \
    VALUES(${v.id},'${v.stallId}',${v.productId},'${v.description}',${v.price},${v.finalPrice},'${v.salesPersonId}','${v.stallHolderId}','${v.dateTime}','${v.paymentMethod}',${body.total},${body.customerId},${v.quantity})`, (err, data) => {
            if (err) {
                error = err;
            }
        });
    })
    if (error == null) {
        res.status(200).json({
            message: "Invoice added.",
            productId: data
        });
    } else {
        res.status(400).json({
            message: error
        });
    }

});

// make the server listen to requests
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
});