import { JwtPayload } from "../../interface/interface.js";
import { IUser } from "../../interface/interface.js";
import { JWT } from "../../utils/jwt.js";
import userSchema from "./user.schema.js";
import { Request, Response } from "express";
import sha256 from "sha256";
import flowerSchema from "../flowers/flower.schema.js";

export class UserContr {
  constructor() {}
  //   Post Methods
  static async RegisterUser(req: Request, res: Response) {
    try {
      let { username, email, website, phone, img_link } = req.body;
      console.log(req.body);

      if (!username || !phone) {
        throw new Error(`Data is incomplated`);
      }
      let findEmail = await userSchema.findOne({ email });
      if (findEmail != null) {
        throw new Error(`Email ❌`);
      }
      let findPhone = await userSchema.findOne({ phone });
      if (findPhone != null) {
        throw new Error(`Phone ❌`);
      }
      let newUser = await userSchema.create({
        username,
        email,
        img_link,
        role: "user",
        website,
        phone,
      });
      delete newUser.role;
      res.send({
        status: 201,
        token: JWT.Sign(newUser._id),
        message: "Successfuly registered",
        data: newUser,
        success: true,
      });
    } catch (error: any) {
      res.send({
        status: 401,
        message: `Error:  ${error.message}`,
        success: false,
      });
    }
  }

  static async Login(req: Request, res: Response) {
    try {
      let { phone } = req.body;
      if (!phone) {
        throw new Error(`Data is incomplated`);
      }
      let findUser = await userSchema
        .findOne({
          phone,
        })
        .select("-role");
      if (findUser == null) {
        throw new Error(`User Not Found!`);
      }
      res.send({
        status: 200,
        message: "Successfuly authorized",
        data: findUser,
        token: JWT.Sign(findUser._id),
        success: true,
      });
    } catch (error: any) {
      res.send({
        status: 401,
        message: `Error:  ${error.message}`,
        success: false,
      });
    }
  }

  static async AdminLogin(req: Request, res: Response) {
    try {
      let { email, password } = req.body;
      if (!email || !password) {
        throw new Error(`Malumot to'liq emas`);
      }
      let findUser = await userSchema
        .findOne({ email, password: sha256(password) })

      if (findUser == null || findUser?.role != "admin") {
        throw new Error(`Email yoki parol xato`);
      }
      delete findUser.role
      res.send({
        status: 200,
        message: "Muvofaqqiyatli kirdingiz",
        success: true,
        data: findUser,
        token: JWT.Sign(findUser._id),
      });
    } catch (error: any) {
      res.send({
        status: 401,
        message: ` ${error.message}`,
        success: false,
      });
    }
  }

  static async AddEmployer(req: Request, res: Response) {
    try {
      let { username, email, website, job, phone, img_link } =
        req.body;
      if (!username  || !email || !job || !phone) {
        throw new Error(`Malumot tugallanmadi!`);
      }
      let findEmail = await userSchema.findOne({ email });
      if (findEmail != null) {
        throw new Error(`Bu email raqam band`);
      }
      let findPhone = await userSchema.findOne({ phone });
      if (findPhone != null) {
        throw new Error(`Bu telefon raqam band`);
      }
      let newEmployer = await userSchema.create({
        username,
        email,
        website,
        img_link,
        job,
        phone,
        role: "employer",
      });
      delete newEmployer.role;
      res.send({
        status: 201,
        message: "Ishchi muvofaqqiyali qo'shildi",
        data: newEmployer,
        success: true,
      });
    } catch (error: any) {
      res.send({
        status: 401,
        message: `Error:  ${error.message}`,
        success: false,
      });
    }
  }

