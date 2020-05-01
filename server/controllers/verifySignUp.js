const db = require('../config/sequelizeConfig'),
    User = db.user;

checkDuplicates = async (req,res,next) =>{
const checkedUsername = await User.findOne({
        where:{
            username: req.body.username
        }
    })
    if(checkedUsername){
        res.status(400).send('username already taken');
        return;
    }

const checkedEmail = await User.findOne({
        where:{
            email: req.body.email
        }
    })
        if(checkedEmail){
            res.status(400).send('email already taken');
            return;
        }
      next();  
    
}

const verifySignUp = {};
verifySignUp.checkDuplicates = checkDuplicates;
module.exports = verifySignUp;