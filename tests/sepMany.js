"use strict";
const pep = require('apep');
const pep_sep = require('../index');
const assert = require('assert');

describe('sepMany', function () {
    it('Should never yield anything for probability zero.', () => {
        const p = pep_sep.sepMany('a', pep.str('x'), 0);
        for (var i = 0; i < 100; ++i)
            assert.deepStrictEqual([], Array.from(p));
    });

    it('Should yield alternating generators and sep.', () => {
        const p = pep_sep.sepMany('x', pep.str('a'));
        for (let i = 0; i < 100; ++i) {
            const a = p.run();
            for (let g = 0; g < a.length; g += 2) {
                assert.strictEqual('a', a[g]);
                if (g + 1 < a.length)
                    assert.strictEqual('x', a[g + 1]);
            }
        }
    });
    
    it('Should yield alternating generators and sep.', () => {
        const p = pep_sep.sepMany('x', ['a', 'b']);
        for (let i = 0; i < 100; ++i) {
            const a = p.run();
            for (let g = 0; g < a.length; g += 3) {
                assert.strictEqual('a', a[g]);
                assert.strictEqual('b', a[g + 1]);
                if (g + 2 < a.length)
                    assert.strictEqual('x', a[g + 2]);
            }
        }
    });
});