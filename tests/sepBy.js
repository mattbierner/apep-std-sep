"use strict";
const pep = require('apep');
const pep_sep = require('../index');
const assert = require('assert');

describe('sepBy', function () {
    it('Should yield nothing with empty generator.', () => {
        const p = pep_sep.sepBy('a', pep.empty);
        assert.deepStrictEqual([], Array.from(p));
    });

    it('Should yield just generator for single generator.', () => {
        const p = pep_sep.sepBy('a', pep.str('x'));
        assert.deepStrictEqual(['x'], Array.from(p));
    });
    
    it('Should yield values for single, multiple value generator .', () => {
        const p = pep_sep.sepBy('a', pep.seq('x', 'y', 'z'));
        assert.deepStrictEqual(['x', 'y', 'z'], Array.from(p));
    });
    
    it('Should put sep between two generators.', () => {
        const p = pep_sep.sepBy(pep.str('x'), 'a', 'b');
        assert.deepStrictEqual(['a', 'x', 'b'], Array.from(p));
    });
    
    it('Should put sep between many generators.', () => {
        const p = pep_sep.sepBy(pep.str('x'), 'a', 'b', 'c', 'd', 'e');
        assert.deepStrictEqual('axbxcxdxe', p.run());
    });
    
    it('Should yield properly when sep is a multi generator.', () => {
        const p = pep_sep.sepBy(['x', 'y'], 'a', 'b');
        assert.deepStrictEqual(['a', 'x', 'y', 'b'], Array.from(p));
    });
});