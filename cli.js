require('dotenv').config();
const { DataTypes } = require('sequelize');
const sequelize = require('./models/postgres.js');
const Blog = require('./models/Blog');



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