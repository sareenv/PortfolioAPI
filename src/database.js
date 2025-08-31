import { Sequelize } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });

const sequelize = new Sequelize(
    process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
});

export default sequelize;