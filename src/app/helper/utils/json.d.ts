/**
 * A module which indicates that all modules that end with '.json'
 * have a value of type 'any'. This allows importing using JSON in typescript.
*/

declare module '*.json' {
   const value: any;
   export default value;
}
