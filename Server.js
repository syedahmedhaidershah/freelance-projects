// import express (after npm install express)
const express = require('express');

// create new express app and save it as "app"
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const moment = require('moment');

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
    // console.log('Connected!');
});

// server configuration
const PORT = 9999;

// create a route for the app
// app.get('/check', (req, res) => {
//     connection.query('SELECT * FROM Authentication', (err, rows) => {
//         if (err) throw err;
//         // console.log('Data received from Db:\n');
//         res.send(rows);
//     });

// });

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: "FastMail",
    auth: {
        user: 'systems@fastmail.com',
        pass: 'gf7qar4smwz283zy'
    }
});

var mailOptions = {
    from: 'wadejohnson650@gmail.com',
    to: 'rizviwajahat9@yahoo.com',
    subject: 'Sending Email using Node.js',
    html: '      <tr>        <td>G1</td>        <td>G-10001</td>        <td>Sarim Irfan</td>        <td>1000012</td>        <td>chair</td>        <td>100</td>      </tr>      <tr>        <td>G1</td>        <td>G-10001</td>        <td>Sarim Irfan</td>        <td>1000012</td>        <td>chair</td>        <td>100</td>      </tr>      <tr>        <td>G1</td>        <td>G-10001</td>        <td>Sarim Irfan</td>        <td>1000012</td>        <td>chair</td>        <td>100</td>      </tr>      <tr>        <td>G1</td>        <td>G-10001</td>        <td>Sarim Irfan</td>        <td>1000012</td>        <td>chair</td>        <td>100</td>      </tr>      <tr>        <td>G1</td>        <td>G-10001</td>        <td>Sarim Irfan</td>        <td>1000012</td>        <td>chair</td>        <td>100</td>      </tr>    '
};

var beforeStall = '<title>Antiques of Kingston</title><img class=center src="cid:unique@logo.ee" alt="Logo" width="300" height="100"><style>    .center{        display: block;  margin-left: auto;  margin-right: auto;  width: 30%;    }    table {        font-family: arial, sans-serif;        border-collapse: collapse;        margin-left: 5%;        margin-right: 5%;        width: 90%;      }            td, th {        border: 1px solid #dddddd;        text-align: left;        padding: 8px;      }            tr:nth-child(even) {        background-color: #dddddd;      }</style><body>       <h2 style="text-align: center;">Daily Sales Report</h2>    <h4 style="padding-left: 5%;">Stall Number: '
var beforeStallWeek = '<title>Antiques of Kingston</title><img class=center src="cid:unique@logo.ee" alt="Logo" width="300" height="100"><style>    .center{        display: block;  margin-left: auto;  margin-right: auto;  width: 30%;    }    table {        font-family: arial, sans-serif;        border-collapse: collapse;        margin-left: 5%;        margin-right: 5%;        width: 90%;      }            td, th {        border: 1px solid #dddddd;        text-align: left;        padding: 8px;      }            tr:nth-child(even) {        background-color: #dddddd;      }</style><body>       <h2 style="text-align: center;">Weekly Sales Report</h2>    <h4 style="padding-left: 5%;">Stall Number: '
var afterStallBeforeStallHolder = '</h4>    <h4 style="padding-left: 5%;"><strong>Stall Holder\'s Name: '
var beforeTable = '</strong> </h4>        <table>      <tr>        <th>Stall No.</th>        <th>Invoice No. </th>        <th>Stall Holder</th>        <th>Stock No.</th>        <th>Item Sold</th>        <th>Price Sold</th>             </tr>           '
var beforeTableWeekly = '</strong> </h4>        <table>      <tr>        <th>Stall No.</th>        <th>Invoice No. </th>        <th>Stall Holder</th>        <th>Stock No.</th>        <th>Item Sold</th>        <th>Price Sold</th>          <th>Date/Time</th>             </tr>           '
var singleRow = '<tr> <td>G1</td>        <td>G-10001</td>        <td>Sarim Irfan</td>        <td>1000012</td>        <td>chair</td>        <td>100</td>     </tr>'
var end = '</table>    </body>'

async function compileInvoices(arr, stallId) {
    return new Promise(function (resolve, reject) {
        console.log("arr: ", arr[0]);
        var arrayToSend = [];
        arr.map((v, i) => {
            if (v.stallId == stallId) {

                arrayToSend = [...arrayToSend, v]
                // arrayToSend.push(v)
            }
            if (i == (arr.length - 1)) {
                if (arrayToSend.length > 0) {
                    console.log("StallId: " + stallId + " ", arrayToSend[0]);
                    resolve(arrayToSend);
                } else {
                    // return Promise.reject(moment() + "No invoices for " + stallId);
                }
            }
        })
    })

}

