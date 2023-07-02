import { Schema, model, InferSchemaType, Types } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
    type : String,
    enum : ['user', 'admin', 'employer']
    },
    img_link : {
     type : String,
     default : 'https://yt3.ggpht.com/a/AGF-l78AzseOtv4fYGdmRtS7CtaL4wJZLKuFwsi54g=s900-c-k-c0xffffffff-no-rj-mo'
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    website: {
      type: String,
      default : null
    },
    job: {
      type: Types.ObjectId,
      ref: "Jobs",
      default : null
    },
    phone: {
      type: String,
      unique : true,
      match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    },
  },
  {
    timestamps: true,
  }
);

type Users = InferSchemaType<typeof UserSchema>;
export default model<Users>("Users", UserSchema);
