import { Router } from "express";
import { tokenCheckMiddleware } from "../../middlewares/token.check.js";
import { OrderContr } from "./order.contr.js";
import { adminCheckMiddleware } from "../../middlewares/admin.check.js";


const ordersFlowerRouter  : Router= Router()

ordersFlowerRouter.get('/orders', tokenCheckMiddleware, OrderContr.GetMyOrders)
ordersFlowerRouter.get('/orders/:id', tokenCheckMiddleware, OrderContr.GetMyOrders)
ordersFlowerRouter.get('/usersorders', adminCheckMiddleware, OrderContr.GetUserOrderForAdmin)
ordersFlowerRouter.post('/orders', tokenCheckMiddleware, OrderContr.AddOrder)



export default ordersFlowerRouter; 