import mongoose from "mongoose";
import config from "config";

try {
  mongoose.connect(config.get("dbUrl"));
  // mongoose.connect(`mongodb://127.0.0.1:27017`)
  console.log("MongoDb Successfuly connected!");
} catch (error: unknown) {
  console.log("Mongo Error : Error Occured!");
}
     