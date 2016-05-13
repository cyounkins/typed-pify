// import { Promise } from 'es6-promise';

// works for function

// declare function pify<TR>(input: (cb: (err: Error, data: TR) => void) => void, promiseModule?: Function, options?: pify.PifyOptions): () => Promise<TR>;
// declare function pify<TR>(input: (cb: (err: Error, data: TR) => void) => void, options?: pify.PifyOptions): () => Promise<TR>;

// Example: input is fs.readFile, arg1 is the filename
// declare function pify<T1, TR>(input: (arg1: T1, cb: (err: Error, data: TR) => void) => void, promiseModule?: Function, options?: pify.PifyOptions): (arg1: T1) => Promise<TR>;
// declare function pify<T1, TR>(input: (arg1: T1, cb: (err: Error, data: TR) => void) => void, options?: pify.PifyOptions): (arg1: T1) => Promise<TR>;

// Fallback

declare function pify(input: Function | Object, promiseModule?: Function, options?: pify.PifyOptions): any;
declare function pify(input: Function | Object, options?: pify.PifyOptions): any;

declare namespace pify {
    export interface PifyOptions {
        multiArgs?: boolean;
        include?: [string | RegExp];
        exclude?: [string | RegExp];
        excludeMain?: boolean;
    }
}

export = pify;
