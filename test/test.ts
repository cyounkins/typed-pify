import pify = require('pify');
import * as Bluebird from 'bluebird';
import * as test from 'blue-tape';

const fs = {
    readFile: (file: string, callback: Function) => {
        let result: any = undefined;

        if (file === 'foo.txt') {
            result = 'foo';
        } else if (file === 'bar.txt') {
            result = 'bar';
        }

        callback(undefined, result);
    },
};


test('all of fs', (t) => {
    const fsP = pify(fs);
    return fsP.readFile('foo.txt').then((result: string) => t.assert(result, 'foo'));
});

test('fs.readFile with default Promise', (t) => {
    return pify(fs.readFile)('foo.txt').then((result: string) => t.assert(result, 'foo'));
});

test('fs.readFile with Bluebird', (t) => {
    return pify(fs.readFile, Bluebird)('bar.txt').then((result: string) => t.assert(result, 'bar'));
});
