const router = require('express').Router();
const {User, CartItem} = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  console.log(req.session.user);
  res.sendStatus(200);
});
