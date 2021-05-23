import * as express from "express";
import * as history from "connect-history-api-fallback";
import * as path from "path";
import { apiRouter } from "./router";

const app = express();
app.use("/app", history());
app.get("/app", express.static("../web-dist"));
app.use("/api", apiRouter);

app.listen(5000, function () {
  console.log(`Express serving on 5000!, node: ${process.env.NODE_ENV}`);
  
});
