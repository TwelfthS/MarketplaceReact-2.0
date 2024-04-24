'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Item, {
        as: "orderedItem",
        through: "OrderItem",
        foreignKey: "orderId"
      })
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    date: DataTypes.STRING,
    cost: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};