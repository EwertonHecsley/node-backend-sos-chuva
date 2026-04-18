const { Router } = require('express');
const MissingPersonController = require('../controllers/missingPersonController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.use(authMiddleware);

router.post('/', MissingPersonController.create);
router.get('/', MissingPersonController.list);
router.get('/search', MissingPersonController.search);
router.get('/:id', MissingPersonController.get);
router.put('/:id', MissingPersonController.update);
router.delete('/:id', MissingPersonController.delete);

module.exports = router;
