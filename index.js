const express = require('express')
const app = express()
const fs = require ('fs');

const routesProducts = require('./routes/products')
const routesCarts = require('./routes/carts')

app.use(express.json())

app.use(express.urlencoded({extended:true}))

//Middleware
app.use(function (req, res, next) {

    next()
})

app.use('/static', express.static(__dirname + '/public'))

app.use('/api/products', routesProducts)
app.use('/api/carts', routesCarts)

app.listen(8080, () => {
    console.log('Servidor en puerto 8080');
})