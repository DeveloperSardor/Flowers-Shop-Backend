import { Request, Response, NextFunction } from "express";

export const tokenCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { token } = req.headers;
    if (!token) {
      throw new Error(`You are not sent token from headers!`);
    }else{
        next()
    }
  } catch (error: any) {
    res.send({
      status: 400,
      success: false,
      message: `Token Middleware Error: ${error.message}`,
    });
  }
};


