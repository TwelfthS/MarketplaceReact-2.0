const models = require("../models/index.js")

const User = models.User
const Item = models.Item
const Cart = models.Cart
const Order = models.Order

exports.getProducts = (req, res) => {
    Item.findAll({raw: true}).then((items) => {
        res.status(200).send(items)
    })
}

exports.getProduct = (req, res) => {
    Item.findOne({
        where: {
            id: req.params.itemId
        }
    }).then((item) => {
        res.status(200).send(item)
    }).catch((err) => {
        res.status(404).send({message: "Item not found"})
    })
}

exports.getCart = (req, res) => {
    User.findOne({
        where: {
            id: req.userId
        }
    }).then((user) => {
        user.getAddedItem().then((items) => {
            res.status(200).send(items)
        })
        .catch((err) => {
            res.status(404).send({message: err})
        })
    }).catch((err) => {
        res.status(404).send({message: "User not found"})
    })
}

exports.getMyOrders = async (req, res) => {
    Order.findAll({
        where: {
            userId: req.userId
        },
        include: {
            model: Item,
            as: "orderedItem"
        }
    }).then((orders) => {
        res.status(200).send(orders)
    }).catch((err) => {
        res.status(404).send({message: err})
    })
}

exports.createOrder = async (req, res) => {
    const cost = req.body.items.reduce((sum, item) => sum + item.price * item.Cart.quantity, 0)
    Order.create({
        userId: req.userId,
        // orderedItems: items,
        cost: cost
    }).then((order) => {
        order.update({
            date: parseDate(order.createdAt)
        }).then(() => {
            const promises = req.body.items.map(item => {
                console.log(item.Cart.quantity)
                return order.addOrderedItem(item.id, { through: { quantity: item.Cart.quantity } })
            })
            Promise.all(promises).then(() => {
            // order.addOrderedItem(items, {through: {quantity: quantities}}).then(() => {
                Cart.destroy({
                    where: {
                        userId: req.userId
                    }
                }).then(() => {
                    res.status(200).send(order)
                })
            })
        })
    }).catch((err) => {
        res.status(500).send({message: err})
    })
}

function parseDate(date) {
    const formattedDate = new Date(date).toLocaleString('ru', { dateStyle: 'short', timeStyle: 'short' })
    return formattedDate
}

exports.addCart = (req, res) => {
    Item.findOne({
        where: {
            id: req.body.itemId
        }
    }).then((item) => {
        User.findOne({
            where: {
                id: req.userId
            }
        }).then((user) => {
            user.addAddedItem(item)
            .then(() => {
                item.addBuyer(user)
                .then(() => {
                    res.status(200).send()
                })
            })
        })
    }).catch((err) => {
        res.status(404).send()
    })
}

exports.addItem = (req, res) => {
    Cart.findOne({
        where: {
            userId: req.userId,
            itemId: req.body.itemId
        }
    }).then((record) => {
        if (req.body.change === "removeAll") {
            record.destroy().then(() => {
                res.status(200).send()
            })
        } else {
            record.update({
                quantity: record.quantity + req.body.change
            }).then(() => {
                res.status(200).send()
            })
        }
    })
}