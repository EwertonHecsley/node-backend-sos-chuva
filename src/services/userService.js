const UserModel = require('../models/userModel');
const Security = require('../utils/security');

const UserService = {
  async createUser(userData) {
    const { password, ...rest } = userData;
    const hashedPassword = await Security.hashPassword(password);

    const user = await UserModel.create({
      ...rest,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  async login(email, password) {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const isValid = await Security.verifyPassword(user.password, password);
    if (!isValid) {
      throw new Error('Credenciais inválidas');
    }

    const token = Security.generateToken({
      id: user.id,
      email: user.email,
      type: user.type,
    });

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  },

  async getUserById(id) {
    return await UserModel.findById(id);
  },

  async getAllUsers(page, limit) {
    const users = await UserModel.findAll(page, limit);
    const total = await UserModel.count();
    return { users, total, page, limit };
  },

  async updateUser(id, data) {
    return await UserModel.update(id, data);
  },

  async deleteUser(id) {
    return await UserModel.delete(id);
  },
};

module.exports = UserService;
