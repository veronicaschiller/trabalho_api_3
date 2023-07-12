import { sequelize } from "../database/conecta.js"
import { Servico } from "../models/Servico.js"
import { Tecnico } from "../models/Tecnico.js"

export const ServicoIndex = async (req, res) =>{
    try {
        const servico = await Servico.findAll()
        res.status(200).json(servico)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const createServiceTecnico = async (req, res) => {
    const { servico } = req.body
    const id = req.login_user_id
    if (!servico) {
      return res.status(400).json({ msg: "Selecione um dos campos de serviço válido" });
    }
  
    const t = await sequelize.transaction();
    try {
      const verificaTecnico = await Tecnico.findOne({
        where: { id },
      }, { transaction: t });
  
      if (!verificaTecnico || verificaTecnico.atividade != servico) {
        await t.rollback();
        res.status(401).json({
          msg: "Técnico não cadastrado ou serviço não corresponde à sua atividade",
        });
        return;
      } else {
        const servicoCreate = await Servico.create(
          {
            servico,
            tecnico_id: id,
          },
          { transaction: t }
        );
        await t.commit();
        res.status(200).json(servicoCreate);
      }
    } catch (error) {
      await t.rollback();
      console.log(error);
      res.status(400).json(error); 
    }
  };