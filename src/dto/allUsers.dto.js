export default class AllUsersDto{
    constructor(user){
        this.name = user.firstName
        this.lastname = user.lastName
        this.email = user.email
        this.role = user.role
    }
}