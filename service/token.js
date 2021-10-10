const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
    generateToken (id) {
        const token = jwt.sign({id}, config.jwt_hash, { expiresIn: '30d' })
        return token
    }
}

// async signUp(req, res) {
//     try {
//         const {name, email, phone, password} = req.body;
//         const checkUser = await User.findOne({email});
//         if(checkUser) 
//             return Responder.respondWithFalseSuccess(req, res, {}, 'User Already Exists');

//         const user = new User({
//             name,
//             email,
//             phone,
//             password
//         });


        
//         return Responder.respondWithSuccess(req, res, {
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             phone: user.phone,
//             token,
//         }, 'Successful')    
//     }
//     catch(err) {
//         console.log(err)
//         return Responder.respondWithError(req, res, 'Error')
//     }
// },

// /**
// @route POST api/user/login
// @description Login User
// */ 
// async login (req, res) {    
//     try {
//         const checkUser = await User.findOne({email: req.body.email});
//         if(!checkUser)                 
//             return Responder.respondWithFalseSuccess(req, res, {}, "User Doesn't Exist");

//         let checkPassword = await checkUser.matchPassword(req.body.password)
//         if(!checkPassword)
//             return Responder.respondWithUnauthorised(req, res, "Invalid Password");
    
//         let token = Token.generateToken(checkUser._id);
//         checkUser.token = token;
//         await checkUser.save()
            
//         return Responder.respondWithSuccess(req, res, {
//             _id: checkUser._id,
//             name: checkUser.name,
//             email: checkUser.email,
//             phone: checkUser.phone,
//             token,
//         }, 'Successfully Logged In')   
        
//     } catch (err) {
//         console.log(err)
//         return Responder.respondWithError(req, res, 'Error')
//     }
// }

// }