app.get('/send_weekly_report', (req, res) => {
    var stallHolders = []
    connection.query('SELECT * FROM StallHolder', (err, rows1) => {
        if (err) throw err;
        // console.log('Data received from Db:\n');
        // res.send(rows1);
        if (rows1.length > 0) {
            stallHolders = rows1
            var invoices = []
            connection.query(`SELECT * FROM NewInvoiceDetails WHERE (DATE(dateTime) BETWEEN '${moment().weekday(0).subtract(6, 'd').format("YYYY-MM-DD")}' AND '${moment().weekday(0).format("YYYY-MM-DD")}')`, (err, rows2) => {
                if (err) throw err;
                invoices = rows2
                // rows1.map((v,i)=> {
                //     connection.query(`SELECT * FROM InvoiceDetails WHERE id = '${v.id}'`, (err, rows) => {
                // if (err) throw err;
                // data.push(...rows)
                // // console.log('Data received from Db: commission', rows);
                // if((i+1) == rows1.length){

                if (invoices.length > 0) {
                    // var invoicesToSend = []
                    stallHolders.map(v => {
                        // invoicesToSend = invoices.filter(w => w.stallId == v.stallId)
                        compileInvoices(invoices, v.stallId).then(invoicesToSend => {
                            if (invoicesToSend.length > 0) {
                                console.log("invoicesToSend: ", invoicesToSend[0]);

                                //     var invoicesString = ""
                                //     var total = 0
                                //     var totalWRefund = 0
                                //     var commission = 0.1
                                //     var afterCommission = 0.9
                                //     if (v.accountNumber) {
                                //         var comm = 10
                                //         comm = parseInt(v.accountNumber)
                                //         if (comm != 0) {
                                //             commission = comm / 100
                                //             afterCommission = 1 - commission
                                //         } else {
                                //             commission = 0
                                //             afterCommission = 1
                                //         }

                                //     }
                                //     invoicesToSend.map(x => {
                                //         // console.log("invoicesToSend: ",x.finalPrice);
                                //         // total = parseInt(x.finalPrice) + total
                                //         if (parseInt(x.finalPrice, 10) > 0) {
                                //             total = parseInt(x.finalPrice, 10) + total;
                                //         }
                                //         totalWRefund = parseInt(x.finalPrice, 10) + totalWRefund;
                                //         invoicesString = invoicesString + '<tr> <td>' + x.stallId + '</td>        <td>' + x.id + '</td>        <td>' + v.name + '</td>        <td>' + x.productId + '</td>        <td>' + x.description + '</td>        <td>' + x.finalPrice + '</td> <td>' + moment(x.dateTime).format('YYYY-MM-DD hh:mm:ss') + '</td>     </tr>'
                                //         // console.log('Email sent to ' + v.email + " invoicesstring: " , invoicesString);
                                //     })
                                //     // setTimeout(() => {
                                //     // invoicesString = invoicesString + '<tr> <td></td>        <td></td>        <td></td>        <td></td>        <td>Total £: </td>        <td>' + total + '</td> <td></td>     </tr>'
                                //     // invoicesString = invoicesString + '<tr> <td></td>        <td></td>        <td></td>        <td></td>        <td>Refund Amount £: </td>        <td>' + total - totalWRefund + '</td> <td></td>     </tr>'
                                //     invoicesString = invoicesString + '<tr> <td></td>        <td></td>        <td></td>        <td></td>        <td>Sub Total £: </td>        <td>' + totalWRefund + '</td> <td></td>     </tr>'
                                //     // invoicesString = invoicesString + '<tr> <td></td>        <td></td>        <td></td>        <td></td>        <td>Commission Deduction £: </td>        <td>' + (totalWRefund * commission).toFixed(2) + '</td> <td></td>     </tr>'
                                //     invoicesString = invoicesString + '<tr> <td></td>        <td></td>        <td></td>        <td></td>        <td>Net Amount £: </td>        <td>' + (totalWRefund * afterCommission).toFixed(2) + '</td> <td></td>     </tr>'


                                //     var mailOptions = {
                                //         from: 'antiquesofkingston@gmail.com',
                                //         // to: [v.email, 'antiquescentre@fastmail.com'],
                                //         to: 'wadejohnson650@gmail.com',
                                //         subject: 'Weekly Sales Report',
                                //         html: beforeStallWeek + v.stallId + afterStallBeforeStallHolder + v.name + beforeTableWeekly + invoicesString + end,
                                //         attachments: [{
                                //             filename: 'KingstonAntiquesLogo.jpeg',
                                //             path: './assets/KingstonAntiquesLogo.jpeg',
                                //             cid: 'unique@logo.ee' //same cid value as in the html img src
                                //         }]
                                //     };

                                //     transporter.sendMail(mailOptions, function (error, info) {
                                //         if (error) {
                                //             console.log(error);
                                //         } else {
                                //             console.log('Email sent to ' + v.email + " response: " + info.response);
                                //         }
                                //     });
                                //     // }, 5000);

                            }
                        })
                        // .catch(e => {
                        //     // console.log(e);
                        // })
                    })

                }
            })
        }

    });






});
app.get('/send_daily_report', (req, res) => {
    var stallHolders = []
    connection.query('SELECT * FROM StallHolder', (err, rows1) => {
        if (err) throw err;
        // console.log('Data received from Db:\n');
        // res.send(rows1);
        if (rows1.length > 0) {
            stallHolders = rows1
            var invoices = []
            connection.query(`SELECT * FROM NewInvoiceDetails WHERE DATE(dateTime) = '${moment().format("YYYY-MM-DD")}'`, (err, rows2) => {
                if (err) throw err;
                invoices = rows2
                // rows1.map((v,i)=> {
                //     connection.query(`SELECT * FROM InvoiceDetails WHERE id = '${v.id}'`, (err, rows) => {
                // if (err) throw err;
                // data.push(...rows)
                // // console.log('Data received from Db: commission', rows);
                // if((i+1) == rows1.length){

                if (invoices.length > 0) {
                    var invoicesToSend = []
                    stallHolders.map(v => {
                        invoicesToSend = invoices.filter(w => w.stallId == v.stallId)
                        if (invoicesToSend.length > 0) {
                            var invoicesString = ""
                            invoicesToSend.map(x => {
                                invoicesString = invoicesString + '<tr> <td>' + x.stallId + '</td>        <td>' + x.id + '</td>        <td>' + v.name + '</td>        <td>' + x.productId + '</td>        <td>' + x.description + '</td>        <td>' + x.finalPrice + '</td>     </tr>'
                            })


                            var mailOptions = {
                                from: 'antiquesofkingston@gmail.com',
                                to: [v.email, 'antiquescentre@fastmail.com'],
                                subject: 'Daily Sales report',
                                html: beforeStall + v.stallId + afterStallBeforeStallHolder + v.name + beforeTable + invoicesString + end,
                                attachments: [{
                                    filename: 'KingstonAntiquesLogo.jpeg',
                                    path: './assets/KingstonAntiquesLogo.jpeg',
                                    cid: 'unique@logo.ee' //same cid value as in the html img src
                                }]
                            };

                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent to ' + v.email + " response: " + info.response);
                                }
                            });
                        }
                    })
                }

                // }
                // res.send(rows);
                // });
            })
        }

    });






});

