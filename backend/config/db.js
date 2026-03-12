import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false, // disable SQL logs
    define: {
      timestamps: true,
      underscored: true,
    },
  },
);

export const connectDB = async () => {
  try {
    await db.authenticate();
    console.log("mysql connected successfully");
  } catch (error) {
    console.error("failed to connect to mysql:", error);
  }
};

export default db;
