import { TicketModel } from "../models/tickets.model.js";

export class TicketClass{

    async create(newTicket){
        const ticket = await TicketModel.create(newTicket)
        return ticket;
    }

    async getAll(){
        const ticket = await TicketModel.find({})
        return ticket;
    }

    async deletePurchase(){
        const ticket = await TicketModel.deleteMany({})
        return ticket;
    }
    
}