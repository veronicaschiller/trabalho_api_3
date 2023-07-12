
export default function senhaValidate(req, res, next){
  const { senha } = req.body

if(senha.length <7){
  return res.status(422).json({error: 'Senha muito curta'})
}
  if (!/[a-z]/.test(senha)){
    return res.status(401).json({msg:"a senha deve conter peolo meno uma letra minuscula"})
  }
  if(!/[A-Z]/.test(senha)){
    return res.status(401).json({msg:'a senha deve conter pelo menos uma letra maiuscula'})
  }
  if(!/[0-9]/.test(senha)){
    return res.status(401).json({msg:'a senha deve conter pelo menos um numero'})
  }
  if(!/[!@#$%^&*]/.test(senha)){
    return res.status(401).json({msg:'a senha deve conter pelo menos um simbolo'})
  }
  next() 
}