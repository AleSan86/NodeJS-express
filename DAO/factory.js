import config from '../config/config.js';

export let CartMethods;
export let ProductMethods;
export let ChatMethods;
export let TicketMethods;
export let UserMethods;


switch (config.persistence) {
  case 'MONGO':
    console.log('Persistencia con Mongo')
    const { cartModel } = await import('../DAO/classes/carts.classes.js');
    CartMethods = cartModel;
    const { productModel } = await import('../DAO/classes/products.classes.js');
    ProductMethods = productModel;
    const { ticketModel } = await import('../DAO/classes/tickets.classes.js');
    TicketMethods = ticketModel;
    const { userModel } = await import('../DAO/classes/users.classes.js')
    UserMethods = userModel;

    break;
  case 'FS':
    console.log('Persistencia con FileSystem');
    const { cartManager } = await import('../DAO/fs/classes/CartsManager.js');
    CartMethods = cartManager;
    const { productManager } = await import('../DAO/fs/classes/ProductManager.js');
    ProductMethods = productManager;

    break;
  default:
    break;
}