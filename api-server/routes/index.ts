import express, { Response, Request } from "express";
import projectRouter from "./project";
import userRouter from "./user";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.json({
    app: "vercel clone",
    version: "1.0.0",
  });
});

router.use("/v1/project", projectRouter);
router.use("/v1/user", userRouter);

export default router;
