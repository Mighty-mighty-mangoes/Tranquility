/* eslint-disable no-unused-vars */
const router = require('express').Router();
const {Candle, Order, OrderItem} = require('../db/models');
module.exports = router;
const matchUserOrSession = (req) =>
  req.user
    ? {userId: req.user.id, purchased: false}
    : {sessionID: req.sessionID, purchased: false};

// get cart contents for a logged-in user
router.get('/', async (req, res, next) => {
  console.log('Session ID', req.sessionID);
  try {
    const [order, created] = await Order.findOrCreate({
      where: matchUserOrSession(req),
      include: Candle,
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// add an item to the cart for a logged-in user
// req.body should have the form {candleId, quantity}
// Creates a new order if the user has no active orders
// If the user already has an order item tied to req.body.candleId,
// increments the quantity by req.body.quantity
router.post('/', async (req, res, next) => {
  try {
    let quantity = parseInt(req.body.quantity, 10);
    const candleId = parseInt(req.body.candleId, 10);
    if (quantity > 0) {
      const [order, created] = await Order.findOrCreate({
        where: matchUserOrSession(req),
        include: OrderItem,
      });
      const matchingItems = order.orderItems.filter(
        (item) => item.candleId === candleId
      );
      if (matchingItems.length) {
        quantity += matchingItems[0].quantity;
        await matchingItems[0].update({quantity});
      } else {
        const orderItem = await order.createOrderItem({
          quantity,
          candleId,
        });
      }
    }
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

// Edit the quantity of a cart item for a logged-in user
// req.body should have the form {candleId, quantity}, where
// the user has an existing order item tied to req.body.candleId;
// sets the quantity of this order item to req.body.quantity
router.put('/', async (req, res, next) => {
  try {
    const candleId = parseInt(req.body.candleId, 10);
    const quantity = parseInt(req.body.quantity, 10);
    const order = await Order.findOne({
      where: matchUserOrSession(req),
      include: OrderItem,
    });
    const matchingItems = order.orderItems.filter(
      (item) => item.candleId === candleId
    );
    if (quantity === 0) {
      await matchingItems[0].destroy();
    } else if (quantity !== matchingItems[0].quantity) {
      await matchingItems[0].update({quantity});
    }
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

// Delete an item from a logged-in user's cart
// req.body should have the form {candleId}, where
// the user has an order item tied to req.body.candleId;
// removes this order item
router.delete('/', async (req, res, next) => {
  try {
    const candleId = parseInt(req.body.candleId, 10);
    const order = await Order.findOne({
      where: matchUserOrSession(req),
      include: OrderItem,
    });
    const matchingItems = order.orderItems.filter(
      (item) => item.candleId === candleId
    );
    await matchingItems[0].destroy();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.post('/checkout', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: matchUserOrSession(req),
      include: Candle,
    });
    let insufficientStock = false;
    for (let i = 0; i < order.candles.length; i++) {
      if (order.candles[i].stock < order.candles[i].orderItem.quantity) {
        insufficientStock = true;
        break;
      }
    }
    if (insufficientStock) {
      res.status(409);
    } else {
      await Promise.all(
        order.candles.map((candle) =>
          candle.update({stock: candle.stock - candle.orderItem.quantity})
        )
      );
      await order.update({purchased: true});
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
});