  //   Get Methods
  static async GetUsers(req: Request, res: Response) {
    try {
      let { id } = req.params;
      let search: any = req.query.search;
      let keyword: object = search
        ? {
            $or: [
              { username: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
            ],
          }
        : {};
      if (id) {
        let findById = await userSchema
          .findOne({ _id: id, role: "user" })
          .select("-role");
        if (findById == null) {
          throw new Error(`Not Found ${id} - user`);
        }
        res.send({
          status: 200,
          message: `${id} - user`,
          success: true,
          data: findById,
        });
      } else if (search) {
        res.send({
          status: 200,
          message: "Search Result",
          success: true,
          data: await userSchema
            .find(keyword)
            .where("role")
            .equals("user")
            .select("-role"),
        });
      } else {
        res.send({
          status: 200,
          message: "All users",
          success: true,
          data: await userSchema.find({ role: "user" }).select("-role"),
        });
      }
    } catch (error: any) {
      res.send({
        status: 401,
        message: `Error:  ${error.message}`,
        success: false,
      });
    }
  }

  static async GetMyProfile(req: Request, res: Response) {
    try {
      let token: string | any = req.headers.token;
      console.log(JWT.Verify(token) as JwtPayload);
      let { user_id } = JWT.Verify(token) as JwtPayload;
      let findProfile = await userSchema.findById(user_id).select("-role");
      if (findProfile == null) {
        throw new Error(`Not Found`);
      }
      res.send({
        status: 200,
        message: "Profile",
        data: findProfile,
        success: true,
      });
    } catch (error: any) {
      res.send({
        status: 401,
        message: `Error:  ${error.message}`,
        success: false,
      });
    }
  }

  static async GetAdmin(req: Request, res: Response) {
    try {
      let data = await userSchema.findOne({ role: "admin" }).select("-role");
      if (data == null) {
        throw new Error(`Admin topilmadi`);
      }
      res.send({
        status: 200,
        message: `Admin malumotlari`,
        success: true,     
        data,
        token : JWT.Sign(data._id)
      });
    } catch (error: any) {
      res.send({
        status: 401,
        message: `Error:  ${error.message}`,
        success: false,
      });
    }
  }

  static async GetEmployer(req: Request, res: Response) {
    try {
      let { id } = req.params;
      let search: any = req.query.search;
      let keyword: object = search
        ? {
            $or: [
              { username: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
            ],
          }
        : {};
      if (id) {
        let findById = await userSchema
          .findOne({ _id: id, role: "employer" })
          .populate("job")
          .select("-role");
        if (!findById) {
          throw new Error(`Not Found ${id} - employer`);
        }
        res.send({
          status: 200,
          message: `${id} - employer`,
          success: true,
          data: findById,
        });
      } else if (search) {
        res.send({
          status: 200,
          message: "Search Results",
          success: true,
          data: await userSchema
            .find(keyword)
            .populate("job")
            .where("role")
            .sort({createdAt : -1})
            .select("-role")
            .equals("employer"),
        });
      } else {
        res.send({
          status: 200,
          message: "All Employer",
          success: true,
          data: await userSchema
            .find({ role: "employer" })
            .populate("job")
            .select("-role")
            .sort({createdAt : -1})
        });
      }
    } catch (error: any) {
      res.send({
        status: 401,
        message: `Error:  ${error.message}`,
        success: false,
      });
    }
  }

  static async ForgetPassword(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new Error(`Malumot to'liq emas`);
      }
      let checkCorrect = await userSchema.findOne({ email });
      if (checkCorrect?.role != "admin") {
        throw new Error(`Email xato`);
      }
      if (checkCorrect == null) {
        throw new Error(`Email xato`);
      }
      let updated = await userSchema.findByIdAndUpdate(
        checkCorrect._id,
        { password: sha256(password) },
        { new: true }
      );
      delete updated?.role;
      res.send({
        status: 200,
        message: `Muvofaqqiyali o'zgartirildi`,
        success: true,
        data: updated,
        token: JWT.Sign(updated?._id),
      });
    } catch (error: any) {
      res.send({
        status: 401,
        message: `${error.message}`,
        success: false,
      });
    }
  }

  // Put Methods
  static async UpdateMyProfile(req: Request, res: Response) {
    try {
      let { token } = req.headers;
      let { user_id } = JWT.Verify(token) as JwtPayload;
      let { username, img_link, email, website, phone } = req.body;
      // console.log(req.body);

      if (!username && !img_link && !email && !website && !phone) {
        throw new Error(`Not Found purpose`);
      }
      let updatedProfile = await userSchema.findByIdAndUpdate(
        user_id,
        { username, email, website, phone, img_link },
        { new: true }
      );
      delete updatedProfile?.role;
      res.send({
        status: 200,
        message: "Successfuly updated",
        success: true,
        data: updatedProfile,
        token: JWT.Sign(updatedProfile?._id),
      });
    } catch (error: any) {
      res.send({
        status: 401,
        message: `Error:  ${error.message}`,
        success: false,
      });
    }
  }

  static async UpdateEmployer(req: Request, res: Response) {
    try {
      let { id } = req.params;
      let { username, password, role, email, website, job, phone } = req.body;
      let checkExists = await userSchema.findById(id);
      console.log(job);
      
      if (checkExists == null) {
        throw new Error(`Not Found ${id} - user`);
      }
      if (
        !username &&
        !password &&
        !role &&
        !email &&
        !website &&
        !job &&
        !phone
      ) {
        throw new Error(`Not Found purpose`);
      }
      let updatedEmployer = await userSchema.findByIdAndUpdate(
        id,
        { username, password, role, email, website, job, phone },
        { new: true }
      );
      delete updatedEmployer?.role;
      res.send({
        status: 200,
        message: `${updatedEmployer?.username} - updated successfuly!`,
        success: true,
        data: updatedEmployer,
      });
    } catch (error: any) {
      res.send({
        status: 401,
        message: `Error:  ${error.message}`,
        success: false,
      });
    }
  }

  //   Delete Method
  static async DeleteEmployer(req: Request, res: Response) {
    try {
      let { id } = req.params;
      let findEmployerById = await userSchema.findById(id);
      if (findEmployerById?.role != "employer") {
        throw new Error(`This user is not employer`);
      }
      let deletedUser = await userSchema.findByIdAndDelete(id);
      delete deletedUser?.role;
      res.send({
        status: 200,
        message: "Deleted successfuly",
        success: true,
        data: deletedUser,
      });
    } catch (error: any) {
      res.send({
        status: 401,
        message: `Error:  ${error.message}`,
        success: false,
      });
    }
  }
}
