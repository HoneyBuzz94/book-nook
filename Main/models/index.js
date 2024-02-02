const User = require('./models/User');
const Book = require('./models/Book');

User.hasMany(Book, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Book.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Book };