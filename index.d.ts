import {Promise} from 'es6-promise';

declare function pify(input: Function, promiseModule?: Function, options?: pify.PifyOptions): (...args:any[]) => Promise<any>;
declare function pify(input: any, promiseModule?: Function, options?: pify.PifyOptions): any;
declare function pify(input: Function, options?: pify.PifyOptions): (...args:any[]) => Promise<any>;
declare function pify(input: any, options?: pify.PifyOptions): any;

declare namespace pify {
    export interface PifyOptions {
        multiArgs?: boolean;
        include?: [string | RegExp];
        exclude?: [string | RegExp];
        excludeMain?: boolean;
    }
}

export = pify;
