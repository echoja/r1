export const other = 3;

export function comparerStringByKey<
  T extends string,
  U extends { [P in T]?: string }
>(key: T, option?: { desc?: boolean }) {
  return (a: U, b: U): number => {
    const desc = option?.desc;

    const nameA = a[key]?.toUpperCase();
    const nameB = b[key]?.toUpperCase();
    if (!nameA || !nameB) return 0;
    let res: number;
    if (nameA < nameB) {
      res = -1;
    } else if (nameA > nameB) {
      res = 1;
    } else {
      res = 0;
    }
    // 정렬 순서에 따라 조정합니다.
    if (desc) {
      res *= -1;
    }
    return res;
  };
}
