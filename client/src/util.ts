export const other = 3;

export function comparerStringByKey<
  T extends string,
  U extends { [P in T]?: string }
>(key: T) {
  return (a: U, b: U): number => {
    const nameA = a[key]?.toUpperCase();
    const nameB = b[key]?.toUpperCase();
    if (!nameA || !nameB) return 0;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // 이름이 같을 경우
    return 0;
  };
}
