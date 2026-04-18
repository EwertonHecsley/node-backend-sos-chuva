const { Router } = require('express');
const VolunteerController = require('../controllers/volunteerController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.use(authMiddleware);

router.post('/', VolunteerController.create);
router.get('/', VolunteerController.list);
router.get('/search', VolunteerController.search);
router.get('/:id', VolunteerController.get);
router.put('/:id', VolunteerController.update);
router.delete('/:id', VolunteerController.delete);

module.exports = router;
