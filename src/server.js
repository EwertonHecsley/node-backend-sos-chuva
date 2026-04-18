const app = require('./index');
const { Logger, validateEnvironment } = require('./config/validateEnvironment');
const gracefulShutdown = require('./utils/gracefulShutdown');

const env = validateEnvironment();

const startServer = async () => {
    try {
        Logger.info(`Iniciando servidor em modo ${env.NODE_ENV}`);

        const server = app.listen(env.PORT, () => {
            Logger.info(`Servidor rodando na porta ${env.PORT}`);
        });

        const shutdownHandler = gracefulShutdown(server);
        process.on('SIGINT', ()=> shutdownHandler('SIGINT'));
        process.on('SIGTERM', ()=> shutdownHandler('SIGTERM'));

        
    } catch (error) {
        Logger.error('Falha critica: Impossível iniciar o servidor', error);
        process.exit(1);
    }
};

module.exports = {
    startServer
};