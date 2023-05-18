const User = require('./user')
const Blog = require('./blog')
const ReadingLists = require('./readinglists')


User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: { model: ReadingLists, as: 'reading_lists' }, as: 'readings' });
Blog.belongsToMany(User, { through: { model: ReadingLists, as: 'reading_lists' }, as: 'readers' });

module.exports = {
  Blog, User, ReadingLists
}
