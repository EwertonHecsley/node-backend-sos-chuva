const VolunteerModel = require('../models/volunteerModel');

const VolunteerService = {
  async createVolunteer(data) {
    return await VolunteerModel.create(data);
  },

  async getAllVolunteers(page, limit) {
    const volunteers = await VolunteerModel.findAll(page, limit);
    const total = await VolunteerModel.count();
    return { volunteers, total, page, limit };
  },

  async getVolunteerById(id) {
    return await VolunteerModel.findById(id);
  },

  async updateVolunteer(id, data) {
    return await VolunteerModel.update(id, data);
  },

  async deleteVolunteer(id) {
    return await VolunteerModel.delete(id);
  },

  async searchVolunteers(query) {
    return await VolunteerModel.search(query);
  },
};

module.exports = VolunteerService;
