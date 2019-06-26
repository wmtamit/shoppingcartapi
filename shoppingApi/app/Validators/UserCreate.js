'use strict'

class UserCreate {
  get rules () {
    return {
      "username":"required | userexists:users,username",
      "email":"required | email | userexists:users,email",
      "password":"required"
    }
  }
  get messages(){
    return{
    "email":"Enter Valid email address"
  }
}
  async fails(error){
    return this.ctx.response.error(401,error)
  }
}

module.exports = UserCreate