app.get('/get_invoices', (req, res) => {
    var NewInvoices = '';
    connection.query('SELECT * FROM NewInvoices', (err, rows) => {
        // if (err) {
        //     res.status(400).json({
        //         message: err
        //     });
        // };
        if (err) {
            // res.status(400).json({
            //     message: "Something Went Wrong"
            // });
            // console.log('Error from NewInvoices from Db:', err);

        };
        // console.log('Data received from Db:\n');
        NewInvoices = rows
        rows.map((v, i) => {
            // var date = NewInvoices[i].dateTime
            // var date = new Date(parseInt(invoices[i].dateTime));
            //    var date = moment(invoices[i].dateTime,"DD/MM/YYYY");

            //    day = date.getDate
            //    month=date.getMonth
            //    year =date.getFullYear
            //  NewInvoices[i].dateTime = day  + "/" + month + "/" + year
            // NewInvoices[i].dateTime = moment(date).format("DD/MM/YYYY")
            NewInvoices[i].items = []
            // NewInvoices[i].refunds = []
            connection.query(`SELECT * FROM NewInvoiceDetails where id = '${v.id}'`, (err, rows1) => {
                // if (err) throw err
                if (err) {
                    // res.status(400).json({
                    //     message: "Something Went Wrong"
                    // });
                    // console.log('Error from InvoiceDetails from Db:', err);

                };
                // // console.log('Data received from Db:\n');
                if (rows1) {
                    rows1.map(w => {
                        NewInvoices[i].items.push(w)



                    })
                } else {
                    // console.log("No items for invoice :",v.id)
                }
                // res.send(rows);
            });

            // connection.query(`SELECT * FROM Refund where invoiceId = ${v.id}`, (err, rows2) => {
            //     if (err) throw err;
            //     // console.log('Data received from Db:\n');

            //     rows2.map(r => {

            //         NewInvoices[i].refunds.push(r);
            //         if (rows2.length == NewInvoices[i].refunds.length) {
            //         }
            //     })
            //     // res.send(rows);
            // });

        })
        // res.send(NewInvoices);
        res.send(NewInvoices.sort(compareValues('id', 'desc')))


        // res.send(rows); 
    });

});
app.get('/get_invoices_staging', (req, res) => {
    var NewInvoices = '';
    connection.query('SELECT * FROM Invoices', (err, rows) => {
        // if (err) {
        //     res.status(400).json({
        //         message: err
        //     });
        // };
        if (err) {
            // res.status(400).json({
            //     message: "Something Went Wrong"
            // });
            // console.log('Error from NewInvoices from Db:', err);

        };
        // console.log('Data received from Db:\n');
        NewInvoices = rows
        rows.map((v, i) => {
            // var date = NewInvoices[i].dateTime
            // var date = new Date(parseInt(invoices[i].dateTime));
            //    var date = moment(invoices[i].dateTime,"DD/MM/YYYY");

            //    day = date.getDate
            //    month=date.getMonth
            //    year =date.getFullYear
            //  NewInvoices[i].dateTime = day  + "/" + month + "/" + year
            // NewInvoices[i].dateTime = moment(date).format("DD/MM/YYYY")
            NewInvoices[i].items = []
            // NewInvoices[i].refunds = []
            connection.query(`SELECT * FROM InvoiceDetails where id = '${v.id}'`, (err, rows1) => {
                // if (err) throw err
                if (err) {
                    // res.status(400).json({
                    //     message: "Something Went Wrong"
                    // });
                    // console.log('Error from InvoiceDetails from Db:', err);

                };
                // // console.log('Data received from Db:\n');
                if (rows1) {
                    rows1.map(w => {
                        NewInvoices[i].items.push(w)



                    })
                } else {
                    // console.log("No items for invoice :",v.id)
                }
                // res.send(rows);
            });

            // connection.query(`SELECT * FROM Refund where invoiceId = ${v.id}`, (err, rows2) => {
            //     if (err) throw err;
            //     // console.log('Data received from Db:\n');

            //     rows2.map(r => {

            //         NewInvoices[i].refunds.push(r);
            //         if (rows2.length == NewInvoices[i].refunds.length) {
            //         }
            //     })
            //     // res.send(rows);
            // });

        })
        // res.send(NewInvoices);
        res.send(NewInvoices.sort(compareValues('id', 'desc')))


        // res.send(rows); 
    });

});

