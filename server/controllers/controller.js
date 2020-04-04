const db = require('../config/sequelizeConfig'),
    secret = require('../config/secret').secret,
    User = db.user,
    Todo = db.todo,
    jwt = require('jsonwebtoken'),
    brypt = require('bcrypt');

    const Op = db.Sequelize.Op;

exports.signUp = (req,res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: brypt.hashSync(req.body.password,10)
        
    }).then(data=>{
        res.send(data);
        res.send({message:"Registration completed successfully"});
        res.status(200).json({
            status: 'success',
            data: req.body,
          })
    }).catch(err=>{
        res.status(500).send({reason: err.message || "Error while creating the user"});
        
    });
} 

exports.signIn = (req,res) => {
    User.findOne({
        where:{
            username: req.body.username
        }
    }).then(user=>{
        if(!user)
        return res.status(404).send({reason: "User not found"})

        var validPassword = brypt.compareSync(req.body.password, user.password);
        if(!validPassword)
        return res.status(401).send({auth: false, accessToken: null, reason: "Wrong password, authorization failed"});

        var token = jwt.sign({id: user.id},secret,{
            expiresIn: 43200
        })

        

        res.status(200).send({
            auth: true,
            accessToken: token,
            username: user.username,
            id: user.id,
        });

    }).catch(err=>{
        res.status(500).send({reason: err.message })
    })
} 



exports.userContent = (req, res) => {
    User.findOne({
      where: { id: req.userId },
      attributes: [ 'username', 'email'],
      include: [{
        model: Todo,
        attributes: ['title', 'task']
      }]
    }).then(user => {
      res.status(200).send({
        'description': '>>> User Contents!',
        'user': user,
        'username':user.username,
        'email':user.email
      });
    }).catch(err => {
      res.status(500).send({
        'description': 'Can not access User Page',
        'error': err
      });
    })
  } 