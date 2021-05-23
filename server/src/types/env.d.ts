declare module 'process' {
  global {
    namespace NodeJS {
      export interface ProcessEnv {
        NODE_ENV: string,
      }
    }
  }
}