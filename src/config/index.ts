import {Sequelize} from "sequelize"

export const db = new Sequelize("app","","",{
    storage:".marketingMetrics.sqlite",
    dialect:"sqlite",
    logging:false
})