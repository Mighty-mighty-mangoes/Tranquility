/* eslint-disable no-unused-vars */
const router = require('express').Router();
const {Candle, CartItem} = require('../db/models');
module.exports = router;

// get cart contents for a logged-in user
router.get('/', async (req, res, next) => {
  const cartContents = await CartItem.findAll({
    where: {userId: req.user.id},
    include: Candle,
  });
  res.json(cartContents);
});

// add an item to the cart for a logged-in user
// Assume req.body has the form {id, quantity}
router.post('/', async (req, res, next) => {
  try {
    let quantity = parseInt(req.body.quantity, 10);
    if (quantity > 0) {
      const [cartItem, created] = await CartItem.findOrCreate({
        where: {userId: req.user.id, candleId: req.body.candleId},
      });
      quantity += cartItem.quantity;
      await cartItem.update({quantity});
    }

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

// Edit the quantity of a cart item for a logged-in user
router.put('/', async (req, res, next) => {
  try {
    const cartItem = await CartItem.findOne({
      where: {userId: req.user.id, candleId: req.body.candleId},
    });
    const quantity = parseInt(req.body.quantity, 10);
    if (quantity === 0) {
      await cartItem.destroy();
    } else if (quantity !== cartItem.quantity) {
      await cartItem.update({quantity});
    }
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

// Delete an item from a logged-in user's cart
router.delete('/', async (req, res, next) => {
  try {
    const cartItem = await CartItem.findOne({
      where: {userId: req.user.id, candleId: req.body.candleId},
    });
    await cartItem.destroy();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});
