"use strict";

var pep = require('apep');

var pep_sep = module.exports = function () {
    var proto = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    return Object.create(proto, Object.getOwnPropertyNames(pep_sep).reduce(function (p, c) {
        p[c] = Object.getOwnPropertyDescriptor(pep_sep, c);
        return p;
    }, {}));
};

/**
    Run `sep` between each `generators`.
*/
pep_sep.sepBy = function (sep) {
    for (var _len = arguments.length, generators = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        generators[_key - 1] = arguments[_key];
    }

    return generators.reduce(function (p, c) {
        return pep.seq(p, sep, c);
    });
};

/**
    Currying convenience function to create a combinator that runs it's input
    generator between two generators. 
*/
pep_sep.between = function (first, left) {
    return function (middle) {
        return pep.seq(first, middle, last);
    };
};

/**
    Run `g` one or more times, outputting `sep` between instances.
    
    @param sep Separator generator run between each invocation of `g`.
    @param g Generator.
    @param prob Probability that many will continue to produce a value.
*/
pep_sep.sepMany1 = function (sep, g) {
    var prob = arguments.length <= 2 || arguments[2] === undefined ? 0.5 : arguments[2];
    return pep.seq(g, pep.many(pep.seq(sep, g), prob));
};

/**
    Run `g` zero or more times, outputting `sep` between instances.
    
    @see sepMany1
*/
pep_sep.sepMany = function (sep, g) {
    var prob = arguments.length <= 2 || arguments[2] === undefined ? 0.5 : arguments[2];
    return pep.opt(pep_sep.sepMany1(sep, g, prob), prob);
};
//# sourceMappingURL=index.js.map
