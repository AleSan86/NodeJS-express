import { TicketClass } from "../DAO/clases/tickets.clases.js";

import { ProductService } from "../services/products.service.js"

const productService = new ProductService;

export class TicketService {

    async createTicket(tk) {
        const newTk = await TicketClass.create(tk);
        return newTk
    }

    async updateStock(prodStock) {
        prodStock.map(async (prod, index) => {
            await productService.updateStockProduct(prod.idProduct, prod.stock)
            console.log("Stock de producto modificado exitosamente",prodStock);
        })
    }

    async getTickets() {
        const newTk = await TicketClass.getAll();
        return newTk
    }

    async deletePurchase() {
        const newTk = await TicketClass.deletePurchase();
        return newTk
    }

}


