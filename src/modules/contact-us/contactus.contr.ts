import { JwtPayload } from "../../interface/interface.js";
import { JWT } from "../../utils/jwt.js";
import contactusSchema from "./contactus.schema.js";
import { Request, Response } from "express";

export class ContactUsContr {
  constructor() {}
  static async GetMessages(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (id) {
        const Messages = await contactusSchema.findById(id).populate("whom");
        res.send({
          status: 200,
          message: "All Messages From Customers",
          success: true,
          data: Messages,
        });
      } else {
        const Messages = await contactusSchema.find().populate("whom");
        res.send({
          status: 200,
          message: "All Messages From Customers",
          success: true,
          data: Messages,
        });
      }
    } catch (error: any) {
      res.send({
        status: 400,
        message: `Error : ${error.message}`,
        success: false,
      });
    }
  }

  static async AddMessage(req: Request, res: Response) {
    try {
      const { token } = req.headers;
      const { user_id } = JWT.Verify(token) as JwtPayload;
      let { email, text } = req.body;
      const newMessage = await contactusSchema.create({
        whom: user_id,
        email,
        text,
      });
      res.send({
        status: 200,
        message: "Added Message successfuly",
        success: true,
        data: newMessage,
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
