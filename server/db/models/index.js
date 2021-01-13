const Candle = require('./candle');
const CartItem = require('./cartItem');
const User = require('./user');
const Address = require('./address');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasOne(Address);
Address.belongsTo(User);
CartItem.belongsTo(User);
User.hasMany(CartItem);
CartItem.belongsTo(Candle);
Candle.hasMany(CartItem);

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Address,
  Candle,
  CartItem,
};
