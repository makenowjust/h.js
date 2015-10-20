'use strict'

const test = require('tape')
const inspect = require('util').inspect
const h = require('..')

const he = s => s.replace(/[&<]/g,(s)=>`&#${s.charCodeAt(0)};`)
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

  ;[
    [`.foo //`, `<span class=p>.</span>foo <span class=c>//</span>`],
    [`.foo /* */`, `<span class=p>.</span>foo <span class=c>/* */</span>`],

    [`/*`, `<span class=o>/</span><span class=o>*</span>`],
    [`/* *`, `<span class=o>/</span><span class=o>*</span> <span class=o>*</span>`],
  ].forEach(testCase => {
    highlight(t, testCase[0], testCase[1])
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
      highlight(t, `foo${keyword}`, `foo${he(keyword)}`)
      highlight(t, `${keyword}bar`, `${he(keyword)}bar`)
      highlight(t, `foo${keyword}bar`, `foo${he(keyword)}bar`)
      highlight(t, `.${keyword}(`, `<span class=p>.</span><span class=f>${he(keyword)}</span><span class=p>(</span>`)
      highlight(t, `.foo\n${keyword}`, `<span class=p>.</span>foo\n<span class=k>${he(keyword)}</span>`)
      if (keyword !== 'default') {
        highlight(t, `${keyword} :`, `${he(keyword)} <span class=p>:</span>`)
        highlight(t, `.foo\n${keyword} :`, `<span class=p>.</span>foo\n${he(keyword)} <span class=p>:</span>`)
      }
    })

  t.end()
})

test('number', t => {
  '3 3.14 3.14e10 3.14e-10 0x0123456789abcdefABCDEF 0b0101 0o1234 01234 42. .42'.split(' ').forEach(source => {
    highlight(t, source, `<span class=v>${he(source)}</span>`)
    if (!/\./.test(source)) {
      highlight(t, `foo${source}`, `foo${he(source)}`)
    }
  })

  ;[
    ['42..foo', '<span class=v>42.</span><span class=p>.</span>foo'],
    ['.42.foo', '<span class=v>.42</span><span class=p>.</span>foo'],
  ].forEach(testCase => {
    highlight(t, testCase[0], testCase[1])
  })

  t.end()
})

test('boolean', t => {
  'true false'.split(' ').forEach(source => {
    highlight(t, source, `<span class=v>${he(source)}</span>`)
    highlight(t, `foo${source}`, `foo${he(source)}`)
    highlight(t, `${source}bar`, `${he(source)}bar`)
    highlight(t, `foo${source}bar`, `foo${he(source)}bar`)
  })

  t.end()
})

test('constant', t => {
  'undefined null NaN Infinity'.split(' ').forEach(source => {
    highlight(t, source, `<span class=v>${he(source)}</span>`)
    highlight(t, `foo${source}`, `foo${he(source)}`)
    highlight(t, `${source}bar`, `${he(source)}bar`)
    highlight(t, `foo${source}bar`, `foo${he(source)}bar`)
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
    ['`${te+`${1}`+st}`', '<span class=s>`<span class=p>${</span><span class=i>te<span class=o>+</span><span class=s>`<span class=p>${</span><span class=i><span class=v>1</span></span><span class=p>}</span>`</span><span class=o>+</span>st</span><span class=p>}</span>`</span>'],

    ['`', '<span class=s>`</span>'],
    ['`${', '<span class=s>`<span class=p>${</span><span class=i></span></span>'],
    ['`${1', '<span class=s>`<span class=p>${</span><span class=i><span class=v>1</span></span></span>'],
    ['`${}', '<span class=s>`<span class=p>${</span><span class=i></span><span class=p>}</span></span>'],
    ['`${}s', '<span class=s>`<span class=p>${</span><span class=i></span><span class=p>}</span>s</span>'],
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

test('complex case', t => {
  [
    [`/* It's a FizzBuzz Example */
function isFizz (n) {
  return n % 3 === 0
}
function isBuzz (n) {
  return n % 5 === 0
}
var i // counter
for (i = 1; i <= 100; i++) {
  if (isFizz(i) && isBuzz(i)) {
    console.log('FizzBuzz')
  } else if (isFizz(i)) {
    console.log('Fizz')
  } else if (isBuzz(i)) {
    console.log('Buzz')
  } else {
    console.log(i)
  }
}`, `<span class=c>/* It's a FizzBuzz Example */</span>
<span class=k>function</span> <span class=f>isFizz</span> <span class=p>(</span>n<span class=p>)</span> <span class=p>{</span>
  <span class=k>return</span> n <span class=o>%</span> <span class=v>3</span> <span class=o>===</span> <span class=v>0</span>
<span class=p>}</span>
<span class=k>function</span> <span class=f>isBuzz</span> <span class=p>(</span>n<span class=p>)</span> <span class=p>{</span>
  <span class=k>return</span> n <span class=o>%</span> <span class=v>5</span> <span class=o>===</span> <span class=v>0</span>
<span class=p>}</span>
<span class=k>var</span> i <span class=c>// counter</span>
<span class=k>for</span> <span class=p>(</span>i <span class=o>=</span> <span class=v>1</span><span class=p>;</span> i <span class=o>&#60;=</span> <span class=v>100</span><span class=p>;</span> i<span class=o>++</span><span class=p>)</span> <span class=p>{</span>
  <span class=k>if</span> <span class=p>(</span><span class=f>isFizz</span><span class=p>(</span>i<span class=p>)</span> <span class=o>&#38;&#38;</span> <span class=f>isBuzz</span><span class=p>(</span>i<span class=p>)</span><span class=p>)</span> <span class=p>{</span>
    console<span class=p>.</span><span class=f>log</span><span class=p>(</span><span class=s>'FizzBuzz'</span><span class=p>)</span>
  <span class=p>}</span> <span class=k>else</span> <span class=k>if</span> <span class=p>(</span><span class=f>isFizz</span><span class=p>(</span>i<span class=p>)</span><span class=p>)</span> <span class=p>{</span>
    console<span class=p>.</span><span class=f>log</span><span class=p>(</span><span class=s>'Fizz'</span><span class=p>)</span>
  <span class=p>}</span> <span class=k>else</span> <span class=k>if</span> <span class=p>(</span><span class=f>isBuzz</span><span class=p>(</span>i<span class=p>)</span><span class=p>)</span> <span class=p>{</span>
    console<span class=p>.</span><span class=f>log</span><span class=p>(</span><span class=s>'Buzz'</span><span class=p>)</span>
  <span class=p>}</span> <span class=k>else</span> <span class=p>{</span>
    console<span class=p>.</span><span class=f>log</span><span class=p>(</span>i<span class=p>)</span>
  <span class=p>}</span>
<span class=p>}</span>`],
    [`"/'/".replace(/[/]\\/'/gimuy,'')`, `<span class=s>"/'/"</span><span class=p>.</span><span class=f>replace</span><span class=p>(</span><span class=r>/[/]\\/'/gimuy</span><span class=p>,</span><span class=s>''</span><span class=p>)</span>`],
  ].forEach(testCase => {
    highlight(t, testCase[0], testCase[1])
  })

  t.end()
})
