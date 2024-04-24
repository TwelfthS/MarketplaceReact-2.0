const express = require('express')
const cors = require('cors')
const { Sequelize } = require('sequelize')
const authController = require("./controllers/auth.controller")
const userController = require("./controllers/user.controller")
const { authJwt } = require("./middleware")

const { verifySignUp } = require("./middleware")


const config = require('./config/config.json').development

const sequelize =
    new Sequelize(config.database,
    config.username,
    config.password, {
        host: 'localhost',
        timezone: '+03:00',
        dialect: 'mysql'
    })


sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

const app = express()

app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token"
  )
  next()
})

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`)
})

app.get('/', userController.getProducts)

app.get('/products/:itemId', userController.getProduct)

app.post('/signup', verifySignUp.checkDuplicateUsername, authController.signup)

app.post('/signin', authController.signin)

app.get('/cart', authJwt.verifyToken, userController.getCart)

app.post('/cart', authJwt.verifyToken, userController.addCart)

app.put('/cart', authJwt.verifyToken, userController.addItem)

app.get('/my-orders', authJwt.verifyToken, userController.getMyOrders)

app.post('/my-orders', authJwt.verifyToken, userController.createOrder)