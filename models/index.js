const User = require('./user')
const Blog = require('./blog')
const ReadingLists = require('./readinglists')
const Session = require('./session')


User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: { model: ReadingLists, as: 'reading_lists' }, as: 'readings' });
Blog.belongsToMany(User, { through: { model: ReadingLists, as: 'reading_lists' }, as: 'readers' });

User.hasMany(Session)
Session.belongsTo(User)

module.exports = {
  Blog, User, ReadingLists, Session
}
