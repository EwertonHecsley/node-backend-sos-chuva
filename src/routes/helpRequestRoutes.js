const { Router } = require('express');
const HelpRequestController = require('../controllers/helpRequestController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.use(authMiddleware);

router.post('/', HelpRequestController.create);
router.get('/', HelpRequestController.list);
router.get('/user/:userId', HelpRequestController.getByNeedUser);
router.get('/:id', HelpRequestController.get);
router.patch('/:id/status', HelpRequestController.updateStatus);
router.delete('/:id', HelpRequestController.delete);

module.exports = router;
