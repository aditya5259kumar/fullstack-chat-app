import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const useSSL = process.env.DB_SSL === "true";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,

    define: {
      timestamps: true,
      underscored: true,
    },

    dialectOptions: useSSL
      ? {
          ssl: {
            ca: fs.readFileSync(
              path.join(__dirname, "../certs/ca.pem"),
              "utf8"
            ),
          },
        }
      : {},
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected successfully");
  } catch (error) {
    console.error("Failed to connect to MySQL:", error);
  }
};

export default sequelize;