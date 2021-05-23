import { Router } from "express";

export const apiRouter = Router();

apiRouter.get("/hello", (req, res, next) => {
  res.send("hello world!");
});
