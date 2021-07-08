import { enumSearchGroup } from "@const";
import { Router } from "express";
import { drugSearch } from "./db";
import { aw, contains } from "./util";
import { utils as xlsxUtils, write as xlsxWrite } from "xlsx";
import { Connection } from "tedious";

export function createApiRouter(connection: Connection): Router {
  const apiRouter = Router();

  apiRouter.get("/hello", (req, res, next) => {
    res.send("hello world!");
  });

  apiRouter.get(
    "/search-by-group/:group/:search",
    aw(async (req, res, next) => {
      const { group, search } = req.params;
      if (
        typeof group !== "string" ||
        typeof search !== "string" ||
        !contains(enumSearchGroup, group)
      ) {
        res.status(403).send();
        return;
      }
      const result = await drugSearch(connection, group, search);
      res.json(result);
    })
  );

  apiRouter.get(
    "/download/:group/:search",
    aw(async (req, res, next) => {
      const { group, search } = req.params;
      if (
        typeof group !== "string" ||
        typeof search !== "string" ||
        !contains(enumSearchGroup, group)
      ) {
        res.status(403).send();
        return;
      }
      const result = await drugSearch(connection, group, search);
      const excel = xlsxUtils.json_to_sheet(result as any[]);
      const book = xlsxUtils.book_new();
      xlsxUtils.book_append_sheet(book, excel, "export");
      const buffer = xlsxWrite(book, { type: "buffer" });
      res.send(buffer);
    })
  );

  return apiRouter;
}