app.get('/get_invoice_id', (req, res) => {
    var NewInvoices = '';
    connection.query(`SELECT * FROM NewInvoices where id = ${req.query.id}`, (err, rows) => {
        if (err) throw err;
        // console.log('Data received from Db:\n');
        NewInvoices = rows
        var date = new Date(parseInt(NewInvoices[i].dateTime));
        NewInvoices.dateTime = moment(date).format("DD/MM/YYYY")

        connection.query(`SELECT * FROM NewInvoiceDetails where id = ${req.query.id}`, (err, rows1) => {
            if (err) throw err;
            // console.log('Data received from Db:\n');
            rows1.map(w => {
                NewInvoices[i].items.push(w)
            })
            // res.send(rows);
        });
        connection.query(`SELECT * FROM Refund where invoiceId = ${req.query.id}`, (err, rows2) => {
            if (err) throw err;
            // console.log('Data received from Db:\n');
            rows2.map(r => {
                NewInvoices[i].refunds.push(r);
            })
            // res.send(rows);
        });

        res.send(NewInvoices);
        // res.send(rows); 
    });

});

app.get('/get_products', (req, res) => {
    connection.query('SELECT * FROM Products', (err, rows) => {
        if (err) throw err;
        // console.log('Data received from Db:\n');
        res.send(rows);
    });

});

app.get('/get_invoice_items_id_staging', (req, res) => {
    // console.log(req.query.id);

    connection.query(`SELECT * FROM InvoiceDetails where id = '${req.query.id}'`, (err, rows1) => {
        if (err) throw err;
        // console.log('Data received from Db:\n');
        // rows1.map(w=> {
        //     NewInvoices[i].items.push(w)
        // })

        res.send(rows1);
    });

});

app.get('/get_invoice_items_id', (req, res) => {
    // console.log(req.query.id);

    connection.query(`SELECT * FROM NewInvoiceDetails where id = '${req.query.id}'`, (err, rows1) => {
        if (err) throw err;
        // console.log('Data received from Db:\n');
        // rows1.map(w=> {
        //     NewInvoices[i].items.push(w)
        // })

        res.send(rows1);
    });

});
app.get('/get_refund_items_id', (req, res) => {
    // console.log(req.query.id);

    connection.query(`SELECT * FROM Refund where invoiceId = ${req.query.id}`, (err, rows1) => {
        if (err) throw err;
        // console.log('Data received from Db:\n');
        // rows1.map(w=> {
        //     NewInvoices[i].items.push(w)
        // })

        res.send(rows1);
    });

});

app.get('/get_products_id', (req, res) => {
    // console.log(req.query.id);

    connection.query(`SELECT * FROM Products WHERE id = ${req.query.id}`, (err, rows) => {
        if (err) throw err;

        // console.log('Data received from Db:\n');
        res.send(rows);
    });

});
app.get('/get_products_code', (req, res) => {
    // console.log(req.query.code);

    connection.query(`SELECT * FROM Products WHERE barcode = '${req.query.code}'`, (err, rows) => {
        if (err) throw err;

        // console.log('Data received from Db:\n');
        res.send(rows);
    });

});
app.get('/get_stall_id', (req, res) => {
    // console.log(req.query.id);
    let stall = [];

    connection.query(`SELECT * FROM Stall WHERE id = '${req.query.id}'`, (err, rows) => {
        if (err) throw err;
        rows.map(v => {
            connection.query(`SELECT * FROM StallHolder where id = ${v.stallHolderId}`, (err, rows2) => {
                if (err) throw err;
                // console.log('Data received from Db:\n');
                // res.send(rows);
                stall.push({ id: v.id, stallHolder: rows2[0] });
                if (stall.length == rows.length) {
                    res.send(stall)
                }
            });
        })
        // console.log('Data received from Db:\n');
        // res.send(rows);
    });

});


app.get('/get_stalls', (req, res) => {
    let stall = [];
    connection.query('SELECT * FROM Stall', (err, rows) => {
        if (err) throw err;
        rows.map(v => {
            connection.query(`SELECT * FROM StallHolder where id = ${v.stallHolderId}`, (err, rows2) => {
                if (err) throw err;
                // console.log('Data received from Db:\n');
                // res.send(rows);
                // var stallHolder = ""
                // stallHolder = rows2[0];
                if (rows2[0]) {
                    stall.push({ id: v.id, stallHolder: rows2[0] });
                } else {
                    stall.push({ id: v.id, stallHolder: "" });
                }

                if (stall.length == rows.length) {
                    res.send(stall)
                }
            });
        })
        // console.log('Data received from Db:\n');
    });

});
app.get('/get_stall_holders', (req, res) => {

    connection.query('SELECT commission FROM Authentication', (err, rows) => {
        if (err) throw err;
        // console.log('Data received from Db: commission', rows);
        // res.send(rows);
    });
    connection.query('SELECT * FROM StallHolder', (err, rows1) => {
        if (err) throw err;
        // console.log('Data received from Db:\n');
        res.send(rows1);
    });

});
app.get('/get_available_stall_holders', (req, res) => {

    var empty = null;
    connection.query(`SELECT * FROM StallHolder WHERE stallId IS NULL`, (err, rows1) => {
        if (err) throw err;
        // console.log('Data received from Db:\n');
        res.send(rows1);
    });

});
app.get('/get_stall_holder_id', (req, res) => {
    connection.query(`SELECT * FROM StallHolder where id = ${req.query.id}`, (err, rows) => {
        if (err) throw err;
        // console.log('Data received from Db:\n');
        res.send(rows);
    });

});
app.post("/add_product", (req, res) => {

    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);
    // console.log("add_product: ", req.body)

    // var code = Math.floor(Math.random() * (99999 - 10000 + 1)) + "";

    connection.query(`INSERT INTO Products(description,price,barcode,quantity,stallId,stallHolderId) \
    VALUES('${req.body.description}','${req.body.price}','${req.body.code}','${req.body.quantity}','${req.body.stallId}','${req.body.stallHolder}')`, (err, data) => {

        if (!err) {
            res.status(200).json({
                message: "Product added.",
                productId: data
            });
        } else {
            // console.log(err);
            res.status(400).json({
                message: err
            });
        }
    });
});

