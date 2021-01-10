'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        foreignKey:'fkey_MessageId_like',
        onDelete:'cascade'
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id'},
        onDelete:'cascade'
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      // nbLikes: {
      //   allowNull: false,
      //   type: Sequelize.INTEGER
      // },
      // nbDislikes: {
      //   allowNull: false,
      //   type: Sequelize.INTEGER
      // },
      attachment: {        
        allowNull: true,
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
    await queryInterface.addConstraint('Messages', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'fkey_UserId',
      references: { //Required field
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }
    );

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Messages');
  }
};