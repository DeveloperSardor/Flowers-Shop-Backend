import { Schema, model, InferSchemaType, Types } from "mongoose";

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    file_link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

BlogSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});
type Blog = InferSchemaType<typeof BlogSchema>;
export default model<Blog>("Blogs", BlogSchema);
