import jobSchema from "./job.schema.js";
import { Request, Response } from "express";

export class JobContr {
  constructor() {}
  static async GetJobs(req: Request, res: Response) {
    try {
      let { id } = req.params;
      if (id) {
        let findByJob = await jobSchema.findById(id);
        if(findByJob == null){
          throw new Error(`Not Found ${id} - job`)
        }
        res.send({
          status: 200,
          message: `${id} - job`,
          success: true,
          data: findByJob,
        });
      } else {
        res.send({
          status: 200,
          message: "Jobs",
          succes: true,
          data: await jobSchema.find().select("-desc"),
        });
      }
    } catch (error: any) {
      res.send({
        status: 200,
        message: `Error : ${error.message}`,
        success: false,
      });
    }
  }

  static async AddJob(req: Request, res: Response) {
    try {
      let { job, desc } = req.body;
      if (!job) {
        throw new Error("Data is incomplated");
      }
      let checkExists = await jobSchema.findOne({ job });
      if (checkExists != null) {
        throw new Error(`This job already exists`);
      }
      let newJob = await jobSchema.create({ job, desc });
      res.send({
        status: 201,
        message: "Successfuly added job",
        success: true,
        data: newJob,
      });
    } catch (error: any) {
      res.send({
        status: 400,
        message: `Error : ${error.message}`,
        success: false,
      });
    }
  }

  static async EditJob(req: Request, res: Response) {
    try {
      let { id } = req.params;
      let { job, desc } = req.body;
      let checkExists = await jobSchema.findById(id);
      if (checkExists == null) {
        throw new Error(`Not Found ${id} - job`);
      }
      if (!job && !desc) {
        throw new Error(`Not Found purpose`);
      }
      let editedjob = await jobSchema.findByIdAndUpdate(
        id,
        { job, desc },
        { new: true }
      );
      res.send({
        status: 200,
        message: "Edited job successfuly!",
        success: true,
        data: editedjob,
      });
    } catch (error: any) {
      res.send({
        status: 200,
        message: `Error : ${error.message}`,
        success: false,
      });
    }
  }

  static async DeleteJob(req: Request, res: Response) {
    try {
      let { id } = req.params;
      let checkExists = await jobSchema.findById(id);
      if (checkExists == null) {
        throw new Error(`Not Found ${id} - job`);
      }
      let deletedJob = await jobSchema.findByIdAndDelete(id);
      res.send({
        status: 200,
        message: `Successfuly deleted ${id} - job`,
        succes: true,
        data: deletedJob,
      });
    } catch (error: any) {
      res.send({
        status: 200,
        message: `Error : ${error.message}`,
        success: false,
      });
    }
  }
}
