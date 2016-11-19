# [h.js]

__2KB__ JavaScript Syntax Highlighter

[![Build Status](https://img.shields.io/travis/MakeNowJust/h.js.svg?style=flat-square)](https://travis-ci.org/MakeNowJust/h.js)
[![Dependencies](https://img.shields.io/david/MakeNowJust/h.js.svg?style=flat-square)](https://david-dm.org/MakeNowJust/h.js#info=dependencies)
[![DevDependencies](https://img.shields.io/david/dev/MakeNowJust/h.js.svg?style=flat-square)](https://david-dm.org/MakeNowJust/h.js#info=devDependencies)
[![Version](https://img.shields.io/npm/v/h.js.svg?style=flat-square)](https://www.npmjs.com/package/h.js)
[![License](https://img.shields.io/npm/l/h.js.svg?style=flat-square)](https://makenowjust.mit-license.org/2015)

[h.js]: https://github.com/MakeNowJust/h.js

## Feature

  - Only 2.0KB (or 1.4KB if gzipepd)
  - Of cource, self contained
  - Exact highlighting (Did you see mis-highlighted regexp or else?)
  - Support [ES2015][] syntax (template string, octal/binary number and some keywords...)
  - Support [ES2016][] and ES2017 syntax (exponentiation operator and async/await)
  - Support [JSDoc][] tag highlighting
  - Support [UMD][] ([CommonJS][], [AMD][] and classic style loading)

See [live demo][]!

[ES2015]: http://www.ecma-international.org/ecma-262/6.0/
[ES2016]: http://www.ecma-international.org/ecma-262/7.0/
[JSDoc]: http://usejsdoc.org/
[UMD]: https://github.com/umdjs/umd
[CommonJS]: https://en.wikipedia.org/wiki/CommonJS
[AMD]: https://github.com/amdjs/amdjs-api/blob/master/AMD.md
[live demo]: http://h.js.org/demo.html


## Install

```console
$ npm install --save h.js
```

or download [h.js][raw h.js] directly.

[raw h.js]: https://raw.githubusercontent.com/MakeNowJust/h.js/master/h.js


## Usage

In Node.js, you can use `require`:

```javascript
const h = require('h.js')
console.log(h('1 + 2'))
//=> '<span class=v>1</span> <span class=o>+</span> <span class=v>2</span>'
```

In Browser, you add `<script>` tag to load h.js and put this script into the tail of `<body>`:

```javascript
Array.from(document.querySelectorAll('pre code.h-js'))
  .forEach((code) => {
    code.innerHTML = h(code.textContent)
  })
```


## API

```javascript
/**
 * Highlight JavaScript source code.
 *
 * @param {string} source - JavaScript source code.
 * @return {string} - Highlighted source code.
 */
function h (source) {
```

It returns HTML text which contains `<span>` element having such a class:

  - `<span class=c>...</span>` means the comment.
  - `<span class=d>...</span>` means the JSDoc tag (it appears in comment.)
  - `<span class=k>...</span>` means the keyword.
  - `<span class=v>...</span>` means the value (number, boolean and some constants.)
  - `<span class=s>...</span>` means the string (includes template string.)
  - `<span class=i>...</span>` means the interpolation (it appears in template string.)
  - `<span class=r>...</span>` means the regexp.
  - `<span class=o>...</span>` means the operator.
  - `<span class=p>...</span>` means the punctual symbol.
  - `<span class=f>...</span>` means the function name.

You can define styles of those classes in your CSS.


## License

MIT License <https://makenowjust.mit-license.org/2015-2016>
