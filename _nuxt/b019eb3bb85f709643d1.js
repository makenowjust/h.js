(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{170:function(n,e,t){"use strict";t.r(e);var l='<section><h1>h.js</h1>\n<blockquote>\n<p><strong>2KB</strong> JavaScript Syntax Highlighter</p>\n</blockquote>\n<p><a href="https://www.npmjs.com/package/h.js"><img src="https://img.shields.io/npm/v/h.js.svg?style=flat-square" alt="Version"></a>\n<a href="https://makenowjust.mit-license.org/2015-2019"><img src="https://img.shields.io/npm/l/h.js.svg?style=flat-square" alt="MIT License"></a>\n<a href="https://github.com/MakeNowJust/sushi-ware"><img src="https://img.shields.io/badge/license-SUSHI--WARE%F0%9F%8D%A3-blue.svg?style=flat-square" alt="SUSHI-WARE License"></a></p>\n<h2>Features</h2>\n<ul>\n<li>It is small. The size is only 2.0KB or 1.4KB if gzipped.</li>\n<li>It needs no other libraries.</li>\n<li>It supports <a href="http://www.ecma-international.org/ecma-262/6.0/">ES2015</a>, <a href="http://www.ecma-international.org/ecma-262/7.0/">ES2016</a>, <a href="http://www.ecma-international.org/ecma-262/8.0/">ES2017</a>, <a href="http://www.ecma-international.org/ecma-262/9.0/">ES2018</a> and <a href="http://www.ecma-international.org/ecma-262/10.0/">ES2019</a> syntax also.</li>\n</ul>\n<h2>Install</h2>\n<p>NPM:</p>\n<pre><code class="language-console"><span class="hljs-meta">$</span><span class="bash"> npm install h.js</span>\n</code></pre>\n<p>Yarn:</p>\n<pre><code class="language-console"><span class="hljs-meta">$</span><span class="bash"> yarn add h.js</span>\n</code></pre>\n<h2>Usage</h2>\n<pre><code><span class=k>const</span> h <span class=o>=</span> <span class=f>require</span><span class=p>(</span><span class=s>"h.js"</span><span class=p>)</span><span class=p>;</span>\n\nconsole<span class=p>.</span><span class=f>log</span><span class=p>(</span><span class=f>h</span><span class=p>(</span><span class=s>"1 + 2"</span><span class=p>)</span><span class=p>)</span><span class=p>;</span>\n<span class=c>// => &#60;span class=v>1&#60;/span> &#60;span class=o>+&#60;/span> &#60;span class=v>2&#60;/span></span>\n</code></pre>\n<h3>API</h3>\n<pre><code><span class=c>/**\n * `h` highlights JavaScript source code.\n *\n * <span class=d>@param</span> {string} source - JavaScript source code\n * <span class=d>@return</span> {string} - highlighted HTML string\n */</span>\n<span class=k>const</span> h <span class=o>=</span> source <span class=p>=></span> <span class=p>...</span>\n</code></pre>\n<p>It returns an HTML string which contains some <code>&lt;span&gt;</code> elements having such classes:</p>\n<ul>\n<li><code>&lt;span class=c&gt;...&lt;/span&gt;</code>: comment</li>\n<li><code>&lt;span class=d&gt;...&lt;/span&gt;</code>: JSDoc tag (only in comment)</li>\n<li><code>&lt;span class=k&gt;...&lt;/span&gt;</code>: keyword</li>\n<li><code>&lt;span class=v&gt;...&lt;/span&gt;</code>: value (number literal, boolean and some constants)</li>\n<li><code>&lt;span class=s&gt;...&lt;/span&gt;</code>: string literal (also means a template string)</li>\n<li><code>&lt;span class=i&gt;...&lt;/span&gt;</code>: interpolation content (only in template string)</li>\n<li><code>&lt;span class=r&gt;...&lt;/span&gt;</code>: regexp literal</li>\n<li><code>&lt;span class=o&gt;...&lt;/span&gt;</code>: operator symbol</li>\n<li><code>&lt;span class=p&gt;...&lt;/span&gt;</code>: punctual symbol</li>\n<li><code>&lt;span class=f&gt;...&lt;/span&gt;</code>: function name</li>\n</ul>\n<h2>License</h2>\n<p>MIT License <a href="https://makenowjust.mit-license.org/2015-2019">https://makenowjust.mit-license.org/2015-2019</a> and SUSHI-WARE License <a href="https://github.com/MakeNowJust/sushi-ware">https://github.com/MakeNowJust/sushi-ware</a></p>\n</section>\n',c="<section>".concat(l.slice(l.indexOf("<h2>Features</h2>"))),o={head:function(){return{title:"README"}},computed:{readme:function(){return c}}},r=t(22),component=Object(r.a)(o,(function(){var n=this.$createElement,e=this._self._c||n;return e("div",{staticClass:"container"},[e("div",{staticClass:"content",domProps:{innerHTML:this._s(this.readme)}})])}),[],!1,null,null,null);e.default=component.exports}}]);