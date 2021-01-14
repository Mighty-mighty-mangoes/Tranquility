const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password');
    },
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt');
    },
  },
  googleId: {
    type: Sequelize.STRING,
  },

  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  fullName: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
  phone: {
    type: Sequelize.STRING, //the form format can make sure this is entered in corrent format
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

/**
 * hooks
 */
const setSaltAndPassword = (user) => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};
//format first name hook
User.beforeCreate((user) => {
  let properFirst = `${user.firstName[0].toUpperCase()}${user.firstName
    .slice(1)
    .toLowerCase()}`;
  user.firstName = properFirst;
});
//format last name hook
User.beforeCreate((user) => {
  let properLast = `${user.lastName[0].toUpperCase()}${user.lastName
    .slice(1)
    .toLowerCase()}`;
  user.lastName = properLast;
});

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate((users) => {
  users.forEach(setSaltAndPassword);
});

module.exports = User;
