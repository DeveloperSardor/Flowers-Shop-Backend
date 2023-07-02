import mongoose, {Document} from "mongoose";

export interface IUser extends Document{
    username : string;
    password : string;
    email : string;
    website : string;
    job? : mongoose.Types.ObjectId;
    phone : string;
}


export  interface JwtPayload {
    user_id: string;
  }