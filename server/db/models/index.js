const Candle = require('./candle');
const OrderItem = require('./orderItem');
const Ingredient = require('./ingredient');
const Order = require('./order');
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
User.hasMany(Order);
Order.belongsTo(User);
OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);
Order.belongsToMany(Candle, {through: OrderItem});
Candle.belongsToMany(Order, {through: OrderItem});

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
  OrderItem,
  Ingredient,
  Order,
};
