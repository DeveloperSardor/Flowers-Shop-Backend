import { Router } from "express";
import { tokenCheckMiddleware } from "../../middlewares/token.check.js";
import { CommentContr } from "./comment.contr.js";
import { adminCheckMiddleware } from "../../middlewares/admin.check.js";

const commentsRouter: Router = Router();

commentsRouter.get("/comments/:flower_id", CommentContr.GetComment);
commentsRouter.get(
  "/comments", CommentContr.GetComment
);

commentsRouter.post("/comments", tokenCheckMiddleware, CommentContr.AddComment);

commentsRouter.put(
  "/comments/:id",
  tokenCheckMiddleware,
  CommentContr.PutComment
);

commentsRouter.delete(
  "/comments/:id",
  tokenCheckMiddleware,
  CommentContr.DeleteComment
);

export default commentsRouter;
