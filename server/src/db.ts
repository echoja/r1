import * as tedious from "tedious";

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
    request.on('row', function(columns) {
      columns.forEach(function(column) {
        console.log(column.value);
      });
    });
    connection.execSql(request);
  });
}

export const dbConfig: tedious.ConnectionConfig = {
  server: process.env.DB_HOST, // or "localhost"
  options: {
    encrypt: false,
  },
  authentication: {
    type: "default",
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
};

const connection = new tedious.Connection(dbConfig);

export const dbTest = async (): Promise<void> => {
  try {
    await dbConenct(connection);
    const res = await dbRequest(connection, "select 42, 'hello world'");
    console.log(res);
  } catch (e) {
    console.error(e);
  }
};
