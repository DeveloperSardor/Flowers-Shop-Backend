import express, { Application, Request, Response } from "express";
import "../utils/connection.js";
import cors from "cors";
import config from "config";
import indexRouter from "../router/index.js";

const app: Application = express();
const PORT = config.get("port") || 3000;

app.use(express.json());
app.use(cors());
app.use("/api", indexRouter);

app.listen(PORT, () => console.log(`Server is running ${PORT}...`));