app.post("/login", (req, res) => {

    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);

    connection.query(`Select * from Authentication Where userName='${req.body.userName}' AND password='${req.body.password}' `, (err, data) => {

        if (data.length > 0) {
            res.status(200).json({
                message: "Logged in",
                credentials: data
            });
        } else {
            // console.log(err);
            res.status(400).json({
                message: "Invalid Credentials"
            });
        }
    });
});


app.post("/refund", (req, res) => {

    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);
    // console.log("refund: ", req.body)

    var refund = req.body
    // var code = Math.floor(Math.random() * (99999 - 10000 + 1)) + min;
    var error = null;
    refund.items.map(v => {
        connection.query(`INSERT INTO Refund(invoiceId, productId, dateTime, reason, cash, card, salesPersonId)
        VALUES (${req.body.invoiceId},${v.productId},'${req.body.dateTime}','${req.body.reason}',${req.body.cash},${req.body.card},${req.body.salesPersonId})`, (err, data) => {

            if (err) {
                error = err
            }
        });
        if (error == null) {
            res.status(200).json({
                message: "Product refunded.",
                // productId: data
            });
        } else {
            // console.log(error);
            res.status(400).json({
                message: error
            });
        }
    })


});


app.post("/add_customer", (req, res) => {

    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);
    // console.log("add_product: ", req.body)

    // var code = Math.floor(Math.random() * (99999 - 10000 + 1)) + min;

    connection.query(`INSERT INTO Customers( name, address, number, email) VALUES ('${req.body.name}','${req.body.address}','${req.body.number}','${req.body.email}')`, (err, data) => {

        if (!err) {
            res.status(200).json({
                message: "Customer added.",
                customerId: data
            });
        } else {
            // console.log(err);
            res.status(400).json({
                message: err
            });
        }
    });
});


app.post("/add_stall", (req, res) => {

    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);
    // console.log("add_stall: ", req.body)

    // var code = Math.floor(Math.random() * (99999 - 10000 + 1)) + min;

    connection.query(`INSERT INTO Stall(id) VALUES ('${req.body.id}')`, (err, data) => {

        if (!err) {
            res.status(200).json({
                message: "Stall added.",
                customerId: data
            });
        } else {
            // console.log(err);
            res.status(400).json({
                message: err
            });
        }
    });
});

app.post("/add_stall_holder", (req, res) => {

    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);
    // console.log("add_stall_holder: ", req.body)

    // var code = Math.floor(Math.random() * (99999 - 10000 + 1)) + min;

    connection.query(`INSERT INTO StallHolder(name, address, number, rent,bankName, accountNumber, sortCode, stallId,email) VALUES ('${req.body.name}','${req.body.address}','${req.body.number}',${req.body.rent},'${req.body.bankName}','${req.body.accountNumber}','${req.body.sortCode}','${req.body.stallId}','${req.body.email}')`, (err, data) => {

        if (!err) {
            res.status(200).json({
                message: "Stall Holder added.",
                customerId: data
            });
        } else {
            // console.log(err);
            res.status(400).json({
                message: err
            });
        }
    });
});

app.post("/add_sales_person", (req, res) => {

    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);
    // console.log("add_sales_person: ", req.body)

    // var code = Math.floor(Math.random() * (99999 - 10000 + 1)) + min;

    connection.query(`INSERT INTO SalesPerson( firstName, lastName, address, number, dallasKeyCode, userName, password)
     VALUES ('${req.body.firstName}','${req.body.lastName}','${req.body.address}','${req.body.number}','${req.body.dallasKeyCode}','${req.body.userName}','${req.body.password}')`, (err, data) => {

        if (!err) {
            res.status(200).json({
                message: "Sales Person added.",
                customerId: data
            });
        } else {
            // console.log(err);
            res.status(400).json({
                message: err
            });
        }
    });
});

app.get('/get_customers', (req, res) => {
    connection.query('SELECT * FROM Customers', (err, rows) => {
        if (err) throw err;
        // console.log('Data received from Db:\n');
        res.send(rows);
    });

});

app.get('/get_sales_persons', (req, res) => {
    connection.query('SELECT * FROM SalesPerson', (err, rows) => {
        if (err) throw err;
        // console.log('Data received from Db:\n');
        res.send(rows);
    });

});
app.get('/get_sales_person_id', (req, res) => {
    connection.query(`SELECT * FROM SalesPerson where id = ${req.query.id}`, (err, rows) => {
        if (err) throw err;
        // console.log('Data received from Db:\n');
        res.send(rows);
    });

});
app.post("/edit_sales_person", (req, res) => {

    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);
    // console.log("edit_sales_person: ", req.body)

    // var code = Math.floor(Math.random() * (99999 - 10000 + 1)) + min;

    connection.query(`UPDATE SalesPerson SET firstName='${req.body.firstName}',lastName='${req.body.lastName}',address='${req.body.address}',number='${req.body.number}',dallasKeyCode='${req.body.dallasKeyCode}',userName='${req.body.userName}',password='${req.body.password}'  WHERE id = ${req.body.id}`,
        (err, data) => {

            if (!err) {
                res.status(200).json({
                    message: "Stall editted.",
                    stallId: data
                });
            } else {
                // console.log(err);
                res.status(400).json({
                    message: err
                });
            }
        });
});
app.post("/edit_stall_holder", (req, res) => {

    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);
    // console.log("edit_stall_holder: ", req.body)

    // var code = Math.floor(Math.random() * (99999 - 10000 + 1)) + min;

    connection.query(`UPDATE StallHolder SET name='${req.body.name}',address='${req.body.address}',number='${req.body.number}',email='${req.body.email}',rent=${req.body.rent},bankName='${req.body.bankName}', accountNumber='${req.body.accountNumber}', sortCode='${req.body.sortCode}', stallId='${req.body.stallId}' WHERE id = ${req.body.id} `,
        (err, data) => {

            if (!err) {
                res.status(200).json({
                    message: "Stall editted.",
                    stallId: data
                });
            } else {
                // console.log(err);
                res.status(400).json({
                    message: err
                });
            }
        });
});


