import express from "express";
import history from "connect-history-api-fallback";
import path from "path";
import { apiRouter } from "@/router";
import { TestInterface } from "@typedef";

const app = express();
app.use(
  "/app",
  (req, res, next) => {
    console.dir(req, { depth: 0 });
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
console.log(path.resolve(__dirname, "../web-dist"));
app.use("/api", apiRouter);
const port = process.env.NODE_ENV === "development" ? 29540 : 80;
app.listen(port, function () {
  console.log(`Express serving on ${port}, node: ${process.env.NODE_ENV}`);
});
