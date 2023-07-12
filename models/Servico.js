import { sequelize } from "../database/conecta.js";
import { DataTypes } from "sequelize";
import { Tecnico } from "./Tecnico.js";

export const Servico = sequelize.define('Servico', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    servico: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate:{
          isIn:[["Jardineiro","Pedreiro","Tec. Refrigeração"]],
        }
      }
});

Servico.belongsTo(Tecnico,{
    foreignKey:{
        name:'tecnico_id',
        allowNull:false
    },
    onDelete: 'RESTRICT',
    onUpdate:'CASCADE'
})
Tecnico.hasMany(Servico,{
    foreignKey:'tecnico_id'
})