app.post("/edit_customer", (req, res) => {

    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);
    // console.log("add_product: ", req.body)

    // var code = Math.floor(Math.random() * (99999 - 10000 + 1)) + min;

    connection.query(`UPDATE Customers SET name='${req.body.name}',address='${req.body.address}',number='${req.body.number}',email='${req.body.email}' WHERE id = ${req.body.id}`,
        (err, data) => {

            if (!err) {
                res.status(200).json({
                    message: "Customer editted.",
                    customerId: data
                });
            } else {
                // console.log(err);
                res.status(400).json({
                    message: err
                });
            }
        });
});

app.post("/edit_product", (req, res) => {

    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);
    // console.log("edit_product: ", req.body)

    // var code = Math.floor(Math.random() * (99999 - 10000 + 1)) + min;

    connection.query(`UPDATE Products SET description='${req.body.description}',price='${req.body.price}',quantity=${req.body.quantity},stallId='${req.body.stallId}',stallHolderId='${req.body.stallHolder}'  WHERE barcode = '${req.body.barcode}'`,
        (err, data) => {

            if (!err) {
                res.status(200).json({
                    message: "Product editted.",
                    product: data[0]
                });
            } else {
                // console.log(err);
                res.status(400).json({
                    message: err
                });
            }
        });
});

app.post("/edit_stall", (req, res) => {

    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);
    // console.log("edit_stall: ", req.body)
    var empty = null;
    // var code = Math.floor(Math.random() * (99999 - 10000 + 1)) + min;
    // connection.query(`UPDATE Stall SET stallHolderId=0  WHERE stallHolderId=${req.body.stallHolderId}`,
    // (err, data) => {
    // });
    connection.query(`UPDATE Stall SET stallHolderId=${req.body.stallHolderId}  WHERE id = '${req.body.id}'`,
        (err, data) => {
            connection.query(`UPDATE StallHolder SET stallId=${empty}  WHERE stallId = '${req.body.id}'`,
                (err, data) => {
                    // console.log("edit_stall empty err",err);
                    // console.log("edit_stall empty",data);


                });
            connection.query(`UPDATE StallHolder SET stallId='${req.body.id}'  WHERE id = '${req.body.stallHolderId}'`,
                (err, data) => {
                    // console.log("edit_stall  err",err);
                    // console.log("edit_stall ",data);
                });
            if (!err) {
                res.status(200).json({
                    message: "Stall editted.",
                    stallId: data
                });
            } else {
                // console.log(err);
                res.status(400).json({
                    message: err
                });
            }
        });
});

// app.post("/add_invoice", (req, res) => {

//     //read product information from request
//     // let product = new Product(req.body.prd_name, req.body.prd_price);
//  // console.log("add_product: ",req.body)
//     connection.query(`INSERT INTO NewInvoices(id,stallId,productId,description,price,finalPrice,salesPersonId,stallHolderId,dateTime,paymentMethod,total,customerId,quantity) \
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
function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}

app.get('/get_daily_report', (req, res) => {
    //    get = { stallId: "0", stallHolderName: "Smith", description:"Some Product", salesPersonName: "Australia", productId: "33",invoiceId:"23",price:"300",card:"200",total:"500" }

    // connection.query('SELECT commission FROM Authentication', (err, rows) => {
    //     if (err) throw err;
    //     // console.log('Data received from Db: commission', rows);
    //     // res.send(rows);
    // });
    var data = []
    connection.query('SELECT * FROM NewInvoiceDetails', (err, rows1) => {
        if (err) throw err;
        data = rows1
        rows1.map((v, i) => {
            connection.query(`SELECT * FROM NewInvoices WHERE id = '${v.id}'`, (err, rows) => {
                if (err) throw err;
                data[i].invoice = rows[0]
                // console.log('Data received from Db: commission', rows);
                if ((i + 1) == rows1.length) {
                    res.send(data.sort(compareValues('id')))

                }
                // res.send(rows);
            });
        })
        // console.log('Data received from Db:\n');
    });

});


