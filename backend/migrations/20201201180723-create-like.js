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
          key: 'id'
        },
        onDelete:'cascade'
      },
      MessageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Messages',
          key: 'id'
        },
        onDelete:'cascade'
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
    // await queryInterface.addConstraint('Likes', {
    //   fields: ['UserId'],
    //   type: 'foreign key',
    //   name: 'fkey_UserId_like',
    //   references: { //Required field
    //     table: 'Users',
    //     field: 'id'
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade'
    // },{
    //   fields: ['MessageId'],
    //   type: 'foreign key',
    //   name: 'fkey_MessageId_like',
    //   references: { //Required field
    //     table: 'Messages',
    //     field: 'id'
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade'}
    // );
  },
 

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Likes');
  }
};