import Sequelize from "sequelize";
const DataTypes = Sequelize.DataTypes;

import _conversations from "./conversations.js";
import _messages from "./messages.js";
import _participants from "./participants.js";
import _users from "./users.js";

function initModels(sequelize) {
  const conversations = _conversations(sequelize, DataTypes);
  const messages = _messages(sequelize, DataTypes);
  const participants = _participants(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  messages.belongsTo(conversations, { as: "conversation", foreignKey: "conversation_id" });
  conversations.hasMany(messages, { as: "messages", foreignKey: "conversation_id" });

  participants.belongsTo(conversations, { as: "conversation", foreignKey: "conversation_id" });
  conversations.hasMany(participants, { as: "participants", foreignKey: "conversation_id" });

  messages.belongsTo(users, { as: "sender", foreignKey: "sender_id" });
  users.hasMany(messages, { as: "messages", foreignKey: "sender_id" });

  participants.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(participants, { as: "participants", foreignKey: "user_id" });

  return {
    conversations,
    messages,
    participants,
    users,
  };
}

export default initModels;
export { initModels };
