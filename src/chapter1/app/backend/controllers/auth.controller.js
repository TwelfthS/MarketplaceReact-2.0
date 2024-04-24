const models = require("../models/index.js")
const config = require("../config/auth.config.js")
const User = models.User

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then(user => {
      const token = jwt.sign({ id: user.id },
                            config.secret,
                            {
                              algorithm: 'HS256',
                              allowInsecureKeySizes: true,
                              expiresIn: 86400, // 24 hours
                            })
        res.status(200).send({
          id: user.id,
          username: user.username,
          accessToken: token
        })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

exports.signin = (req, res) => {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "Пользователь не найден" })
        }
  
        const passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        )
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Неверный пароль!"
          })
        }
  
        const token = jwt.sign({ id: user.id },
          config.secret,
          {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400, // 24 hours
          })
        res.status(200).send({
        id: user.id,
        username: user.username,
        accessToken: token
        })
      })
      .catch(err => {
        res.status(500).send({ message: err.message })
      })
  }