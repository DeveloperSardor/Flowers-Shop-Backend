import { Schema, model, InferSchemaType } from "mongoose";

const CategoryFlower = new Schema(
  {
    category: String,
  },
  {
    timestamps: true,
  }
);

type CategoryFlowerType = InferSchemaType<typeof CategoryFlower>;
export default model<CategoryFlowerType>("CategoryFlowers", CategoryFlower);
