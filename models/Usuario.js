import { DataTypes } from "sequelize";
import { sequelize } from "../database/conecta.js";
import bcrypt from "bcrypt"

export const Usuario = sequelize.define("usuario",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    nome:{
        type:DataTypes.STRING(60),
        allowNull:false
    },
    email:{
        type:DataTypes.STRING(128),
        allowNull:false,
        unique:true
    },
    senha:{
        type:DataTypes.STRING(100),
        allowNull: false,

    },
    telefone:{ 
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
            len:{
                args: [12],
                msg: 'Telefone inválido!'
            }
          }
    },
    bloq_seg:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: false
    }
},{
    timestamps:false
})

Usuario.beforeCreate(async(usuario)=>{
const salt = await bcrypt.genSalt(8)
const hash = await bcrypt.hash(usuario.senha, salt)
usuario.senha = hash
})
