import TicketService from "../services/ticketServices.js";

export default class TicketController {
    async generateTicket (req, res) {
        const cartID = req.params.cid;
        const userID = req.user.email;

        try {
            const ticket = await TicketService.generateTicket(cid, uid)
            return (res.status(200).json({message: 'Purchase successfull', ticket}))    
        } catch (error){
            console.log(error)
            return (res.status(500).json({message: 'Server error'}))
        }
    }
};