import { CartClass } from '../DAO/classes/carts.classes.js';
import { TicketService } from "./tickets.services.js";
import { UserService } from "./users.services.js";
import { CartMethods } from "../DAO/factory.js"

const cartClase = new CartClass()

export class CartService {

  validateCart(id) {
    if (!id) {
      console.log('Error: No existe un carrito con el id indicado.');
      throw new Error('Error: No existe un carrito con el id indicado.');
    }
  }

  async getAll() {
    try {
      const carts = await CartMethods.find();
      return carts;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getById(_id) {
    try {
      const cart = await CartMethods.findPopulatedOne(_id);
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createCart() {
    try {
      let cartCreated = await CartMethods.create({ products: [] })
      console.log('Carrito creado con éxito');
      return cartCreated;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteCart(_id) {
    try {
    const deleted = await CartMethods.deletedOne(_id);
    return deleted;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateCart(cartId, productId, cartByUser) {
    try {
      if (productId === null) {
        let cart = await CartMethods.findOne(cartId)
        let newCart = cart.products = cartByUser.products
        await cart.save();
        console.log(`Los productos del carrito: ${cartId} se actualizaron correctamente`)
        return newCart;
      } else {
        let cart = await CartMethods.findOne(cartId)
        let existingProduct = cart.products.find((pId) => pId.idProduct.equals(productId));
        if (existingProduct) {
          existingProduct.quantity = cartByUser.quantity
        } else {
          throw new Error(`El producto solicitado: ${productId} no se encuentra en el carrito: ${cartId}`);
        }
        await cart.save();
        return cart;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProductToCart(productId, cartId) {
    try {
      let carts = await this.getAll();
      let encontrado = carts.find((cId) => cId._id.equals(cartId));
      if (!encontrado) {
        throw new Error("No se encontró un carrito con el id informado");
      }
      let cart = await CartMethods.findOne(cartId);
      console.log(cart)
      let existingProduct = cart.products.find((pId) => pId.idProduct.equals(productId));

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ idProduct: productId, quantity: 1 });
      }
      await cart.save();
      console.log(`Producto ${productId} agregadocon éxito el carrito ${cartId}`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProductFromCart(productId, cartId) {
    try {
      let carts = await this.getAll();
      let encontrado = carts.find((cId) => cId._id.equals(cartId));
      if (!encontrado) {
        throw new Error("No se encontró el carrito");
      }
      let cart = await CartMethods.findOne(cartId)

      let existingProduct = cart.products.find((pId) => pId.idProduct.equals(productId));
      if (existingProduct) {
        if (existingProduct.quantity === 1) {
          cart.products.splice(cart.products.indexOf(existingProduct), 1);
        } else {
          existingProduct.quantity -= 1;
        }
      } else {
        throw new Error(`Producto no encontrado en el carrito: ${cartId}`);
      }
      await cart.save();
      console.log(`Producto ${productId} eliminado con éxito del carrito: ${cartId}`);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateCart(cartId, productId, cartByUser) {
    try {
      if (productId === null) {
        //Modifica el carrito nuevo
        let cart = await CartMethods.findOne(cartId)
        let newCart = cart.products = cartByUser.products
        await cart.save();
        console.log(`Los proaductos del carrito: ${cartId}, se actualizaron exitosamente`)
        return newCart;
      } else {
        //Modifica la cantidad del carrito
        let cart = await CartMethods.findOne(cartId)
        let existingProduct = cart.products.find((pId) => pId.idProduct.equals(productId));
        if (existingProduct) {
          existingProduct.quantity = cartByUser.quantity
        } else {
          throw new Error(`Producto no encontrado en el carrito: ${cartId}`);
        }
        await cart.save();
        return cart;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProductsCart(cartId, arrayproductId) {
    try {
      let cart = await CartMethods.updateProducts(cartId, arrayproductId)
      console.log(`Los productos del carrito: ${cartId} se actualizaron exitosamente`)
      return cart;
    } catch (error) {
      console.log("---------------------------------", error)
      throw new Error(error.message);
    }
  }

  async purchase(cartId, user) {
    try {
      let cart = await CartMethods.findOne(cartId)
      if (cart) {
        // consigue id de productos en cart
        const productIds = cart.products.map(product => product.idProduct.toString());
        // consigue quantity de productos en cart
        const productsQuantity = cart.products.map(quan => quan.quantity)
        // consigue datos de los productos en cart
        const productsData = await productService.getArrProductsData(productIds)

        let amount = 0;
        let prodOutStock = []
        let prodStock = []
        // let prodLessStock = []

        productsData.map((prod, index) => {
          //Si No hay stock del producto
          if (productsQuantity[index] > prod.stock) {
            //Lo pusheamos al array para luego modificar el cart
            prodOutStock.push({
              idProduct: prod._id,
              quantity: productsQuantity[index]
            });
          }

          else { //Si hay stock del product
            //este va a ser el nuevo stock del producto 
            let newStock = prod.stock - (productsQuantity[index])

            //Multiplicamos el precio por la cantidad y lo sumamos al total
            let priceProduct = prod.price * (productsQuantity[index])
            amount += priceProduct
            //pusheamos al array para luego modificar el stock del producto con el nuevo stock
            prodStock.push({
              idProduct: prod._id,
              stock: newStock
            });
          }
        })
        //Usamos .createTicket y  Creamos el ticket
        const ticket = await ticketService.createTicket({
          amount,
          purchaser: user,//Email del user que lo sacamos de req.session
          // cartId
        })

        return {ticket, prodStock, prodOutStock
        }
      } else {
        throw new Error('El carrito no existe');
      }

    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getPurchase() {
    try {
      const tickets = await ticketService.getTickets();
      return tickets;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deletePurchase() {
    try {
      const tickets = await ticketService.deletePurchase();
      return tickets;
    } catch (error) {
      throw new Error(error.message);
    }
  }

// getAll = async (req, res) => {
  //   const { page, limit } = req.query;
  //   try {
  //     const dataCarts = await Service.getAll(page, limit);
  //     //console.log(dataCarts);
  //     return res.status(200).json({
  //       status: 'Success',
  //       payload: dataCarts.docs,
  //       totalPages: dataCarts.totalPages,
  //       prevPages: dataCarts.prevPage,
  //       nextPages: dataCarts.nextPage,
  //       page: dataCarts.page,
  //       hasPrevPage: dataCarts.hasPrevPage,
  //       hasNextPage: dataCarts.hasNextPage,
  //       prevLink: dataCarts.hasPrevPage ? `http://localhost:8080/dataCarts/?page=${dataCarts.prevPage} ` : null,
  //       nextLink: dataCarts.hasNextPage ? `http://localhost:8080/dataCarts/?page=${dataCarts.nextPage} ` : null,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     return res.status(500).json({
  //       status: 'Error',
  //       msg: 'Error obteniendo los carritos',
  //       data: {},
  //     });
  //   }
  // }



}
