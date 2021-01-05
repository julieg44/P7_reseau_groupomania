'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Likes', {
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
          key: 'id',
        }
      },
      MessageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Messages',
          key: 'id',
        }
      },
      like: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: '0',

      },
      dislike: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: '0',
      },
      userLikes: {
        allowNull: true,
        type: Sequelize.JSON,
        defaultValue: null,
      },
      userDislikes: {
        allowNull: true,
        type: Sequelize.JSON,
        defaultValue: null,
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
    await queryInterface.dropTable('Likes');
  }
};