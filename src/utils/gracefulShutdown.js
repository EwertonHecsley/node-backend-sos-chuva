const pool = require("../config/databaseConnect");
const { Logger } = require("../config/validateEnvironment");

const gracefulShutdown = (server) => {
  let isShuttingDown = false;

  return (signal) => {
    if (isShuttingDown) return;
    isShuttingDown = true;

    Logger.warn(`Sinal ${signal} recebido. Encerrando de forma segura...`);

    const forceQuitTimeout = setTimeout(() => {
      Logger.error("Shutdown forçado: Tempo limite excedido.");
      process.exit(1);
    }, 10000);

    server.close(async () => {
      Logger.info("Servidor HTTP encerrado.");

      try {
        await pool.end();
        Logger.info("Conexão com o banco de dados encerrada.");

        Logger.info("Recursos liberados com sucesso.");
        clearTimeout(forceQuitTimeout);
        process.exit(0);
      } catch (err) {
        Logger.error(`Erro ao fechar recursos: ${err.message}`);
        process.exit(1);
      }
    });
  };
};

module.exports = gracefulShutdown;
