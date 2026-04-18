const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const Security = {
  async hashPassword(password) {
    try {
      return await argon2.hash(password);
    } catch (err) {
      throw new Error('Erro ao processar senha');
    }
  },

  async verifyPassword(hash, password) {
    try {
      return await argon2.verify(hash, password);
    } catch (err) {
      return false;
    }
  },

  generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '30m' });
  },

  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return null;
    }
  },
};

module.exports = Security;
