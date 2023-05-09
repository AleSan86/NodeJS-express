const express = require('express')
const {Router} = express
const uuid4 = require('uuid4')
const router = new Router()
const fs = require ('fs');
const products = require('../products.json')

function midProduct(req, res, next) {
    req.data = 'Probando Middleware en Producto'
    next()
}

router.get('/', midProduct, (req, res) => {
    let readFile = fs.readFileSync('${__dirname}/../products.json', 'utf-8')
    JSON.parse(readFile);
    if(readFile){
        let limit = req.query.limit;
        if(!limit || isNaN(limit))
            return res.json({products})
        let productosFiltrados = []
            for(let i = 0; i < limit; i++)
            {
            productosFiltrados.push(products[i])
            };
        return res.send({products:productosFiltrados})
    } else {
        res.json({data:newProducto, message:'Ocurrió un error al leer la base de datos'})
    }
})


router.get('/:pid', (req, res) => {
    let readFile = fs.readFileSync('${__dirname}/../products.json', 'utf-8')
    JSON.parse(readFile);
    if(readFile){
        let id = req.params.pid
        if(!isNaN(id)) {
            let encontrado = products.find((e) => {
                return e.id == id
            })
            if(!encontrado) {
                res.send({error: "Producto no encontrado"});
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
        let newProducto = req.body
        let id = uuid4()
        newProducto.id = id
        products.push(newProducto)
        try {
            fs.writeFileSync('${__dirname}/../products.json', JSON.stringify(products, null, 2), 'utf-8')
            res.json({data:newProducto, message:'Producto creado'})
        } catch (e) {
            console.log('Error escribiendo en ../products.json:' + e.message)
        }
    }
    else {
        res.json({data:newProducto, message:'Ocurrió un error al leer la base de datos'})
    }
})

router.put('/:pid', (req, res) => {
    let id = req.params.pid
    if(!isNaN(id)) {
        let nuevaInfo = [{
            id: id,
            title: req.body.title, 
            description: req.body.description, 
            price: parseInt(req.body.price),
            thumbnail: req.body.thumbnail,
            code: req.body.code,
            stock: req.body.stock
        }]
        let readFile = fs.readFileSync('${__dirname}/../products.json', 'utf-8')
        JSON.parse(readFile);
        if(readFile){
        let encontrado = products.find(p => p.id == id)
        if(encontrado) {
            let index = products.indexOf(encontrado)
            products[index] = [...nuevaInfo]
            fs.writeFileSync('${__dirname}/../products.json', JSON.stringify(products, null, 2), 'utf-8')
            res.json({data:products, message:'Producto actualizado'})
            } else {
                res.send("Producto inexistente")
            }
            } else {
                res.send("Ocurrió un error al leer la base de datos")
            }
    } else {
        res.send("Se esperaba un entero")
    }
})

router.delete('/:pid', (req, res) => {
    let id = req.params.pid
    if(!isNaN(id)) {
        let chequear = products.length
        let resultado = products.filter(p => p.id != id)
        if(resultado.length === chequear) {
            res.send("No se pudo eliminar el archivo")
        } else {
        fs.writeFileSync('${__dirname}/../products.json', JSON.stringify(resultado, null, 2), 'utf-8')
        return res.json({data:resultado, message:'Producto eliminado'})
        }
    } else {
        res.send("Se esperaba un entero")
    }
})


module.exports = router