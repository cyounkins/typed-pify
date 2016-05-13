import pify = require('pify');
import * as test from 'blue-tape';
import pinkiePromise = require('pinkie-promise');
import fs = require('fs');

function fixture (cb: Function): void {
    setImmediate(function() {
        cb(null, 'unicorn');
    });
}

function fixture2 (x: any, cb: Function): void {
    setImmediate(function() {
        cb(null, x);
    });
}

function fixture3 (cb: Function): void {
    setImmediate(function() {
        cb(null, 'unicorn', 'rainbow');
    });
}

interface Fixture4 {
    (cb: Function): void;
    meow(cb: Function): void;
}

const fixture4 = <Fixture4>function(cb: Function): void {
    setImmediate(function() {
        cb(null, 'unicorn');
        return 'rainbow';
    });
};

fixture4.meow = function(cb: Function) {
    setImmediate(() => {
        cb(null, 'unicorn');
    });
};

const fixture5 = () => 'rainbow';

const fixtureModule = {
    method1: fixture,
    method2: fixture,
    method3: fixture5,
};


test('main', t => {
    t.is(typeof pify(fixture)().then, 'function');

    return pify(fixture)().then(r => {
        t.is(r, 'unicorn');
    });
});


test('pass argument', t => {
    return pify(fixture2)('rainbow').then(r => {
        t.is(r, 'rainbow');
    });
});

test('custom Promise module', t => {
    return pify(fixture, pinkiePromise)().then(r => {
        t.is(r, 'unicorn');
    });
});

test('multiArgs option', t => {
    return pify(fixture3, {multiArgs: true})().then(r => {
        t.deepEqual(r, ['unicorn', 'rainbow']);
    });
});


test('wrap core method', t => {
    return pify(fs.readFile)('../package.json').then(r => {
        t.is(JSON.parse(r.toString()).name, 'not-pify');
    });
});

test('module support', t => {
    return pify(fs).readFile('../package.json').then(r => {
        t.is(JSON.parse(r.toString()).name, 'not-pify');
    });
});

test('module support - doesn\'t transform *Sync methods by default', t => {
    t.is(JSON.parse(pify(fs).readFileSync('../package.json')).name, 'not-pify');
    t.end();
});


test('module support - preserves non-function members', t => {
    const module = {
        method: function () {},
        nonMethod: 3,
    };

    t.deepEqual(Object.keys(module), Object.keys(pify(module)));
    t.end();
});

test('module support - transforms only members in options.include', t => {
    const pModule = pify(fixtureModule, {
        include: ['method1', 'method2'],
    });

    t.is(typeof pModule.method1().then, 'function');
    t.is(typeof pModule.method2().then, 'function');
    t.not(typeof pModule.method3().then, 'function');
    t.end();
});


test('module support - doesn\'t transform members in options.exclude', t => {
    const pModule = pify(fixtureModule, {
        exclude: ['method3'],
    });

    t.is(typeof pModule.method1().then, 'function');
    t.is(typeof pModule.method2().then, 'function');
    t.not(typeof pModule.method3().then, 'function');
    t.end();
});

test('module support - options.include over options.exclude', t => {
    const pModule = pify(fixtureModule, {
        include: ['method1', 'method2'],
        exclude: ['method2', 'method3'],
    });

    t.is(typeof pModule.method1().then, 'function');
    t.is(typeof pModule.method2().then, 'function');
    t.not(typeof pModule.method3().then, 'function');
    t.end();
});

test('module support — function modules', t => {
    t.is(typeof fixture4, 'function');
    const pModule = pify(fixture4);

    t.is(typeof pModule().then, 'function');
    t.is(typeof pModule.meow().then, 'function');
    t.end();
});

test('module support — function modules exclusion', t => {
    const pModule = pify(fixture4, {
        excludeMain: true,
    });

    t.is(typeof pModule.meow().then, 'function');
    // Disabled test because TypeScript will complain about the bad attribute access
    // t.not(typeof pModule(function () {}).then, 'function');
    t.end();
});

