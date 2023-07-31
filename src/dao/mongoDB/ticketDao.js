import { ticketModel } from "./models/ticketmodel.js";

export default class TicketDao {
    
    async createTicket (ticketData) {
        try {
            const data = await ticketModel.create ({
                ...ticketData,
                purchase_datetime: new Date ()
        });
            return data

        } catch (error) {
            console.log (error)
        }
    }
};

