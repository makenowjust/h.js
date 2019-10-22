# h.js

> **2KB** JavaScript Syntax Highlighter

[![Version](https://img.shields.io/npm/v/h.js.svg?style=flat-square)](https://www.npmjs.com/package/h.js)
[![MIT License](https://img.shields.io/npm/l/h.js.svg?style=flat-square)](https://makenowjust.mit-license.org/2015-2019)
[![SUSHI-WARE License](https://img.shields.io/badge/license-SUSHI--WARE%F0%9F%8D%A3-blue.svg?style=flat-square)](https://github.com/MakeNowJust/sushi-ware)


## Features

- It is small. The size is only 2.0KB or 1.4KB if gzipped.
- It needs no other libraries.
- It supports [ES2015][], [ES2016][], [ES2017][], [ES2018][] and [ES2019][] syntax also.

[es2015]: http://www.ecma-international.org/ecma-262/6.0/
[es2016]: http://www.ecma-international.org/ecma-262/7.0/
[es2017]: http://www.ecma-international.org/ecma-262/8.0/
[es2018]: http://www.ecma-international.org/ecma-262/9.0/
[es2019]: http://www.ecma-international.org/ecma-262/10.0/

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

- `<span class=c>...</span>`: comment
- `<span class=d>...</span>`: JSDoc tag (only in comment)
- `<span class=k>...</span>`: keyword
- `<span class=v>...</span>`: value (number literal, boolean and some constants)
- `<span class=s>...</span>`: string literal (also means a template string)
- `<span class=i>...</span>`: interpolation content (only in template string)
- `<span class=r>...</span>`: regexp literal
- `<span class=o>...</span>`: operator symbol
- `<span class=p>...</span>`: punctual symbol
- `<span class=f>...</span>`: function name

## License

MIT License <https://makenowjust.mit-license.org/2015-2019> and SUSHI-WARE License <https://github.com/MakeNowJust/sushi-ware>
