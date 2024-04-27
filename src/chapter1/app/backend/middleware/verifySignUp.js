const models = require('../models/index.js')

const User = models.User


checkDuplicateUsername = (req, res, next) => {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Ошибка! Такой пользователь уже существует!"
        })
        return
      }
  
      next()
    })
  }

const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername
}

module.exports = verifySignUp