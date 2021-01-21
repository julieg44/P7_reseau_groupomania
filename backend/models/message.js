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
      models.Message.hasMany(models.Comment, {
        onDelete:'cascade' 
      });
      models.Message.hasMany(models.Like), {
        onDelete:'cascade' 
      };

      models.Message.belongsTo(models.User, {
        onDelete:'cascade' 
      });
    }
  };
  Message.init({
    UserId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};