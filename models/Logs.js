import { DataTypes } from "sequelize";
import { sequelize } from "../database/conecta.js";
import { Usuario } from "./Usuario.js";
import { Tecnico } from "./Tecnico.js";

export const Log = sequelize.define('log', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false
    },
    descricao: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

Log.belongsTo(Usuario, {
    foreignKey: {
        name: "usuario_id",
        allowNull: true
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
})

Usuario.hasMany(Log, {
    foreignKey: "usuario_id"
})

Log.belongsTo(Tecnico, {
    foreignKey: {
        name: "tecnico_id",
        allowNull: true
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
})

Tecnico.hasMany(Log, {
    foreignKey: "tecnico_id"
})