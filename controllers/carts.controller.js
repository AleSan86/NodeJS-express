import { CartService } from '../services/carts.services.js';
import { ProductService } from "../services/products.services.js";
import { TicketService } from "../services/tickets.services.js";

const ticketService = new TicketService();
const productService = new ProductService();

const Service = new CartService();

export class CartsController {

  async getAll(req, res) {
    try {
      let carts = await Service.getAll()
      res.status(200).json({
        status: "success",
        message: 'Lista de carritos',
        payload: carts
      })
    } catch (error) {
      res.status(400).json({
        status: "error",
        error: error.message
      })
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const cart = await Service.getById(id)
      return cart ?
        res.status(200).json({
          status: 'Success',
          msg: 'Carrito obtenido con éxito',
          data: cart,
        }) :
        res.status(200).json({
          status: 'Error',
          msg: 'Carrito no encontrado',
          data: cart,
        })
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'Error',
        msg: 'Error al obtener el carrito',
        data: {},
      });
    }
  }

  async createOne(req, res) {
    try {
      const cartCreated = await Service.createOne();
      return res.status(201).json({
        status: 'Success',
        msg: 'Carrito creado',
        data: cartCreated,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'Error',
        msg: 'Error al crear el carrito',
        data: {},
      });
    }
  };

  async deletedOne(req, res) {
    try {
      const id = req.params.id;
      const cart = await Service.deletedOne(id)
      return res.status(200).json({
        status: 'Success',
        msg: 'Carrito eliminado correctamente',
        payload: cart
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'Error',
        msg: 'Error el eliminar el carrito',
        data: {},
      });
    }
  };

  updateOne = async (req, res) => {
    try {
      const { id } = req.params;
      //const { name, marca, description, price } = req.body;

      await Service.updateOne(id)
      return res.status(201).json({
        status: 'Success',
        msg: 'Carrito editado con éxito',
        data: { id },
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: 'Error',
        msg: 'Error el actualizar el carrito',
        data: {},
      });
    }
  }

  //Controladores para el tratamiento de los productos en el Cart

  async addProductToCart(req, res) {
    try {
        const pid = req.params.pid;
        const cid = req.params.cid;
        await Service.addProductToCart(pid, cid)
        const cart = await Service.getById(cid);
        res.status(201).json({
            status: "success",
            message: `Producto agregado con éxito al carrito ${cid}`,
            payload: cart
        })
    } catch (error) {
        res.status(400).json({
            status: "error",
            error: error.message
        })
    }
  }

  async deleteProductFromCart(req, res) {
    try {
      const pid = req.params.pid;
      const cid = req.params.cid;
      await Service.deleteProductFromCart(pid, cid)
      const cart = await Service.getById(cid);
      console.log(cart)
      res.status(201).json({
        status: "success",
        message: `Producto con id:${pid} fué eliminado exitosamente del carrito: ${cid}`,
        payload: cart
      })
    } catch (error) {
      res.status(400).json({
        status: "error",
        error: error.message
      })
    }
  }

  async updateQuantity(req, res) {
    try {
      const pid = req.params.pid;
      const cid = req.params.cid;
      await Service.updateOne(cid, pid, req.body);
      const cart = await Service.getById(cid);
      res.status(201).json({
        status: "success",
        message: `Carrito con id: ${cid} actualizado exitosamente`,
        payload: cart
      })
    } catch (error) {
      res.status(400).json({
        status: "error",
        error: error.message
      })
    }
  }

  //Controladores para el tratamiento de los tickets

  async purchase(req, res) {
    try {
      const cid = req.params.cid
      const user= req.session.user.email
      // const user = req.body.email
      const newTicket = await Service.purchase(cid, user)
      await Service.updateProductsCart(cid, newTicket.prodOutStock )
      await ticketService.updateStock(newTicket.prodStock)
      const newTk = {
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
      const ticket = await Service.getPurchase()
      return res.status(200).json(ticket)
    } catch (error) {
      return res.status(500).render('error', { error: error.message })
    }
  }

  async deletePurchase(req, res) {
    try {
      const ticket = await Service.deletePurchase()
      return res.status(200).json(ticket)
    } catch (error) {
      return res.status(500).render('error', { error: error.message })
    }
  }
}