import { sequelize } from "../database/conecta.js";
import { Usuario } from "../models/Usuario.js";

export const UsuarioIndex = async (req, res) => {
  try {
    const usuario = await Usuario.findAll();
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const usuarioCreate = async (req, res) => {
  const { nome, email, senha, telefone } = req.body;

  if (!nome || !email || !senha || !telefone) {
     res.status(401).send({ message: "Preencha todos os campos" });
  }

  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    
    if (usuarioExistente) {
    res.status(401).json({ msg: "esta conta ja está cadastrada" });
    } else {
      const usuario = await Usuario.create(
        {
          nome,
          email,
          senha,
          telefone,
        },
      );
      res.status(200).json(usuario);
    }
  } catch (error) {
    res.status(403).json(error);
  }
};
