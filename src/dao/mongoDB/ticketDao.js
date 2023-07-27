import { ticketModel } from "./models/ticketmodel.js";

export default class TicketDao {
    
    async createTicket (ticketData) {
        try {
            const response = await ticketModel.create (ticketData);
            return response

        } catch (error) {
            console.log (error)
        }
    }
};

