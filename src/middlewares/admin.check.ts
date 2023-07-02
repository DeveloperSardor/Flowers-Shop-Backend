import { Request, Response, NextFunction } from "express";
import { JWT } from "../utils/jwt.js";
import { JwtPayload } from "jsonwebtoken";
import userSchema from "../modules/users/user.schema.js";

export const adminCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { token } = req.headers;
    if(!token){
      throw new Error(`You are not sent token from headers`)
    }
    let { user_id } = JWT.Verify(token) as JwtPayload;
    
    let checkAdmin = await userSchema.findById(user_id);   
    if (checkAdmin?.role != "admin") {
      throw new Error(`You are not admin!`);
    } else {
      next();
    }
  } catch (error: any) {
    res.send({
      status: 400,
      success: false,
      message: `Admin Middleware Error: ${error.message}`,
    });
  }
};
  