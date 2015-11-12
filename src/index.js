"use strict";
const pep = require('apep');

const pep_sep = module.exports = (proto = {}) => 
    Object.create(proto, Object.getOwnPropertyNames(pep_sep)
        .reduce((p, c) => {
            p[c] = Object.getOwnPropertyDescriptor(pep_sep, c);
            return p;
        }, {}));

/**
    Run `sep` between each `generators`.
*/
pep_sep.sepBy = (sep, ...generators) =>
    generators.reduce((p, c) => pep.seq(p, sep, c));

/**
    Currying convenience function to create a combinator that runs it's input
    generator between two generators. 
*/
pep_sep.between = (first, left) =>
    (middle) => pep.seq(first, middle, last);

/**
    Run `g` one or more times, outputting `sep` between instances.
    
    @param sep Separator generator run between each invocation of `g`.
    @param g Generator.
    @param prob Probability that many will continue to produce a value.
*/
pep_sep.sepMany1 = (sep, g, prob = 0.5) =>
    pep.seq(g, pep.many(pep.seq(sep, g), prob));

/**
    Run `g` zero or more times, outputting `sep` between instances.
    
    @see sepMany1
*/
pep_sep.sepMany = (sep, g, prob = 0.5) =>
    pep.opt(pep_sep.sepMany1(sep, g, prob), prob);
