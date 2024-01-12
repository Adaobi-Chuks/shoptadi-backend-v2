import  "express-async-errors";
import app from "./app";
import { logger } from "./middlewares/errors.middlewares";
import {PORT} from "./configs/constants.configs"
import connectToPostgres from "./configs/database.configs"

(async () => {
  logger.info(`Attempting to run server on port ${PORT}`);
  await connectToPostgres();
  app.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}`);
  });
})();