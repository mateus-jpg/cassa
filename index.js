'use strict';
const path = require('path')
const escpos = require('escpos')
escpos.USB = require('escpos-usb')

const device = new escpos.USB();
const options = { encoding: "GB18030" }
const printer = new escpos.Printer(device, options)

var bodyParser = require('body-parser')
var app = require('express')()
var http = require('http').Server(app)
var cors = require('cors')
app.use(cors())
app.use(bodyParser.json())

const port = 4000;

app.post('/print', (req, res) => {
  res.json(
    { status: 'success' }
  )
  console.log(req.body)
  print(req.body.text)
});
app.post('/print', (req, res) => {
    res.json(
      { status: 'success' }
    )
    console.log(req.body)
    print(req.body.text)
  });
app.post('/printOrder', (req, res) => {
    res.json(
        { status: 'success' }
    )
    console.log(req.body)
    printOrder(req.body)
});

http.listen(port, () => {
  console.log(`Printer: http://localhost:${port}`);
});


const printOrder = (order) => {
    device.open(function () {
        printer
            .font('a')
            .align('cb')
            .style('bu')
            .size(1, 1)
            .text(`Order ID: ${order.id}`)
            .text(`Date: ${order.date}`)
            .feed();

        order.rows.forEach(row => {
            printer
                .text(`Product ID: ${row.id}`)
                .text(`Product Name: ${row.name}`)
                .text(`Quantity: ${row.quantity}`)
                .feed()
                .cut();
                
        });

        printer
            .cut()
            .close();
    });
}
const print = (text) => {
  device.open(function () {
    printer
      .font('a')
      .align('ct')
      .style('bu')
      .size(1, 1)
      .text(text)
      .cut()
      .close();
  });
}