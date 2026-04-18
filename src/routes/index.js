const { Router } = require('express');
const healthCheckRouter = require('./healthCheck');
const userRoutes = require('./userRoutes');
const needRoutes = require('./needRoutes');
const volunteerRoutes = require('./volunteerRoutes');
const missingPersonRoutes = require('./missingPersonRoutes');
const helpRequestRoutes = require('./helpRequestRoutes');

const router = Router();

router.use(healthCheckRouter);
router.use('/users', userRoutes);
router.use('/needs', needRoutes);
router.use('/volunteers', volunteerRoutes);
router.use('/missing-persons', missingPersonRoutes);
router.use('/help-requests', helpRequestRoutes);

module.exports = router;
