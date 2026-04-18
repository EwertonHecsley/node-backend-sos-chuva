const { Router } = require('express');
const NeedController = require('../controllers/needController');
const validate = require('../middlewares/validateMiddleware');
const needSchemas = require('../dtos/needDto');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.use(authMiddleware);

router.post('/', validate(needSchemas.create), NeedController.create);
router.get('/', NeedController.list);
router.get('/search', NeedController.search);
router.get('/:id', NeedController.get);
router.put('/:id', validate(needSchemas.update), NeedController.update);
router.delete('/:id', NeedController.delete);

module.exports = router;
