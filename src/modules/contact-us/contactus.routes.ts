import { Router } from "express";
import { adminCheckMiddleware } from "../../middlewares/admin.check.js";
import { ContactUsContr } from "./contactus.contr.js";
import { tokenCheckMiddleware } from "../../middlewares/token.check.js";

const contactUsRouter: Router = Router();

contactUsRouter.get(
  "/messages",
  adminCheckMiddleware,
  ContactUsContr.GetMessages
);
contactUsRouter.get(
  "/messages/:id",
  adminCheckMiddleware,
  ContactUsContr.GetMessages
);
contactUsRouter.post(
  "/messages",
  tokenCheckMiddleware,
  ContactUsContr.AddMessage
);

export default contactUsRouter;
