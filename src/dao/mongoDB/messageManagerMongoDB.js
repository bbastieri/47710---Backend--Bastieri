import { MessageModel } from "./models/messagesModel";

export default class MessageManagerMongoDB {

    async getMessages () {
        try{
            const response = await MessageModel.find({});
            return response;
        }catch (error) {
            console.log(error)
        }
    };

    async addMessage (obj) {
        try{
            const response = await MessageModel.create(obj);
            return response;
        }catch (error) {
            console.log(error)
        }
    };

    async deleteMessages () {
        try{
            const response = await MessageModel.deleteMany({});
            return response;
        }catch (error) {
            console.log(error)
        }
    };


};

