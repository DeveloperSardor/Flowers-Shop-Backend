import { Router } from "express";
import { tokenCheckMiddleware } from "../../middlewares/token.check.js";
import { adminCheckMiddleware } from "../../middlewares/admin.check.js";
import { JobContr } from "./job.contr.js";

const jobsRouter  : Router= Router()

jobsRouter.get('/jobs', JobContr.GetJobs)
jobsRouter.get('/jobs/:id', JobContr.GetJobs)

jobsRouter.post('/jobs', adminCheckMiddleware, JobContr.AddJob)

jobsRouter.put('/jobs/:id', adminCheckMiddleware, JobContr.EditJob)


jobsRouter.delete('/jobs/:id', adminCheckMiddleware, JobContr.DeleteJob)




export default jobsRouter; 