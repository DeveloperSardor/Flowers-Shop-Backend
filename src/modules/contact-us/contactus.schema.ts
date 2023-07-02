import { Schema, model, InferSchemaType, Types } from "mongoose";

const ContactSchema = new Schema(
  {
   whom : {
    type : Types.ObjectId,
    ref : 'Users'
   },
   text : {
    type : String
   },
   email : {
    type : String
   }
  },
  {
    timestamps: true,
  }
);

type ContactUS = InferSchemaType<typeof ContactSchema>;
export default model<ContactUS>("ContactUs", ContactSchema);
