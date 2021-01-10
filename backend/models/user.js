'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Message, {onDelete:'cascade'});
      models.User.hasMany(models.Comment, {onDelete:'cascade'});
      models.User.hasMany(models.Like, {onDelete:'cascade'});
    }
  };
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    photo: DataTypes.STRING
  },{
    sequelize,
    modelName: 'User',
  });
  return User;
};