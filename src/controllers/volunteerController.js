const VolunteerService = require('../services/volunteerService');

const VolunteerController = {
  async create(req, res) {
    try {
      const volunteer = await VolunteerService.createVolunteer(req.body);
      res.status(201).json(volunteer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async list(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const result = await VolunteerService.getAllVolunteers(page, limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async get(req, res) {
    try {
      const volunteer = await VolunteerService.getVolunteerById(req.params.id);
      if (!volunteer)
        return res.status(404).json({ error: 'Voluntário não encontrado' });
      res.json(volunteer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const volunteer = await VolunteerService.updateVolunteer(
        req.params.id,
        req.body,
      );
      res.json(volunteer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await VolunteerService.deleteVolunteer(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async search(req, res) {
    try {
      const { q } = req.query;
      const result = await VolunteerService.searchVolunteers(q);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = VolunteerController;
