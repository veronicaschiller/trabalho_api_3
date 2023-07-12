import  jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

export  const loginValidate = (req, res , next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_KEY)
        req.login_user_id = decode.log_user_id
        req.login_user_nome = decode.log_user_nome
        next()
    } catch (error) {
        return res.status(401).send({error:"falha na authenticação"})
    }
}