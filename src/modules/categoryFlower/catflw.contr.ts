import flowerSchema from "../flowers/flower.schema.js";
import catflwSchema from "./catflw.schema.js";
import { Request, Response } from "express";

export class CategoryContr {
  constructor() {}
  static async GetCategory(req: Request, res: Response) {
    let { id } = req.params;
    if (id) {
      let checkExists = await catflwSchema.findById(id);
      if (checkExists == null) {
        throw new Error(`Not Found ${id} - category`);
      }
      res.send({
        status: 200,
        message: `${id} - category flowers`,
        success: true,
        data: checkExists,
      });
    } else {
      res.send({
        status: 200,
        message: "All Categories",
        success: true,
        data: await catflwSchema.find(),
      });
    }
  }

  static async AddCategory(req: Request, res: Response) {
    try {
      let { category } = req.body;
      if (!category) {
        throw new Error(`You are not sent nothing data from request body`);
      }
      let newCategory = await catflwSchema.create({ category });
      res.send({
        status: 200,
        message: "Successfuly added category",
        success: true,
        data: newCategory,
      });
    } catch (error: any) {
      res.send({
        status: 200,
        message: "All Categories",
        success: true,
        data: await catflwSchema.find(),
      });
    }
  }

  static async PutCategory(req: Request, res: Response) {
    try {
      let { id } = req.params;
      let { category } = req.body;
      if (!category) {
        throw new Error(`You are not sent nothing data from request body`);
      }
      let checkExists = await catflwSchema.findById(id);
      if (checkExists == null) {
        throw new Error(`Not Found ${id} - category`);
      }
      let updatedCategory = await catflwSchema.findByIdAndUpdate(
        id,
        { category },
        { new: true }
      );
      res.send({
        status: 200,
        message: `Successfuly updated ${id} - category`,
        success: true,
        data: updatedCategory,
      });
    } catch (error: any) {
      res.send({
        status: 400,
        message: `Error : ${error.message}`,
        success: false,
      });
    }
  }

  static async DeleteCategory(req: Request, res: Response) {
    try {
      let { id } = req.params;
      let checkExists = await catflwSchema.findById(id);
      if (checkExists == null) {
        throw new Error(`Not Found ${id} - category`);
      }
      let deletedCatagory = await catflwSchema.findByIdAndDelete(id);
      res.send({
        status: 200,
        message: `Successfuly deleted category`,
        success: true,
        data: deletedCatagory,
      });
    } catch (error: any) {
      res.send({
        status: 400,
        message: `Error : ${error.message}`,
        success: false,
      });
    }
  }
}
