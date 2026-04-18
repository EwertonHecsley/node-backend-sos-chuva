const MissingPersonModel = require('../models/missingPersonModel');

const MissingPersonService = {
  async reportMissing(data) {
    return await MissingPersonModel.create(data);
  },

  async getAll(page, limit) {
    const missingPersons = await MissingPersonModel.findAll(page, limit);
    const total = await MissingPersonModel.count();
    return { missingPersons, total, page, limit };
  },

  async getById(id) {
    return await MissingPersonModel.findById(id);
  },

  async update(id, data) {
    return await MissingPersonModel.update(id, data);
  },

  async delete(id) {
    return await MissingPersonModel.delete(id);
  },

  async search(query) {
    return await MissingPersonModel.search(query);
  },
};

module.exports = MissingPersonService;