app.get('/getBACS', (req, res) => {
    //    get = { stallId: "0", stallHolderName: "Smith", description:"Some Product", salesPersonName: "Australia", productId: "33",invoiceId:"23",price:"300",card:"200",total:"500" }

    // connection.query('SELECT commission FROM Authentication', (err, rows) => {
    //     if (err) throw err;
    //     // console.log('Data received from Db: commission', rows);
    //     // res.send(rows);
    // });
    var data = []
    connection.query(`SELECT Stall.id , StallHolder.bankName , ((1-(CAST(StallHolder.accountNumber AS SIGNED)) / 100) * SUM( CAST(NewInvoiceDetails.price AS SIGNED ) )) AS total FROM Stall ,StallHolder , NewInvoiceDetails WHERE Stall.stallHolderId = StallHolder.id AND Stall.id = NewInvoiceDetails.stallId AND (DATE(NewInvoiceDetails.dateTime) BETWEEN '${moment().weekday(0).subtract(6, 'd').format("YYYY-MM-DD")}' AND '${moment().weekday(0).format("YYYY-MM-DD")}') AND StallHolder.accountNumber > 0 AND StallHolder.accountNumber < 100 GROUP BY Stall.id`, (err, rows1) => {
        if (err) throw err;
        if (rows1) {
            //  data = rows1.filter(v=> {
            //      if(parseInt(v.total,10) > 0){
            //      total = v.total
            //      v.total = total * 0.9
            //      v.total = parseFloat(v.total.toFixed(2))
            //      return v
            //     }
            //  })
            res.send(rows1.sort(compareValues('bankName')))

        }

        // res.send(rows);
    });
    // console.log('Data received from Db:\n');
})

app.get('/get_weekly_item_report_date', (req, res) => {
    //    get = { stallId: "0", stallHolderName: "Smith", description:"Some Product", salesPersonName: "Australia", productId: "33",invoiceId:"23",price:"300",card:"200",total:"500" }

    // connection.query('SELECT commission FROM Authentication', (err, rows) => {
    //     if (err) throw err;
    //     // console.log('Data received from Db: commission', rows);
    //     // res.send(rows);
    // });
    var data = []
    connection.query(`SELECT * FROM NewInvoiceDetails WHERE  (DATE(dateTime) BETWEEN '${moment().weekday(0).subtract(6, 'd').format("YYYY-MM-DD")}' AND '${moment().weekday(0).format("YYYY-MM-DD")}') AND stallId ='${req.query.id}'`, (err, rows1) => {
        if (err) throw err;
        data = rows1
        // if(rows1.length == 0){
        // res.send(data)
        res.send(data.sort(compareValues('id')))

        //     // }
        //     rows1.map((v,i)=> {
        //         connection.query(`SELECT * FROM InvoiceDetails WHERE id = '${v.id}'`, (err, rows) => {
        //     if (err) throw err;
        //     data[i].items = rows
        //     // console.log('Data received from Db: commission', rows);
        //     if((i+1) == rows1.length){
        //         res.send(data.sort(compareValues('id')))

        //     }
        //     // res.send(rows);
        // });
        //     })
        // console.log('Data received from Db:\n');
    });

});
app.get('/get_weekly_report_date', (req, res) => {
    //    get = { stallId: "0", stallHolderName: "Smith", description:"Some Product", salesPersonName: "Australia", productId: "33",invoiceId:"23",price:"300",card:"200",total:"500" }

    // connection.query('SELECT commission FROM Authentication', (err, rows) => {
    //     if (err) throw err;
    //     // console.log('Data received from Db: commission', rows);
    //     // res.send(rows);
    // });
    var data = []
    connection.query(`SELECT * FROM NewInvoices WHERE  (DATE(dateTime) BETWEEN '${moment().weekday(0).subtract(6, 'd').format("YYYY-MM-DD")}' AND '${moment().weekday(0).format("YYYY-MM-DD")}') AND stallId ='${req.query.id}'`, (err, rows1) => {
        if (err) throw err;
        data = rows1
        if (rows1.length == 0) {
            res.send(data)
        }
        rows1.map((v, i) => {
            connection.query(`SELECT * FROM NewInvoiceDetails WHERE id = '${v.id}'`, (err, rows) => {
                if (err) throw err;
                data[i].items = rows
                // console.log('Data received from Db: commission', rows);
                if ((i + 1) == rows1.length) {
                    res.send(data.sort(compareValues('id')))

                }
                // res.send(rows);
            });
        })
        // console.log('Data received from Db:\n');
    });

});
app.get('/get_weekly_summary', (req, res) => {
    //    get = { stallId: "0", stallHolderName: "Smith", description:"Some Product", salesPersonName: "Australia", productId: "33",invoiceId:"23",price:"300",card:"200",total:"500" }

    // connection.query('SELECT commission FROM Authentication', (err, rows) => {
    //     if (err) throw err;
    //     // console.log('Data received from Db: commission', rows);
    //     // res.send(rows);
    // });
    var data = []
    connection.query(`SELECT * FROM NewInvoices WHERE  (DATE(dateTime) BETWEEN '${moment().isoWeekday(1).format("YYYY-MM-DD")}' AND '${moment().isoWeekday(1).add(6, 'd').format("YYYY-MM-DD")}' )`, (err, rows1) => {
        if (err) throw err;
        data = rows1
        res.send(data.sort(compareValues('id')))
        // console.log('Data received from Db:\n');
    });

});
app.get('/get_daily_report_date', (req, res) => {
    //    get = { stallId: "0", stallHolderName: "Smith", description:"Some Product", salesPersonName: "Australia", productId: "33",invoiceId:"23",price:"300",card:"200",total:"500" }

    // connection.query('SELECT commission FROM Authentication', (err, rows) => {
    //     if (err) throw err;
    //     // console.log('Data received from Db: commission', rows);
    //     // res.send(rows);
    // });
    var data = []
    connection.query(`SELECT * FROM NewInvoices WHERE dateTime = '${req.query.date}'`, (err, rows1) => {
        if (err) throw err;
        data = rows1
        rows1.map((v, i) => {
            connection.query(`SELECT * FROM NewInvoiceDetails WHERE id = '${v.id}'`, (err, rows) => {
                if (err) throw err;
                data[i].items = rows
                // console.log('Data received from Db: commission', rows);
                if ((i + 1) == rows1.length) {
                    res.send(data.sort(compareValues('id')))

                }
                // res.send(rows);
            });
        })
        // console.log('Data received from Db:\n');
    });

});
app.get('/get_daily_items_report_date', (req, res) => {
    //    get = { stallId: "0", stallHolderName: "Smith", description:"Some Product", salesPersonName: "Australia", productId: "33",invoiceId:"23",price:"300",card:"200",total:"500" }

    // connection.query('SELECT commission FROM Authentication', (err, rows) => {
    //     if (err) throw err;
    //     // console.log('Data received from Db: commission', rows);
    //     // res.send(rows);
    // });
    var data = []
    connection.query(`SELECT * FROM NewInvoiceDetails WHERE DATE(dateTime) = '${req.query.date}'`, (err, rows1) => {
        if (err) throw err;
        data = rows1
        // rows1.map((v,i)=> {
        //     connection.query(`SELECT * FROM InvoiceDetails WHERE id = '${v.id}'`, (err, rows) => {
        // if (err) throw err;
        // data.push(...rows)
        // // console.log('Data received from Db: commission', rows);
        // if((i+1) == rows1.length){
        res.send(data.sort(compareValues('id')))

        // }
        // res.send(rows);
        // });
    })
    // console.log('Data received from Db:\n');
});


