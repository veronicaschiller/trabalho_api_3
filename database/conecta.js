import { Sequelize } from "sequelize"

export const sequelize = new Sequelize("arTech", "root", "" ,{
 host: 'localhost',
  dialect:'mysql',
  port:3306
})