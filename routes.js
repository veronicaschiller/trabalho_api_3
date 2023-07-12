import { Router } from "express";
import {
  UsuarioIndex,
  usuarioCreate,
} from "./controllers/usuarioController.js";
import {
  tecnicoCreate,
  tecnicoIndex,
} from "./controllers/tecnicoController.js";
import senhaValidate from "./middleware/verificaSenha.js";
import { loginValidate } from "./middleware/verificaLogin.js";
import { loginTecnico, loginUsuario } from "./controllers/loginController.js";
import { logIndex } from "./controllers/logController.js";
import { ServicoIndex, createServiceTecnico } from "./controllers/servicoController.js";
const routes = Router();
// usuarios
routes.get("/user", UsuarioIndex)
.post("/user", senhaValidate, usuarioCreate)
.get("/loginCli",loginUsuario)

// tecnico
routes.get("/tec", tecnicoIndex)
.post("/tecreate", senhaValidate, tecnicoCreate)
.get("/loginTec",loginTecnico)

// logs
routes.get("/logs", logIndex)

// serviço
routes.get("/servicos", ServicoIndex)
.post("/servicos/cadastro", loginValidate, createServiceTecnico)

export default routes;
