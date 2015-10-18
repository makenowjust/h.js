'use strict'

const test = require('tape')
const inspect = require('util').inspect
const h = require('..')

const he = s => s.replace(/[&<>"']/g,(s)=>`&#${s.charCodeAt(0)};`)
const highlight = (t, source, expect) => {
  t.equal(h(source), expect, `${inspect(source)} should be highlighted as ${inspect(expect)}`)
}

test('comment', t => {
  [
    `//`,
    `/**/`,
    `// This is a comment`,
    `/* These
      * Lines
      * are
      * Comments
      */`,
  ].forEach(source => {
    highlight(t, source, `<span class=c>${he(source)}</span>`)
  })

  t.end()
})

test('document comment', t => {
  [
    ['// @test', '<span class=c>// <span class=d>@test</span></span>'],
    ['/* @test */', '<span class=c>/* <span class=d>@test</span> */</span>'],
  ].forEach(testCase => {
    highlight(t, testCase[0], testCase[1])
  })

  t.end()
})

test('keyword', t => {
  'break catch class const continue default do else finally function for from if import let static super switch this try var while with case delete export extends in instanceof of new return throw typeof void yield'
    .split(' ')
    .forEach(keyword => {
      highlight(t, keyword, `<span class=k>${he(keyword)}</span>`)
      highlight(t, `.${keyword}`, `<span class=p>.</span>${he(keyword)}`)
      highlight(t, `.${keyword}(`, `<span class=p>.</span><span class=f>${he(keyword)}</span><span class=p>(</span>`)
      highlight(t, `.foo\n${keyword}`, `<span class=p>.</span>foo\n<span class=k>${he(keyword)}</span>`)
      if (keyword !== 'default') {
        highlight(t, `${keyword} :`, `${he(keyword)} <span class=p>:</span>`)
      }
    })

  t.end()
})

test('number', t => {
  '3 3.14 3.14e10 3.14e-10 0x0123456789abcdefABCDEF 0b0101 0o1234 01234'.split(' ').forEach(source => {
    highlight(t, source, `<span class=v>${he(source)}</span>`)
  })

  t.end()
})

test('boolean', t => {
  'true false'.split(' ').forEach(source => {
    highlight(t, source, `<span class=v>${he(source)}</span>`)
  })

  t.end()
})

test('constant', t => {
  'undefined null NaN Infinity'.split(' ').forEach(source => {
    highlight(t, source, `<span class=v>${he(source)}</span>`)
  })

  t.end()
})

test('string', t => {
  [
    `''`,
    `""`,
    `'string'`,
    `"string"`,
    `'\\''`,
    `"\\""`,
  ].forEach(source => {
    highlight(t, source, `<span class=s>${he(source)}</span>`)
  })

  t.end()
})

test('template literal', t => {
  [
    '``',
    '`template literal`',
    '`\\``',
    '`\\${`',
  ].forEach(source => {
    highlight(t, source, `<span class=s>${he(source)}</span>`)
  })

  ;[
    ['`${}`', '<span class=s>`<span class=p>${</span><span class=i></span><span class=p>}</span>`</span>'],
    ['`${1}`', '<span class=s>`<span class=p>${</span><span class=i><span class=v>1</span></span><span class=p>}</span>`</span>'],
    ['`${{}}`', '<span class=s>`<span class=p>${</span><span class=i><span class=p>{</span><span class=p>}</span></span><span class=p>}</span>`</span>'],
    ['`${`${}`}`', '<span class=s>`<span class=p>${</span><span class=i><span class=s>`<span class=p>${</span><span class=i></span><span class=p>}</span>`</span></span><span class=p>}</span>`</span>'],
    ['`${`${1}`}`', '<span class=s>`<span class=p>${</span><span class=i><span class=s>`<span class=p>${</span><span class=i><span class=v>1</span></span><span class=p>}</span>`</span></span><span class=p>}</span>`</span>'],
  ].forEach(testCase => {
    highlight(t, testCase[0], testCase[1])
  })

  t.end()
})

test('regexp', t => {
  [
    '/regexp/',
    '/regexp/imguy',
    '/regular expression/',
    '/\\//',
    '/[/]/',
  ].forEach(regexp => {
    highlight(t, regexp, `<span class=r>${he(regexp)}</span>`)

    'case delete export extends in instanceof of new return throw typeof void yield'.split(' ').forEach(keyword => {
      highlight(t, `${keyword} ${regexp}`, `<span class=k>${he(keyword)}</span> <span class=r>${he(regexp)}</span>`)
    })

    '+ - * / % = ~ ^ & | && || > < << >> >>> ! += -= *= /= %= == === != !== ^= &= |= >= <= <<= >>= >>>='.split(' ').forEach(operator => {
      highlight(t, `x ${operator} ${regexp}`, `x <span class=o>${he(operator)}</span> <span class=r>${he(regexp)}</span>`)
    })

    ', ( [ { ; ? : => ...'.split(' ').forEach(punctual => {
      highlight(t, `${punctual} ${regexp}`, `<span class=p>${he(punctual)}</span> <span class=r>${he(regexp)}</span>`)
    })
  })

  t.end()
})

test('operator', t => {
  '+ - * / % = ~ ^ & | && || > < << >> >>> ! += -= *= /= %= == === != !== ^= &= |= >= <= <<= >>= >>>='.split(' ').forEach(source => {
    highlight(t, source, `<span class=o>${he(source)}</span>`)
  })

  t.end()
})

test('punctual symbol', t => {
  ', . [ ] { } ( ) ; ? : => ...'.split(' ').forEach(source => {
    highlight(t, source, `<span class=p>${he(source)}</span>`)
  })

  t.end()
})

test('function name', t => {
  [
    ['f(', '<span class=f>f</span><span class=p>(</span>'],
    ['f (', '<span class=f>f</span> <span class=p>(</span>'],
    ['f\n(', '<span class=f>f</span>\n<span class=p>(</span>'],
  ].forEach(testCase => {
    highlight(t, testCase[0], testCase[1])
  })

  t.end()
})
