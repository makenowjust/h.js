# h.js

> **2KB** JavaScript Syntax Highlighter

[![Build Status](https://img.shields.io/travis/MakeNowJust/h.js.svg?style=flat-square)](https://travis-ci.org/MakeNowJust/h.js)
[![Dependencies](https://img.shields.io/david/MakeNowJust/h.js.svg?style=flat-square)](https://david-dm.org/MakeNowJust/h.js#info=dependencies)
[![DevDependencies](https://img.shields.io/david/dev/MakeNowJust/h.js.svg?style=flat-square)](https://david-dm.org/MakeNowJust/h.js#info=devDependencies)
[![Version](https://img.shields.io/npm/v/h.js.svg?style=flat-square)](https://www.npmjs.com/package/h.js)
[![License](https://img.shields.io/npm/l/h.js.svg?style=flat-square)](https://makenowjust.mit-license.org/2015-2018)

## Features

* It is small. The size is only 2.0KB or 1.4KB if gzipped.
* It needs no other libraries.
* It supports [ES2015][], [ES2016][], [ES2017][] and ES2018 syntax also.

[es2015]: http://www.ecma-international.org/ecma-262/6.0/
[es2016]: http://www.ecma-international.org/ecma-262/7.0/
[es2017]: http://www.ecma-international.org/ecma-262/8.0/

## Install

NPM:

```console
$ npm install h.js
```

Yarn:

```console
$ yarn add h.js
```

## Usage

```javascript
const h = require("h.js");

console.log(h("1 + 2"));
// => <span class=v>1</span> <span class=o>+</span> <span class=v>2</span>
```

### API

```javascript
/**
 * `h` highlights JavaScript source code.
 *
 * @param {string} source - JavaScript source code
 * @return {string} - highlighted HTML string
 */
const h = source => ...
```

It returns an HTML string which contains some `<span>` elements having such classes:

* `<span class=c>...</span>`: comment
* `<span class=d>...</span>`: JSDoc tag (only in comment)
* `<span class=k>...</span>`: keyword
* `<span class=v>...</span>`: value (number literal, boolean and some constants)
* `<span class=s>...</span>`: string literal (also means a template string)
* `<span class=i>...</span>`: interpolation content (only in template string)
* `<span class=r>...</span>`: regexp literal
* `<span class=o>...</span>`: operator symbol
* `<span class=p>...</span>`: punctual symbol
* `<span class=f>...</span>`: function name

## License

MIT License <https://makenowjust.mit-license.org/2015-2018>
