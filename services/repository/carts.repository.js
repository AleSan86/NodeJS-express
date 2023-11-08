export default class CartsRepository {

    constructor(dao) {
        this.dao = dao;
    }

    get = () => {
        return this.dao.getCart();
    }

    getAll = () =>{
        return this.dao.getAll();
    }

    getCartById = (id) => {
        return this.dao.getById(id);
    }

    createCart = (cart) =>{
        return this.dao.createOne(cart);
    }

    updateCart = (id, cart) =>{
        return this.dao.updateCart(id, cart);
    }

    deleteCart = (id) => {
        return this.dao.deleteCart(id);
    }

    addProductToCart = (cartId, product) => {
        return this.dao.updateProducts(cartId, product);
    }

    deleteProductFromCart = (cartId, productoEliminado) => {
        return this.dao.deleteProductFromCart(cartId, productoEliminado);
    }

    //Todo updateQuantity / purchase / getPurchase / deletePurchase
};