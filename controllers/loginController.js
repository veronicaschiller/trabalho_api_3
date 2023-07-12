import * as dotenv from "dotenv";
import { Usuario } from "../models/Usuario.js";
import { Tecnico } from "../models/Tecnico.js";
import { Log } from "../models/logs.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
dotenv.config();

let loginInvalido = "Email ou senha inválido";
let erroDeSenha = "Tentativas de senha excedidas";
let tentativasAcesso = 1;

export const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;
  
  if (!email || !senha) {
    return res.status(400).json({ error: loginInvalido });
  }
  try {
    const user = await Usuario.findOne({ where: { email } });
    
    if (!user) {
      res.status(404).json({
        msg: "Sua conta está sendo acessada com credenciais inválidas",
      });
      await Log.create({
        descricao: "Tentativa de login com credenciais invalidas",
        usuario_id: user.id
      })
      return
    }
    if (user.bloq_seg) {
       res.status(402).json({
        msg: "Esta conta está bloqueada, por favor, redefina sua senha",
      });
      await Log.create({
        descricao: `Tentativa de Login na conta com senha invalida ${user.email}`,
        usuario_id: user.id,
      })
      return
    }
    if (bcrypt.compareSync(senha, user.senha)) {
      const token = jwt.sign(
        {
          login_user_id: user.id,
          login_user_name: user.nome,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" } 
      );
      return res.status(200).json({ msg: `Bem-vindo(a)! ${user.nome}`, token });
    } else {
      if (tentativasAcesso <= 3) { 
        await Log.create({
          descricao: `conta bloqueada exesso de tentativas ${user.email}`,
          usuario_id:user.id
        })
        tentativasAcesso++
        res.status(404).json({ msg: erroDeSenha })
        return
      } else {
        user.bloq_seg = true;
        user.save();
        await Log.create({
          descricao: `Conta ${user.email} bloqueada`,
          usuario_id:user.id
        },{ transaction: t })
        return res.status(404).json({
          msg:
            "Sua conta foi bloqueada por tentativa de acesso indevido, redefina a senha para sua segurança",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

export const loginTecnico = async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ error: loginInvalido });
    }
    try {
      const user = await Tecnico.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({
          msg: "Sua conta está sendo acessada com credenciais inválidas",
        });
      }
      if (user.bloq_seg) {
        return res.status(402).json({
          msg: "Esta conta está bloqueada, por favor, redefina sua senha",
        });
      }
      if (bcrypt.compareSync(senha, user.senha)) {
        const token = jwt.sign(
          {
            log_user_id: user.id,
            log_user_name: user.nome,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        return res.status(200).json({ msg: `Bem-vindo(a)! ${user.nome}`, token });
      } else {
        if (tentativasAcesso <= 3) {
          res.status(404).json({ msg: erroDeSenha });
          tentativasAcesso++;
          return
        } else {
          user.bloq_seg = true;
          user.save();
          return res.status(404).json({
            msg:
              "Sua conta foi bloqueada por tentativa de acesso indevido, redefina a senha para sua segurança",
          });
        }
      }
    } catch (error) {
      return res.status(400).send(error);
    }
};
