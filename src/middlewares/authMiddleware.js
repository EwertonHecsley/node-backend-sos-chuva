const Security = require('../utils/security');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];
  const decoded = Security.verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }

  req.user = decoded; // Salva os dados do usuário no request
  next();
};

module.exports = authMiddleware;
