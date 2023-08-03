import TicketService from "../services/ticketServices.js";
import HttpResponse from '../utils/httpResponse.js';

const httpResponse = new HttpResponse();

export default class TicketController {
    async generateTicket (req, res) {
        const cartID = req.params.cid;
        const userID = req.user.email;

        try {
            const ticket = await TicketService.generateTicket(cid, uid)
            return (res.status(200).json({message: 'Purchase successfull', ticket}))    
        } catch (error){
            return httpResponse.ServerError(res, error)
        }
    }
};