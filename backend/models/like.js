'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Like.belongsTo(models.User, {
        foreignKey:{
          allowNull: false
        }
      });
      models.Like.belongsTo(models.Message, {
        foreignKey:{
          allowNull: false
        }
      });
    }
  };
  Like.init({
    idUsers: DataTypes.INTEGER,
    idMessages: DataTypes.INTEGER,
    likeValue: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};