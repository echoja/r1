import * as dotenv from "dotenv";
dotenv.config();

import * as express from "express";
import * as history from "connect-history-api-fallback";
import * as path from "path";
import { apiRouter } from "@/router";
import { dbTest } from "./db";


// dotenv.config({path: path.resolve(__dirname, '../.env')});

console.log(process.env.DB_HOST);

const app = express();

app.use(
  "/app",
  (req, res, next) => {
    if (req.originalUrl === "/app") res.redirect("/app/");
    else next();
  },
  // history
  history({
    verbose: true,
  }),
  // static
  express.static(path.resolve(__dirname, "../web-dist"))
);

app.use("/api", apiRouter);

const m1: express.Handler = (req, res, next) => {
  console.log("123");
  next();
  console.log("after next");
  res.send("heom");
};

const m2: express.Handler = (req, res, next) => {
  console.log("345");
};

app.get("/abc", m1, m2);

const router = express.Router();

router.get("/test", (req, res, next) => {
  res.send("test");
});

router.get("/test2", (req, res, next) => {
  res.send("test2");
});

app.use("/hello", router);

/** tedious */

dbTest();

const port = process.env.NODE_ENV === "development" ? 29540 : 80;
app.listen(port, function () {
  console.log(`Express serving on ${port}, node: ${process.env.NODE_ENV}`);
});
