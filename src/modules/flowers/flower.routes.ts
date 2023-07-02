import { Router } from "express";
import { tokenCheckMiddleware } from "../../middlewares/token.check.js";
import { adminCheckMiddleware } from "../../middlewares/admin.check.js";
import { FlowersContr } from "./flower.contr.js";

const flowerRouter: Router = Router();

flowerRouter.get("/flowers", FlowersContr.GetFlowers);
flowerRouter.get("/flowers/:id", FlowersContr.GetFlowers);
flowerRouter.get(`/seller`, FlowersContr.GetBestSeller);
flowerRouter.post("/flowers", adminCheckMiddleware, FlowersContr.AddFlower);

flowerRouter.put("/flowers/:id", adminCheckMiddleware, FlowersContr.PutFlower);

flowerRouter.delete(
  "/flowers/:id",
  adminCheckMiddleware,
  FlowersContr.DeleteFlower
);

export default flowerRouter;
