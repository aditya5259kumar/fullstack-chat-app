// var DataTypes = require("sequelize").DataTypes;
// var _users = require("./users");

// function initModels(sequelize) {
//   var users = _users(sequelize, DataTypes);

//   return {
//     users,
//   };
// }
// module.exports = initModels;
// module.exports.initModels = initModels;
// module.exports.default = initModels;

import { DataTypes } from "sequelize";
import _users from "./users.js";

function initModels(sequelize) {
  const users = _users(sequelize, DataTypes);

  return {
    users,
  };
}

export default initModels;
export { initModels };
