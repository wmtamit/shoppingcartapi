'use strict'
const User = use("App/Models/User")
const Token=use('App/Models/Token')
const Event = use("Event")
class UserController {
    async signup({request,response,auth}){
        try{
        let user = await User.create(request.all())
        //token genrate for current signup user
        let token=await auth.generate(user)
        Object.assign(user,token)
        Event.fire('new::user', user)
      
        
        return response.success(201,user)
        }
        catch(e){
            return response.error(401,e)
        }
       
    }   
    async login({request,response,auth}){
        let {email,password}=request.all()
        try{
            if(await auth.attempt(email,password)){
                let user=await User.findBy('email',email)
                let tokens=await auth.generate(user)
                Object.assign(user,tokens)
                // console.log(user)
                let tokenuserid= await Token.findBy('user_id',user.id)
                if(tokenuserid===null){
                const tokendata={
                    user_id:user.id,
                    token:user.token,
                    type:user.type
                }
                // console.log(tokendata)
                const tokencreates= await Token.create(tokendata)
                console.log("tokencreates")
                return response.success(201,tokencreates)
            }
            else{
                return response.success(201,tokenuserid)
            }
                
            }
        
    }
        catch(e){
            console.log(e.message)
            return response.notfound(e.status || 409,e.message)
        }
    }
}

module.exports = UserController
