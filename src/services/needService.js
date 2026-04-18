const NeedModel = require('../models/needModel');

const NeedService = {
  async createNeed(data) {
    return await NeedModel.create(data);
  },

  async getAllNeeds(page, limit) {
    const needs = await NeedModel.findAll(page, limit);
    const total = await NeedModel.count();
    return { needs, total, page, limit };
  },

  async getNeedById(id) {
    return await NeedModel.findById(id);
  },

  async updateNeed(id, data) {
    return await NeedModel.update(id, data);
  },

  async deleteNeed(id) {
    return await NeedModel.delete(id);
  },

  async searchNeeds(query) {
    return await NeedModel.search(query);
  },
};

module.exports = NeedService;
