import { Router } from "express";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import userRouter from "../modules/users/user.routes.js";
import categoryFlowerRouter from "../modules/categoryFlower/catflw.routes.js";
import flowerRouter from "../modules/flowers/flower.routes.js";
import cwd from "node:process";
import jobsRouter from "../modules/jobs/job.routes.js";
import ordersFlowerRouter from "../modules/orders/order.routes.js";
import commentsRouter from "../modules/comments/comment.routes.js";
import contactUsRouter from "../modules/contact-us/contactus.routes.js";
import blogRouter from "../modules/blogs/blog.routes.js";

const deliverySum = JSON.parse(
  fs.readFileSync(
    path.join(process.cwd(), "src", "json", "delivery.json"),
    "utf-8"
  )
);
let shopDatas = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src', 'json', 'address.json'), 'utf-8'))
const indexRouter: Router = Router();

indexRouter.use(userRouter);
indexRouter.use(categoryFlowerRouter);
indexRouter.use(flowerRouter);
indexRouter.use(jobsRouter);
indexRouter.use(ordersFlowerRouter);
indexRouter.use(commentsRouter);
indexRouter.use(blogRouter)
indexRouter.use(contactUsRouter);
indexRouter.get("/delivery", (req: Request, res: Response) => {
  try {
    res.send({
      status: 200,
      message: `Delivery sum`,
      success: true,
      data: deliverySum,
    });
  } catch (error: any) {
    res.send({
      status: 400,
      message: `Error: ${error.message}`,
      success: false,
    });
  }
});

indexRouter.put("/delivery", (req: Request, res: Response) => {
  try {
    let { delivery } = req.body;
    console.log(delivery);

    if (!delivery) {
      throw new Error(`Not Found purpose`);
    }
    deliverySum.deliverySum = delivery;
    fs.writeFileSync(
      path.join(process.cwd(), "src", "json", "delivery.json"),
      JSON.stringify(deliverySum)
    );
  } catch (error: any) {
    res.send({
      message: `Error: ${error.message}`,
      status: 400,
      success: false,
    });
  }
});

indexRouter.get(`/ShopData`, (req : Request, res : Response)=>{
  try {
    res.send({
        status : 200,
        message : `Shop Datas`,
        success : true,
        data : shopDatas
    })
  } catch (error : any) {
    res.send({
        message : `Error: ${error.message}`,
        status : 400,   
        success : false
    })
  }
})

indexRouter.put('/ShopData', (req : Request, res : Response)=>{
    try {
        const {address, phone, email, instagram_link} = req.body;
        const NewShopData = {
            address : address ? address : shopDatas.address,
            phone : phone ? phone : shopDatas.phone,
            email : email ? email : shopDatas.email,
            instagram_link : instagram_link ? instagram_link : shopDatas.instagram_link
        }
        shopDatas = NewShopData
        fs.writeFileSync(path.join(process.cwd(), 'src', 'json', 'address.json'), shopDatas)
        res.send({
          status : 200,
          message: `Updated Successfuly`,
          success : true,
          data : shopDatas
        })
    } catch (error : any) {
        res.send({
            message : `Error: ${error.message}`,
            status : 400,
            success : false
        })
    }
})

export default indexRouter;
