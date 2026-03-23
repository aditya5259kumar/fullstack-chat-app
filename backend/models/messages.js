import Sequelize from "sequelize";

export default function (sequelize, DataTypes) {
  return sequelize.define(
    "messages",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      conversation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "conversations",
          key: "id",
        },
      },
      sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "messages",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "conversation_id",
          using: "BTREE",
          fields: [{ name: "conversation_id" }],
        },
        {
          name: "sender_id",
          using: "BTREE",
          fields: [{ name: "sender_id" }],
        },
      ],
    },
  );
}
