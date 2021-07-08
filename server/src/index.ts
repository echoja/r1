import * as dotenv from "dotenv";
import * as express from "express";
import * as history from "connect-history-api-fallback";
import * as path from "path";
import { createApiRouter } from "@/router";
import { createConnection, dbConenct } from "./db";
dotenv.config();
// import { dbTest } from "./db";

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

app.get("/", (req, res, next) => {
  res.redirect("/app");
});

const connection = createConnection();
const apiRouter = createApiRouter(connection);
app.use("/api", apiRouter);

const port = process.env.NODE_ENV === "development" ? 29540 : 80;

const run = async () => {
  await dbConenct(connection);
  app.listen(port, function () {
    console.log(`Express serving on ${port}, node: ${process.env.NODE_ENV}`);
  });
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
