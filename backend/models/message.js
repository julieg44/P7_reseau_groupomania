'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Message.hasMany(models.Comment);
      models.Message.hasMany(models.Like);

      models.Message.belongsTo(models.User, {
        foreignKey:{
          allowNull: false
        }
      });
    }
  };
  Message.init({
    UserId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    nbLikes: DataTypes.INTEGER,
    nbDislikes: DataTypes.INTEGER,
    attachment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};