const { Router } = require("express");
const healthCheckRouter = require("./healthCheck");

const router = Router();

// Agrupamento de rotas
router.use(healthCheckRouter);

// Futuras rotas podem ser adicionadas aqui
// router.use('/volunteers', volunteersRouter);
// router.use('/helpers', helpersRouter);

module.exports = router;