const express = require('express')
const {Router} = express
const router = new Router()
const uuid4 = require('uuid4')
const fs = require ('fs');
const carts = require('../carts.json')

router.get('/', (req, res) => {
    let readFile = fs.readFileSync('${__dirname}/../products.json', 'utf-8')
    JSON.parse(readFile);
    if(readFile){
        res.json({data:carts})
    } else {
        res.json({data:newProducto, message:'Ocurrió un error al leer la base de datos'})
    }
})

router.get('/:cid', (req, res) => {
    let readFile = fs.readFileSync('${__dirname}/../products.json', 'utf-8')
    JSON.parse(readFile);
    if(readFile){
        let id = req.params.cid
        if(!isNaN(id)) {
            let encontrado = carts.find((e) => {
                return e.id == id
            })
            if(!encontrado) {
                res.send({error: "Carrito no encontrado"});
            } else {
                res.json(encontrado)
            }
        } else {
        res.send("Se esperaba un entero")
        }
    } else {
        res.json({data:newProducto, message:'Ocurrió un error al leer la base de datos'})
    }
})

router.post('/', (req, res) => {
    let readFile = fs.readFileSync('${__dirname}/../products.json', 'utf-8')
    JSON.parse(readFile);
    if(readFile){
        let newCarrito = req.body
        let id = uuid4()
        newCarrito.id = id
        carts.push(newCarrito)
        try {
            fs.writeFileSync('${__dirname}/../carts.json', JSON.stringify(carts, null, 2), 'utf-8')
            res.json({data:newCarrito, message:'Carrito creado con un producto'})
        } catch (e) {
            console.log('Error escribiendo en ../carts.json:' + e.message)
        }
    } else {
        res.json({data:newProducto, message:'Ocurrió un error al leer la base de datos'})
    }
})

router.post('/:cid/products/:pid', (req, res) => {
    let readFile = fs.readFileSync('${__dirname}/../products.json', 'utf-8')
    JSON.parse(readFile);
    if(readFile){
        let carritoId = req.params.cid
        let productoId = req.params.pid
        if(!isNaN(carritoId)) {
            carritoEncontrado = carts.find(c => c.id == carritoId)
            console.log("Carrito encontrado");
            if(carritoEncontrado) {
                if(!isNaN(productoId)) {
                    let itemIndex = carritoEncontrado.products.findIndex(p => p.id == productoId);
                    if(itemIndex > -1) {
                        let productItem = carritoEncontrado.products[itemIndex];
                        productItem.quantity = productItem.quantity +1;
                        carritoEncontrado.products[itemIndex] = productItem;
                        fs.writeFileSync('${__dirname}/../carts.json', JSON.stringify(carts, null, 2), 'utf-8')
                        console.log("Se encontró el producto, se incrementa la cantidad");
                        res.send("Se encontró el producto, se incrementa la cantidad")
                    } else {
                        let id = uuid4()
                        productoId = id
                        carritoEncontrado.products.push({"id": productoId, "quantity": 1})
                        fs.writeFileSync('${__dirname}/../carts.json', JSON.stringify(carts, null, 2), 'utf-8')
                        console.log("No se encontró el producto, pero se agregó al carrito");
                        res.send("No se encontró el producto, pero se agregó al carrito")
                    }
                } else {
                    res.send ("Se esperaba un entero")
                }
            } else {
                res.send ("No se encontró el carrito")
            }
        } else {
            res.send ("Se esperaba un entero")
        }
    } else {
        res.json({data:newProducto, message:'Ocurrió un error al leer la base de datos'})
    }
})

module.exports = router