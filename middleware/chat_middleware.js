const jsonwebtoken = require('jsonwebtoken');
const User = require('../model/user_model'); 
const Organization = require('../model/organization_model');

const userMiddleware = async (req,res,next )=> {
    const token = req.header("x-auth-token");
    const org = req.header("org");
 if (!token){
        res.send({"status":"failed","message":"Token not found"}); 
    }else{
        try {
            const user= jsonwebtoken.verify(token, process.env.JWT_SECRET);
            // console.log(user.user.id);
            req.user = await User.findById(user.user.id).select('-password');
            console.log(req.user);
            const org = await Organization.findById(org);
            console.log(org);
            if(org.members.includes(req.user._id)){
                next();
            }
            else{
                res.status(403).send({"status":"failed","message":"Unauthorized sender"}); 
            }
           
        }catch(err){
            console.log(err);
            res.status(403).send({"status":"failed","message":"Unauthorized sender"}); 
        }
    }
}
module.exports  = userMiddleware ;