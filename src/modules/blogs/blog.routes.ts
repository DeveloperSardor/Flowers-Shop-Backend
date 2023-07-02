import { Router } from "express";
import { BlogContr } from "./blog.contr.js";
import { adminCheckMiddleware } from "../../middlewares/admin.check.js";

const blogRouter: Router = Router();

blogRouter.get(`/blogs`, BlogContr.GetBlog);
blogRouter.get(`/blogs/:id`, BlogContr.GetBlog);
blogRouter.post(`/blogs`, adminCheckMiddleware, BlogContr.AddBlog);
blogRouter.put(`/blogs/:id`, adminCheckMiddleware, BlogContr.updateBlog);
blogRouter.delete(`/blogs/:id`, adminCheckMiddleware, BlogContr.deleteBlog);

export default blogRouter;
