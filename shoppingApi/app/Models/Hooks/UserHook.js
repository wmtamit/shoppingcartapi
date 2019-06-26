'use strict'
// const CustomException=use("App/Exceptions/CustomException");
const UserHook = exports = module.exports = {}
const Hash = use('Hash')
UserHook.hashPassword = async (user) => {
    user.password= await Hash.make(user.password)
}

// UserHook.validate=async(user)=>{
//     if(!user.username)
//         throw new CustomException("username required",422,"E_INVALID_ARGUMENT")
        
    
// }
