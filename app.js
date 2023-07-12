import express from "express";
import cors from "cors"
import router from "./routes.js"
import { sequelize } from "./database/conecta.js";
import { Usuario } from "./models/Usuario.js";
import { Tecnico } from "./models/Tecnico.js";
import { Log } from "./models/logs.js";
import { Servico } from "./models/Servico.js";


const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use(router)

async function conecta_db() {
    try {
        await sequelize.authenticate()
        console.log('Conexão com banco de dados realizada com sucesso');
        await Usuario.sync()
        await Tecnico.sync()
        await Servico.sync()
        await Log.sync()
    } catch (error) {
        console.error('Erro na conexão com o banco: ', error);
    }
}
conecta_db()

app.get('/',(req , res)=>{
    res.send('API artech')
})

app.listen(port, ()=>{
    console.log(`Servidor Rodando na Porta: ${port}`);
})