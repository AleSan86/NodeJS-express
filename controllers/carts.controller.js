import { cartService, productService } from "../services/repository/implementation.js";
import { ProductModel } from '../DAO/models/products.model.js';

export class CartsController {

    getAll = async (req, res) => {
        try {
            let carts = await cartService.getAll();
            res.status(200).json({
                status: "success",
                message: 'Carritos listados',
                payload: carts
            })
        } catch (error) {
            res.status(400).json({
                status: "error",
                error: error.message
            })
        }
    }

    createCart = async (req, res) => {
        try {
            let newCart = await cartService.createCart()
            res.status(201).json({
                status: "success",
                message: 'Carrito creado con éxito',
                payload: newCart
            })
        } catch (error) {
            res.status(400).json({
                status: "error",
                error: error.message
            })
        }
    }

    async getCartById(req, res) {
        try {
            const id = req.params.id;
            const cart = await cartService.getCartById(id);

            res.status(200).json({
                status: "Success",
                message: `Carrito con id: ${id}`,
                payload: cart
            })
        } catch (error) {
            res.status(400).json({
                status: "Error",
                error: error.message
            })
        }
    }

    addProductToCart = async (req, res) => {

        try {
            //const { pid, quantity } = req.params.pid;
            const {code, quantity} = req.body
            const cid = req.params.cid;
            const producto = await productService.getByCode(code)

            if(producto) {
                const cart = await cartService.getCartById(cid);

                if(cart && cart.products.code === code)
                { //Revisar esta validación
                    quantity ++;
                    res.status(201).json({
                        status: "Success",
                        message: 'Se sumó una cantidad de tu producto al carrito.',
                        payload: productoAgregado
                    })
                }

                if(cart) {
                    const productoAgregado = await cartService.addProductToCart(cid, producto);
                    quantity ++;
                    res.status(201).json({
                        status: "Success",
                        message: 'Producto agregado con éxito.',
                        payload: productoAgregado
                    })
                } else {
                    const newCart = await cartService.createCart();
                    const cartCreated = await cartService.addProductToCart(newCart.id, producto);
                    res.status(201).json({
                        status: "Success",
                        message: 'Se armó un carrito nuevo y tu producto fué agregado con éxito.',
                        payload: cartCreated
                    })
                }
            } else {
                res.status(404).send('El producto indicado no se encontró.');
            }
        } catch (error) {
            res.status(400).json({
                status: "Error",
                error: error.message
            })

        }
    }

    deleteCart = async (req, res) => {
        try {
            const cid = req.params.cid;
            const cart = await cartService.deleteCart(cid);

            res.status(200).json({
                status: "Success",
                message: `El carrito se borró exitosamente`,
                payload: cart
            })
        } catch (error) {
            res.status(400).json({
                status: "Error",
                error: error.message
            })
        }
    }

    deleteProductFromCart = async (req, res) => {
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const quantity = req.params.quantity;

            console.log(cid, pid, quantity);

            const cart = await cartService.getCartById(cid);
            console.log(cart)

            if(cart) {
                const producto = await productService.getById(pid);
                console.log(producto)
                if(producto) {
                    const productoEliminado = await cartService.deleteProductFromCart(cid, pid)
                    
                    if(productoEliminado){
                        res.status(201).json({
                            status: "Success",
                            message: `Producto ${pid} eliminado correctamente de tu carrito: ${cid}`,
                            payload: cart
                        })
                    } else {
                        res.status(500).json({
                            status: "Error desconocido por el servidor.",
                            error: error.message
                        })
                    }
                } else {
                    res.status(404).json({
                        status: "Not Found - No existe el producto en el carrito.",
                        error: error.message
                    })
                }
            } else {
                res.status(404).json({
                    status: "Error - No se encontró el carrito informado.",
                    error: error.message
                })
            }
        } catch (error) {
            res.status(400).json({
                status: "Error",
                error: error.message
            })

        }
    }

    ///////////////Métodos NO IMPLEMENTADOS////////////////////
    //TODO Revisar, no le envío nada para actualizar
    updateQuantity = async (req, res) => {
        try {
            const pid = req.params.pid;
            const cid = req.params.cid;
            await cartService.updateCart(cid, pid, req.body);
            const cart = await cartService.getCartById(cid);
            res.status(201).json({
                status: "success",
                message: `Cart with id ${cid} was uploaded successfuly`,
                payload: cart
            })
        } catch (error) {
            res.status(400).json({
                status: "error",
                error: error.message
            })
        }
    }

    updateCart = async (req, res) => {
        try {
            const cid = req.params.cid;
            await cartService.updateCart(cid, null, req.body);
            const cart = await cartService.getCartById(cid);
            res.status(201).json({
                status: "success",
                message: `Carrito con id ${cid} actualizado`,
                payload: cart
            })
        } catch (error) {
            res.status(400).json({
                status: "error",
                error: error.message
            })
        }
    }

    async purchase(req, res) {
        try {
            const cid = req.params.cid
          const user= req.session.user.email
            // const user = req.body.email
            const newTicket = await cartService.purchase(cid, user)
            await cartService.updateProductsCart(cid, newTicket.prodOutStock )
          await  ticketService.updateStock(newTicket.prodStock)
            const newTk={
                id: newTicket.ticket._id,
                amount: newTicket.ticket.amount,
                purchaser:newTicket.ticket.purchaser
            }
            return res.status(200).render('purchased', { newTk })

        } catch (error) {
            return res.status(500).render('error', { error: error.message })
        }
    }

    async getPurchase(req, res) {
        try {
            const ticket = await cartService.getPurchase()
            return res.status(200).json(ticket)
        } catch (error) {
            return res.status(500).render('error', { error: error.message })
        }
    }

    async deletePurchase(req, res) {
        try {
            const ticket = await cartService.deletePurchase()
            return res.status(200).json(ticket)
        } catch (error) {
            return res.status(500).render('error', { error: error.message })
        }
    }
}