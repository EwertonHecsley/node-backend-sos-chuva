const HelpRequestModel = require('../models/helpRequestModel');

const HelpRequestService = {
  async createRequest(data) {
    return await HelpRequestModel.create(data);
  },

  async getAllRequests(page, limit) {
    return await HelpRequestModel.findAll(page, limit);
  },

  async getRequestById(id) {
    return await HelpRequestModel.findById(id);
  },

  async updateStatus(id, status) {
    return await HelpRequestModel.update(id, status);
  },

  async deleteRequest(id) {
    return await HelpRequestModel.delete(id);
  },

  async getByNeedUserId(userId) {
    return await HelpRequestModel.findByNeedUserId(userId);
  },
};

module.exports = HelpRequestService;
