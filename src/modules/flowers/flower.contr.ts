import { JWT } from "../../utils/jwt.js";
import flowerSchema from "./flower.schema.js";
import { Request, Response } from "express";
import { JwtPayload } from "../../interface/interface.js";
import catflwSchema from "../categoryFlower/catflw.schema.js";

export class FlowersContr {
  constructor() {}
  static async GetFlowers(req: Request, res: Response) {
    try {
      let { id } = req.params;
      let { sort, type_f } = req.query;
      const category = req.query.category as string;
      let search: any = req.query.search;
      let keyword: object = search
        ? {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { desc: { $regex: search, $options: "i" } },
            ],
          }
        : {};
      if (id) {
        let findById = await flowerSchema.findById(id).populate("category");
        if (findById == null) {
          throw new Error(`Not Found  flower`);
        }
        res.send({
          status: 200,
          message: `${id} - flower`,
          success: true,
          data: findById,
        });
      } else if (type_f) {
        const datas = await flowerSchema.find({ type_f }).populate("category");
        res.send({
          status: 200,
          message: `Results`,
          success: true,
          data: datas,
        });
      } else if (sort) {
        if (sort == "desc") {
          res.send({
            status: 200,
            message: "Desc Price Sort",
            success: true,
            data: await flowerSchema.find({ price: -1 }),
          });
        } else if (sort == "asc") {
          res.send({
            status: 200,
            message: "Asc Price Sort",
            success: true,
            data: await flowerSchema.find({ price: 1 }),
          });
        }
      } else if (search) {
        res.send({
          status: 200,
          message: "Search Results",
          success: true,
          data: await flowerSchema.find(keyword).sort({ createdAt: -1 }),
        });
      } else if (category) {
        if (category.toLocaleLowerCase().trim() == "all") {
          res.send({
            status: 200,
            message: `${category} - flowers`,
            success: true,
            data: await flowerSchema
              .find()
              .populate("category")
              .sort({ createdAt: -1 }),
          });
        } else {
          const categoriesData = await catflwSchema.findOne({ category });
          if (categoriesData == null) {
            throw new Error(`Not Found Categories`);
          }
          let responseData = await flowerSchema
            .find({ category: categoriesData._id })

            .populate("category");
          res.send({
            status: 200,
            message: `${category} - flowers`,
            success: true,
            data: responseData,
          });
        }
      } else {
        res.send({
          status: 200,
          message: "All Flowers",
          success: true,
          data: await flowerSchema.find().sort({ createdAt: -1 }),
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

  static async GetBestSeller(req: Request, res: Response) {
    try {
      const data = await flowerSchema
        .find()
        .sort({ solded: -1 })
        .populate("category")
        .limit(10);
      res.send({
        status: 200,
        message: `Best Seller`,
        success: true,
        data,
      });
    } catch (error: any) {
      res.send({
        status: 400,
        success: false,
        message: `Error : ${error.message}`,
      });
    }
  }

  static async AddFlower(req: Request, res: Response) {
    try {
      let { name, img_link, price, category, desc, type_f } = req.body;
      if (!name || !img_link || !price || !category || !type_f) {
        throw new Error(`Data is incomplated`);
      }
      let newFlower = await flowerSchema.create({
        name,
        img_link,
        price,
        category,
        desc,
        type_f,
      });
      res.send({
        status: 200,
        message: "Ok, Flower has been added!",
        success: true,
        data: newFlower,
      });
    } catch (error: any) {
      res.send({
        status: 400,
        message: `Error: ${error.message}`,
        success: false,
      });
    }
  }

  static async PutFlower(req: Request, res: Response) {
    try {
      let { id } = req.params;
      let { name, img_link, price, category, desc, solded, type_f } = req.body;
      if (
        !name &&
        !img_link &&
        !price &&
        !category &&
        !desc &&
        !solded &&
        !type_f
      ) {
        throw new Error(`Not Found purpose`);
      }
      let checkExists = await flowerSchema.findById(id);
      if (checkExists == null) {
        throw new Error(`Not Found flower`);
      }
      let updatedFlower = await flowerSchema.findByIdAndUpdate(
        id,
        { name, img_link, price, category, desc, solded, type_f },
        { new: true }
      );
      res.send({
        status: 200,
        message: "Successfuly updated",
        success: true,
        data: updatedFlower,
      });
    } catch (error: any) {
      res.send({
        status: 400,
        message: `Error: ${error.message}`,
        success: false,
      });
    }
  }

  static async DeleteFlower(req: Request, res: Response) {
    try {
      let { id } = req.params;
      let checkExists = await flowerSchema.findById(id);
      if (checkExists == null) {
        throw new Error(`Not Found ${id} - flower`);
      }
      let deletedFlower = await flowerSchema.findByIdAndDelete(id);
      res.send({
        status: 200,
        message: `Successfuly deleted ${id} - flower`,
        success: true,
        data: deletedFlower,
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



      