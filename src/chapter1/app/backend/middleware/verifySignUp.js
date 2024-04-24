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
          message: "Failed! Username is already in use!"
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