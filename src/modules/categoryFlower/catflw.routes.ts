import { Router } from "express";
import { tokenCheckMiddleware } from "../../middlewares/token.check.js";
import { CategoryContr } from "./catflw.contr.js";
import { adminCheckMiddleware } from "../../middlewares/admin.check.js";

const categoryFlowerRouter: Router = Router();

categoryFlowerRouter.get("/categories", CategoryContr.GetCategory);
categoryFlowerRouter.get("/categories/:id", CategoryContr.GetCategory);

categoryFlowerRouter.post(
  "/categories",
  adminCheckMiddleware,
  CategoryContr.AddCategory
);

categoryFlowerRouter.put(
  "/categories/:id",
  adminCheckMiddleware,
  CategoryContr.PutCategory
);

categoryFlowerRouter.delete(
  "/categories/:id",
  adminCheckMiddleware,
  CategoryContr.DeleteCategory
);

export default categoryFlowerRouter;
