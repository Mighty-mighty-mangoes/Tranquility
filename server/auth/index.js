const router = require('express').Router();
const User = require('../db/models/user');
const Address = require('../db/models/address');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const {email, password} = req.body.info;
    const user = await User.findOne({where: {email: email}});
    if (!user) {
      console.log('No such user found:', email);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(password)) {
      console.log('Incorrect password for user:', email);
      res.status(401).send('Wrong username and/or password');
    } else {
      req.login(user, (err) => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      street,
      city,
      state,
      zipCode,
    } = req.body.info;
    const user = await User.create(
      {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        address: {
          street: street,
          city: city,
          state: state,
          zipCode: zipCode,
        },
      },
      {
        include: [Address],
      }
    );
    req.login(user, (err) => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));
