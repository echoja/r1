import * as tedious from "tedious";
import { searchGroupKey } from "@type";
import { ColumnValue } from "./types";

export const dbConenct = (connection: tedious.Connection): Promise<void> => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export function dbRequest<Row = any>(
  connection: tedious.Connection,
  sql: string
): Promise<{ rows: Row[]; rowCount: number }> {
  return new Promise((resolve, reject) => {
    const request = new tedious.Request(sql, (err, rowCount, rows: Row[]) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ rows, rowCount });
    });
    connection.execSql(request);
  });
}

export const dbConfig: tedious.ConnectionConfig = {
  server: process.env.DB_HOST, // or "localhost"
  options: {
    encrypt: false,
    rowCollectionOnDone: true,
    rowCollectionOnRequestCompletion: true,
    database: "Drug_Current",
  },
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
};



export const dbTest = async (): Promise<void> => {
  try {
    await dbConenct(connection);
    const res = await dbRequest(
      connection,
      "EXEC SP_Drug_Search_by_CodeGroup 'I', 'acetaminophen';"
    );
  } catch (e) {
    console.error(e);
  }
};

const connection = new tedious.Connection(dbConfig);

type DrugSearchResult = ReadonlyArray<Record<string, string>>;

export function organizeDbResponse<T>(rows: ColumnValue<T>[][]): Record<string, T>[] {
  const result: Record<string, T>[] = [];
  rows.forEach((row) => {
    const new_row:Record<string, T> = {};
    row.forEach((colValue) => {
      new_row[colValue.metadata.colName] = colValue.value;
    })
    result.push(new_row);
  });
  return result;
}

export async function drugSearch(group: searchGroupKey, search: string): Promise<DrugSearchResult> {
  if (group == "all")
  {
    return [];
  }
  const sql = `EXEC SP_Drug_Search_by_CodeGroup '${group}', '${search}';`
  const res = await dbRequest(connection, sql);
  // const res = await dbRequest<ColumnValue<string>[]>(connection, sql);
  const result = organizeDbResponse<string>(res.rows);
  return result;
}
