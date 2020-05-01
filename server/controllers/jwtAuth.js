const jwt = require('jsonwebtoken'),
    secret = require('../config/secret').secret,

   

verifyToken = async (req,res,next) =>{
    let token = req.headers['x-access-token'];
    
    if(!token){
        return res.status(403).send({
            auth: false, message: 'token not recived'
        });
    }

    await jwt.verify(token, secret, (err,decodedData)=>{
        if(err){
            return res.status(500).send({
                auth:false, message: 'Authentication fail' + err
            });
        }
        req.userId = decodedData.id;
        next();
    })
}

const jwtAuth = {};
jwtAuth.verifyToken = verifyToken;

module.exports = jwtAuth;