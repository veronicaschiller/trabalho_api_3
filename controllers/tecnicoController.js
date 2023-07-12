import { Tecnico } from "../models/Tecnico.js";
import { sequelize } from "../database/conecta.js";
import { Log } from "../models/logs.js";

// msg de erros
let contaExistente = "esta conta ja foi cadastrada";
let dadosIncompletos =
  "Porfavor para completar seu cadatro complete os dados de forma correta";
let AtividadeNcadastrada="a atividade selcionada n esta cadastrada no nosso banco"



export const tecnicoIndex = async (req, res) => {
  try {
    const tecnico = await Tecnico.findAll();
    return res.status(200).json(tecnico);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export const tecnicoCreate = async (req, res) => {
  const { nome, email, senha, telefone, atividade } = req.body;
  if (!nome || !email || !senha || !telefone || !atividade) {
    return res.status(400).json({ msg: dadosIncompletos });
  }
  try {
    const tec = await Tecnico.findOne({ where: { email } });
    if (!tec) {
        const novoTec = await Tecnico.create(
          {
            nome,
            email,
            senha,
            telefone,
            atividade,
          },
        );
        return res.status(200).json(novoTec);
    } else {
 
      res.status(401).json({ msg: contaExistente });
      return
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};
