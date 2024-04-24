'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Items', [{
      name: "Toy",
      description: "Very cool toy",
      price: "500",
      image: "/images/toy.jpg",
      createdAt: new Date("2020-01-01")
    }, {
      name: "Shampoo",
      description: "Nice shampoo",
      price: 350,
      image: "/images/shampoo.jpg",
      createdAt: new Date("2024-03-31")
    }, {
      name: "Jacket",
      description: "Black leather jacket",
      price: 1200,
      image: "/images/jacket.jpg",
      createdAt: new Date("2024-01-02")
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
  }
};
