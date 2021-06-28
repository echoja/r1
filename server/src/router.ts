import { enumSearchGroup } from "@const";
import { Router } from "express";
import { drugSearch } from "./db";
import { aw, contains } from "./util";
import { utils as xlsxUtils, write as xlsxWrite } from "xlsx";

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

apiRouter.get("/download/:group/:search", aw(async (req, res, next) => {
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
  const excel = xlsxUtils.json_to_sheet(result as any[]);
  const book = xlsxUtils.book_new();
  xlsxUtils.book_append_sheet(book, excel, "export");
  const buffer = xlsxWrite(book, { type: "buffer" });
  // const blob = new Blob([array]);
  // const now = new Date();
  // saveAs(
  //   blob,
  //   `research_result_${
  //     search.value
  //   }_${now.getFullYear()}-${now.getMonth()}-${now.getDate()}.xlsx`
  // );
  res.send(buffer);
  // res.sendFile(result);
}));
