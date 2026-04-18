const { Router } = require('express');
const UserController = require('../controllers/userController');
const validate = require('../middlewares/validateMiddleware');
const userSchemas = require('../dtos/userDto');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.post(
  '/register',
  validate(userSchemas.register),
  UserController.register,
);
router.post('/login', validate(userSchemas.login), UserController.login);

router.use(authMiddleware);

router.get('/', UserController.list);
router.get('/:id', UserController.get);
router.put('/:id', validate(userSchemas.update), UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;
