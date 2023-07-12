import { DataTypes } from "sequelize";
import { sequelize } from "../database/conecta.js";
import bcrypt from "bcrypt"

export const Tecnico = sequelize.define(
  "tecnico",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate:{
        isEmail:{
          args: true,
          msg:"email invalido"
        }
      }
    },
    senha: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [10],
          msg: "A senha deve ter no mínimo 7 caracteres",
        },
      },
    },
    telefone: {
      type: DataTypes.STRING(12),
      allowNull: false,
      validate: {
        len: {
          args: [12],
          msg: "Telefone inválido!",
        },
      },
    },
    atividade: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate:{
        isIn:[["Jardineiro","Pedreiro","Tec. Refrigeração"]],
      }
    },
    bloq_seg:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: false
  }
  },
  { timestamps: false }
);

Tecnico.beforeCreate(async (tecnico) => {
  const salt = await bcrypt.genSalt(8);
  const hash = await bcrypt.hash(tecnico.senha, salt);
  tecnico.senha = hash;
});

