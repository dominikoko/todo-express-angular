const db = require('../config/sequelizeConfig'),
    User = db.user;

checkDuplicates = (req,res,next) =>{
    User.findOne({
        where:{
            username: req.body.username
        }
    }).then(user=>{
    if(user){
        res.status(400).send('username already taken');
        return;
    }

    User.findOne({
        where:{
            email: req.body.email
        }
    }).then(user=>{
        if(user){
            res.status(400).send('email already taken');
            return;
        }
      next();  
    });

    });
}

const verifySignUp = {};
verifySignUp.checkDuplicates = checkDuplicates;
module.exports = verifySignUp;