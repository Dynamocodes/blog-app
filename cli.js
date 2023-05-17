require('dotenv').config();
const { DataTypes } = require('sequelize');
const sequelize = require('./utils/db.js');
const Blog = require('./models/blog.js');



const main = async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      
      const blogs = await Blog.findAll();
      
      blogs.forEach(blog => {
        console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
      });
      
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    } finally {
      await sequelize.close();
    }
  }
  
  main();