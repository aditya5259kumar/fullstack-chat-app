import db from "../config/db.js";
import initModels from "./init-models.js";

const models = initModels(db);

export default models;