app.post("/add_invoice", (req, res) => {

    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);
    // console.log("add_invoice: ", req.body)
    var error = null
    var body = req.body
    // var dateTime = Date.now();
    if (body.items && body.items.length > 0) {
        connection.query(`INSERT INTO Invoices(id,stallId,salesPersonId,stallHolderId,dateTime,paymentMethod,total,customerId,card,cash) \
    VALUES('${body.id}','${body.stallId}','${body.salesPersonId}','${body.stallHolderId}','${body.dateTime}','${body.paymentMethod}','${body.total}',${body.customerId},'${body.card}','${body.cash}')`, (err, data) => {
            if (err) {
                error = err;
                // console.log("invoice table error: ",error);
                res.status(400).json({
                    message: error
                });
            } else {

                // connection.query(`SELECT id FROM NewInvoices where customerId = ${body.customerId} AND dateTime = '${dateTime}'`, (err, rows) => {
                //     if (err) throw err;
                //     // console.log('Data received from Db:\n');
                // res.send(rows);
                body.items.map(v => {
                    connection.query(`INSERT INTO InvoiceDetails(id,productId,description,price,finalPrice,quantity,card,cash) \
                    VALUES('${body.id}','${v.productId}','${v.description}','${v.price}','${v.finalPrice}','${v.quantity}','${body.card}','${body.cash}')`, (err, data) => {
                        if (err) {
                            error = err;
                            // console.log("invoiceDetails table error: ",error);
                            res.status(400).json({
                                message: error
                            });
                        }
                    });
                })
                // });


            }
        });
        // })


        if (error == null) {
            res.status(200).json({
                message: "Invoice added.",
                // productId: data
            });
        } else {
            res.status(400).json({
                message: error
            });
        }
    } else {
        res.status(400).json({
            message: "No items in invoice"
        });
    }

});
app.post("/add_invoice_new", (req, res) => {

    //read product information from request
    // let product = new Product(req.body.prd_name, req.body.prd_price);
    console.log("add_invoice_new: ", req.body)
    var error = null
    var body = req.body
    // var dateTime = Date.now();
    if (body.items && body.items.length > 0) {
        connection.query(`INSERT INTO NewInvoices(id,stallId,salesPersonId,stallHolderId,dateTime,paymentMethod,total,customerId,card,cash,soldOnline) \
    VALUES('${body.id}','${body.stallId}','${body.salesPersonId}','${body.stallHolderId}','${body.dateTime}','${body.paymentMethod}','${body.total}',${body.customerId},'${body.card}','${body.cash}','${body.soldOnline}')`, (err, data) => {
            if (err) {
                error = err;
                // console.log("invoice table error: ",error);
                res.status(400).json({
                    message: error
                });
            } else {

                // connection.query(`SELECT id FROM NewInvoices where customerId = ${body.customerId} AND dateTime = '${dateTime}'`, (err, rows) => {
                //     if (err) throw err;
                //     // console.log('Data received from Db:\n');
                // res.send(rows);
                body.items.map(v => {
                    connection.query(`INSERT INTO NewInvoiceDetails(id,productId,description,price,finalPrice,quantity,card,cash,stallId,stallHolderId,refunded,soldOnline,salesPersonId) \
                    VALUES('${body.id}','${v.productId}','${v.description}','${v.price}','${v.finalPrice}','${v.quantity}','${body.card}','${body.cash}','${v.stallId}','${v.stallHolder}',${v.refunded},'${body.soldOnline}','${body.salesPersonId}')`, (err, data) => {
                        if (err) {
                            error = err;
                            // console.log("invoiceDetails table error: ",error);
                            res.status(400).json({
                                message: error
                            });
                        }
                    });
                })
                // });


            }
        });
        // })


        if (error == null) {
            res.status(200).json({
                message: "Invoice added.",
                // productId: data
            });
        } else {
            res.status(400).json({
                message: error
            });
        }
    } else {
        res.status(400).json({
            message: "No items in invoice"
        });
    }

});
// make the server listen to requests
app.listen(PORT, () => {
    // console.log(`Server running at: http://localhost:${PORT}/`);
});