const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../utils/db')

class Blog extends Model {}
Blog.init({
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  author: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  year_written: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isGreaterThanOrEqual(value) {
        return new Promise((resolve, reject) => {
          const currentYear = new Date().getFullYear();
          if (value < 1991 || value > currentYear) {
            reject('Year must be at least 1991 and not greater than the current year');
          } else {
            resolve();
          }
        });
      },
    },
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})
  

module.exports = Blog;
