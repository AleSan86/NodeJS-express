import { TicketMethods } from "../DAO/factory.js";
import { ProductService } from "./products.services.js"
import { CartService } from "./carts.services.js";

const productService = new ProductService;

export class TicketService {

    async createTicket(tk) {
        const newTk = await TicketMethods.create(tk);
        return newTk
    }

    async updateStock(prodStock) {
        prodStock.map(async (prod, index) => {
            await productService.updateStockProduct(prod.idProduct, prod.stock)
            console.log("Stock modificado", prodStock);
        })
    }

    async getTickets() {
        const newTk = await TicketMethods.getAll();
        return newTk
    }

    async deletePurchase() {
        const newTk = await TicketMethods.deletePurchase();
        return newTk
    }

}


