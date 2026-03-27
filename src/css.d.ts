/**
 * TypeScript 6+ (TS2882): side-effect-only style imports need module declarations.
 * Kept separate from environment.d.ts (which uses `export {}`) so patterns stay global.
 * @see https://github.com/microsoft/TypeScript/issues/62508
 */
declare module '*.css' {
  const sheet: string
  export default sheet
}

declare module '*.scss' {
  const sheet: string
  export default sheet
}

declare module '@payloadcms/next/css' {
  const sheet: string
  export default sheet
}
