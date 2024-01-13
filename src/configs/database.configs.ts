import { Sequelize } from 'sequelize';
import { logger } from "../middlewares/errors.middlewares";
import { MESSAGES } from "./constants.configs";

const config = {
  dialect: 'sqlite' as const,
  storage: "./database.sqlite",
  logging: false
};

export const sequelize = new Sequelize(process.env.PG_URL!,config);
export default async function() {
  try {
    await sequelize.authenticate();
    logger.info(MESSAGES.DATABASE.CONNECTED)
    // Sync models with database
    sequelize.sync({force: true});
    return sequelize;
  } catch (error) {
    logger.error(MESSAGES.DATABASE.ERROR, error)
  }
}