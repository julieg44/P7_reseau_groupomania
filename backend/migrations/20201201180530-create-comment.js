'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id'},
        onDelete:'cascade'
      },
      // UserUsername: {
      //   allowNull: false,
      //   type: Sequelize.STRING,
      // },
      // UserPhoto: {
      //   allowNull: true,
      //   type: Sequelize.STRING,
      // },
      MessageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Messages',
          key: 'id'
        },
        onDelete:'cascade'
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  }
};