import { Schema, model, InferSchemaType, Types} from "mongoose";

const JobSchema = new Schema(
  {
  job : {
    type : String,
    required : true
  },
  desc : {
    type : String,
    default : null
  }
  },
  {
    timestamps: true,
  }
);


type Jobs = InferSchemaType<typeof JobSchema>
export default model<Jobs>('Jobs', JobSchema);

