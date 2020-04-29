const db = require("../config/sequelizeConfig"),
  secret = require("../config/secret").secret,
  User = db.user,
  Todo = db.todo,
  jwt = require("jsonwebtoken"),
  brypt = require("bcrypt");

exports.signUp = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: brypt.hashSync(req.body.password, 10),
    });
    res.send(user);
    res.status(200).json({
      status: "success",
      user: req.body,
    });
    return user;
  } catch (err) {
    res
      .status(500)
      .send({ reason: err.message || "Error while creating the user" });
    res.serverEror(err);
    return false;
  }
};

exports.signIn = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) return res.status(404).send({ reason: "User not found" });

    var validPassword = await brypt.compareSync(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res
        .status(401)
        .send({
          auth: false,
          accessToken: null,
          reason: "Wrong password, authorization failed",
        });

    var token = await jwt.sign({ id: user.id }, secret, {
      expiresIn: 43200,
    });

    res.status(200).send({
      auth: true,
      accessToken: token,
      username: user.username,
      id: user.id,
    });
  } catch (err) {
    res.status(500).send({ reason: err.message });
  }
};

exports.userContent = async (req, res, next) => {

  try {
    const user = await User.findOne({
      where: { id: req.userId },
      attributes: ["username", "email"],
      include: [
        {
          model: Todo,
          attributes: ["title", "task"],
        },
      ],
    });
    
    res.status(200).send({
      user: user,
      username: user.username,
      email: user.email,
    });
  } catch (err) {

    res.status(500).send({ reason: err.message });
  }
};
// process.on('unhandledRejection', (err) => {
//   console.error(err);
//   process.exit(1);
// })
