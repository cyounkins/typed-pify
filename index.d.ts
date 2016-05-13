// declare function pify(input: Function, promiseModule?: Function, options?: pify.PifyOptions): (...args:any[]) => any;
declare function pify(input: Function | Object, promiseModule?: Function, options?: pify.PifyOptions): any;
// declare function pify(input: Function, options?: pify.PifyOptions): (...args:any[]) => any;
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
