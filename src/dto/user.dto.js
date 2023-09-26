export default class UserDto {

    constructor(user){
        this.name = user.firstName
        this.lastname = user.lastName
        this.id = user._id
        this.email = user.email
        this.cart = user.cart
        this.role = user.role
    }
    
};