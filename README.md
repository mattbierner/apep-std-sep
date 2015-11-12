# Apep-std-sep

Helper combinators for working with sequencing generators [Apep Javascript text generation library][apep].

## Usage
```sh
$ npm install apep-std-sep
```

You can either use `apep-std-sep` as its own include:

```js
const pep = require('apep');
const pep_sep = require('apep-std-sep');

const p = pep_sep.sepBy(...);
```

Or by extending an Apep instance:

```js
let pep = require('apep');
pep = require('apep-std-sep')(pep);

const p = pep.store(...);
```

Extension does not alter the original Apep include but creates a simple proxy that also has the std-var functionality. 

## Documentation

#### `sepBy(sep, ...generators)`
Run `sep` between each `generators`.

```js
const p = pep_sep.sepBy(pep.str('\n'), 'a', 'b', 'c');

Array.from(p) === ['a', '\n', 'b', '\n', 'c'];
```

#### `between(first, last)(...middle)`
Convenience function to create a combinator that runs it's input generator between two generators. 

```js
pep_sep.between('a', 'c')('b') === pep.seq('a', 'b', 'c')
```

#### `endWith(last)(...first)`
Convenience function to create a combinator that runs it's input generator between two generators. 

```js
pep_sep.endWith('a')('b', 'c') === pep.seq('b', 'c', 'a');
```

#### `sepMany(sep, g, prob = 0.5)`
Run `g` one or more times, outputting `sep` between instances.
    
* `sep` - Separator generator run between each invocation of `g`.
* `g` - Generator.
* `prob` - Probability that many will continue to produce a value.

```js
const words = pep.choice('quick', 'brown', 'fox', 'jumps');

const p = pep_sep.sepMany(' ', words);

p.run() === 'fox quick';
p.run() === '';
p.run() === 'jumps';
p.run() === 'jumps fox brown';
```

#### `sepMany1(sep, g, prob = 0.5)`
Run `g` one or more times, outputting `sep` between instances.
    
See `sepMany`.


[apep]: https://github.com/mattbierner/apep
