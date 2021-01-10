'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.User, {
        foreignKey:{
          allowNull: false
        },
        onDelete:'cascade'
      });
      models.Comment.belongsTo(models.Message, {
        foreignKey:{
          allowNull: false
        },
        onDelete:'cascade'
      });
    }
  };
  Comment.init({
    UserId: DataTypes.INTEGER,
    // UserUsername: DataTypes.STRING,
    // UserPhoto: DataTypes.STRING,
    MessageId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};