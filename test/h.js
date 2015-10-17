'use strict'
const test = require('tape')
const h = require('..')
const he = s => s.replace(/[&<>"']/g,(s)=>`&#${s.charCodeAt(0)};`)

test('comment', t => {
  ;[
    `//`,
    `/**/`,
    `// This is a comment`,
    `/* These
      * Lines
      * are
      * Comments
      */`
  ].forEach(testCase => {
    t.equal(h(testCase), `<span class=c>${he(testCase)}</span>`)
  })

  t.end()
})

test('document comment', t => {
  ;[
    ['// @test', '<span class=c>// <span class=d>@test</span></span>'],
    ['/* @test */', '<span class=c>/* <span class=d>@test</span> */</span>']
  ].forEach(testCase => {
    t.equal(h(testCase[0]), testCase[1])
  })

  t.end()
})

test('keyword', t => {
  'break catch class const continue default do else finally function if import let static super switch this try var while with case delete export extends in instanceof return throw typeof void yield'.split(' ').forEach(testCase => {
    t.equal(h(testCase), `<span class=k>${he(testCase)}</span>`)
    t.equal(h(`.${testCase}`), `<span class=p>.</span>${he(testCase)}`)
    if (testCase !== 'default') {
      t.equal(h(`${testCase} :`), `${he(testCase)} <span class=p>:</span>`)
    }
  })

  t.end()
})

test('number', t => {
  '3 3.14 3.14e10 3.14e-10 0x0123456789abcdefABCDEF 0b0101 0o1234 01234'.split(' ').forEach(testCase => {
    t.equal(h(testCase), `<span class=v>${he(testCase)}</span>`)
  })

  t.end()
})

test('boolean', t => {
  'true false'.split(' ').forEach(testCase => {
    t.equal(h(testCase), `<span class=v>${he(testCase)}</span>`)
  })

  t.end()
})

test('constant', t => {
  'undefined null NaN Infinity'.split(' ').forEach(testCase => {
    t.equal(h(testCase), `<span class=v>${he(testCase)}</span>`)
  })

  t.end()
})

test('string', t => {
  ;[
    `''`,
    `""`,
    `'string'`,
    `"string"`,
    `'\\''`,
    `"\\""`
  ].forEach(testCase => {
    t.equal(h(testCase), `<span class=s>${he(testCase)}</span>`)
  })

  t.end()
})

test('template literal', t => {
  ;[
    '``',
    '`template literal`',
    '`\\``',
    '`\\${`'
  ].forEach(testCase => {
    t.equal(h(testCase), `<span class=s>${he(testCase)}</span>`)
  })

  ;[
    ['`${}`', '<span class=s>`<span class=p>${</span><span class=i></span><span class=p>}</span>`</span>'],
    ['`${1}`', '<span class=s>`<span class=p>${</span><span class=i><span class=v>1</span></span><span class=p>}</span>`</span>'],
    ['`${{}}`', '<span class=s>`<span class=p>${</span><span class=i><span class=p>{</span><span class=p>}</span></span><span class=p>}</span>`</span>'],
    ['`${`${}`}`', '<span class=s>`<span class=p>${</span><span class=i><span class=s>`<span class=p>${</span><span class=i></span><span class=p>}</span>`</span></span><span class=p>}</span>`</span>']
  ].forEach(testCase => {
    t.equal(h(testCase[0]), testCase[1])
  })

  t.end()
})

test('regexp', t => {
  ;[
    '/regexp/',
    '/regexp/imguy',
    '/regular expression/',
    '/\\//'
  ].forEach(testCase => {
    t.equal(h(testCase), `<span class=r>${he(testCase)}</span>`)

    'case delete export extends in instanceof return throw typeof void yield'.split(' ').forEach(prefix => {
      t.equal(h(`${prefix} ${testCase}`), `<span class=k>${he(prefix)}</span> <span class=r>${he(testCase)}</span>`)
    })

    '+ - * / % = ~ ^ & | && || > < << >> >>> ! += -= *= /= %= == === != !== ^= &= |= >= <= <<= >>= >>>='.split(' ').forEach(prefix => {
      t.equal(h(`x ${prefix} ${testCase}`), `x <span class=o>${he(prefix)}</span> <span class=r>${he(testCase)}</span>`)
    })

    ', ( [ { ; ? : => ...'.split(' ').forEach(prefix => {
      t.equal(h(`${prefix} ${testCase}`), `<span class=p>${he(prefix)}</span> <span class=r>${he(testCase)}</span>`)
    })
  })

  t.end()
})

test('operator', t => {
  '+ - * / % = ~ ^ & | && || > < << >> >>> ! += -= *= /= %= == === != !== ^= &= |= >= <= <<= >>= >>>='.split(' ').forEach(testCase => {
    t.equal(h(testCase), `<span class=o>${he(testCase)}</span>`)
  })

  t.end()
})

test('punctual symbol', t => {
  ', . [ ] { } ( ) ; ? : => ...'.split(' ').forEach(testCase => {
    t.equal(h(testCase), `<span class=p>${he(testCase)}</span>`)
  })

  t.end()
})

test('function name', t => {
  [
    ['f(', '<span class=f>f</span><span class=p>(</span>'],
    ['f (', '<span class=f>f</span> <span class=p>(</span>'],
    ['f\n(', '<span class=f>f</span>\n<span class=p>(</span>']
  ].forEach(testCase => {
    t.equal(h(testCase[0]), testCase[1])
  })

  t.end()
})
