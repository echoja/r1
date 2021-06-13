import { enumSearchGroup } from "@const";
import { Router } from "express";
import { drugSearch } from "./db";
import { aw, contains } from "./util";

export const apiRouter = Router();

apiRouter.get("/hello", (req, res, next) => {
  res.send("hello world!");
});



// const searchGroups = {
//   P: "Product Name", // 제품명
//   I: "Ingredient Name", // 성분명
//   E: "EDI code",
//   A: "ATC code",
//   D: "MFDS code", // 식약처 분류 코드
//   all: "all", // 전부
// } as const;



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
    const result = await drugSearch(group, search);
    res.json(result);
  })
);
