import blogSchema from "./blog.schema.js";
import { Request, Response } from "express";

export class BlogContr {
  constructor() {}

  static async GetBlog(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (id) {
        const checkExists = await blogSchema.findById(id);
        if (checkExists == null) {
          throw new Error(`Not Found ${id} - blog`);
        } else {
          res.send({
            status: 200,
            message: `Blog By Id`,
            success: true,
            data: checkExists,
          });
        }
      } else {
        res.send({
          status: 200,
          message: `All Blogs`,
          success: true,
          data: await blogSchema.find(),
        });
      }
    } catch (error: any) {
      res.send({
        status: 400,
        message: `Error: ${error.message}`,
        success: false,
      });
    }
  }

  static async AddBlog(req: Request, res: Response) {
    try {
      const { title, desc, file_link } = req.body;
      console.log(req.body);
      
      if (!title || !desc || !file_link) {
        throw new Error(`Data is incomapleted`);
      }
      const newBlog = await blogSchema.create({ title, desc, file_link });
      res.send({
        status: 200,
        message: `Ok, Added Blog`,  
        success: true,
        data: newBlog,
      });
    } catch (error: any) {
      res.send({
        status: 400,
        message: `Error: ${error.message}`,
        success: false,
      });
    }
  }

  static async updateBlog(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, desc, file_link } = req.body;
      if (!title && !desc && !file_link) {
        throw new Error(`You have not sent anything data from body`);
      }
      const checkExists = await blogSchema.findById(id);
      if (checkExists == null) {
        throw new Error(`Not Found ${id} - blog`);
      }
      const updatedBlog = await blogSchema.findByIdAndUpdate(
        id,
        { title, desc, file_link },
        { new: true }
      );
      res.send({
        status: 200,
        message: `Ok, Blog has been updated`,
        success: true,
        data: updatedBlog,
      });
    } catch (error: any) {
      res.send({
        status: 400,
        message: `Error: ${error.message}`,
        success: false,
      });
    }
  }

  static async deleteBlog(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const checkExists = await blogSchema.findById(id);
      if (checkExists == null) {
        throw new Error(`Not Found ${id} - blog`);
      }
      const deletedBlog = await blogSchema.findByIdAndDelete(id);
      res.send({
        status: 200,
        message: `Ok, blog has been deleted`,
        success: true,
        data: deletedBlog,
      });
    } catch (error: any) {
      res.send({
        status: 400,
        message: `Error: ${error.message}`,
        success: false,
      });
    }
  }
}


