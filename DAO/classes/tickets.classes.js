import { TicketModel } from "../models/tickets.model.js";

export class TicketClass {

  async getAll() {
    const newTk = await TicketModel.find({})
    return newTk;
  }

  async createOne(newTicket) {
    const newTk = await TicketModel.create(newTicket)
    return newTk;
  }

  async deletePurchase(){
    const newTk = await TicketModel.deleteMany({})
    return newTk;
}
}