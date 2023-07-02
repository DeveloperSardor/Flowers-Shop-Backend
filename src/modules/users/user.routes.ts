import { Router } from "express";
import { UserContr } from "./user.contr.js";
import { tokenCheckMiddleware } from "../../middlewares/token.check.js";
import { adminCheckMiddleware } from "../../middlewares/admin.check.js";

const userRouter: Router = Router();

// Authorization
userRouter.post("/register", UserContr.RegisterUser); // it's not for admin, admin added static
userRouter.post("/login", UserContr.Login); // login update token
userRouter.post("/admin/login", UserContr.AdminLogin); //admin login update token

// Get Methods
userRouter.get("/profile", tokenCheckMiddleware, UserContr.GetMyProfile); // Get My Profile
userRouter.get("/users", UserContr.GetUsers); //  //Get Users Only Admin
userRouter.get("/users/:id", UserContr.GetUsers); //  //Get Users Only Admin
userRouter.get("/employers", UserContr.GetEmployer); //Get Employer
userRouter.get("/employers/:id", UserContr.GetEmployer); //Get Employer
userRouter.get("/admin", UserContr.GetAdmin); //Get Employer

// Post Methods
userRouter.post("/employers", adminCheckMiddleware, UserContr.AddEmployer); //Add employer For Admin

// Put Methods
userRouter.put("/employers/:id", adminCheckMiddleware, UserContr.UpdateEmployer); //Update Employer For Admin
userRouter.put("/profile", tokenCheckMiddleware, UserContr.UpdateMyProfile); //Update Profile 
userRouter.put("/forgot-password", UserContr.ForgetPassword); //Update Profile 

// Delete Methods
userRouter.delete('/employers/:id', adminCheckMiddleware, UserContr.DeleteEmployer)  //Delete Employer For Admin


export default userRouter;
