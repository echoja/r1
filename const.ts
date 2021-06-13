export const enumSearchGroup = ["P", "I", "E", "A", "D", "all"] as const;

// {[P in typeof enumSearchGroup[number]]: string}
export const searchGroupNameMap = {
  P: "제품명 (Product Name)",
  I: "성분명 (Ingredient Name)",
  E: "EDI Code",
  A: "ATC Code",
  D: "식약처분류코드",
  all: "모두",
} as const;
