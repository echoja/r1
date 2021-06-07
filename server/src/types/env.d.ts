declare module "process" {
  global {
    namespace NodeJS {
      export interface ProcessEnv {
        NODE_ENV?: string;
        DB_HOST?: string;
        DB_PORT?: string;
        DB_USER?: string;
        DB_PASSWORD?: string;
      }
    }
  }
}
