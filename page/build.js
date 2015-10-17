'use strict'

/*
 * Dependencies
 */

const h = require('../h.js')

const path = require('path')
const fs = require('fs')
// Template
const mustache = require('mustache')
const beautify = require('js-beautify')
// Markdown
const mdast = require('mdast')
const html = require('mdast-html')
const highlight = require('./mdast-h.js')
const stripBadges = require('mdast-strip-badges')
const squeezeParagraphs = require('mdast-squeeze-paragraphs')

/*
 * Constants
 */

const BUILD_DIR = 'build'
const PROJECT_DIR = '..'

/*
 * Utility function
 */

// convert from markdown to html
function markdown(markdown) {
  return mdast()
    .use([stripBadges, squeezeParagraphs, highlight, html])
    .process(markdown)
}

/*
 * Build index.html
 */

const indexHtml = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
const readme = fs.readFileSync(path.resolve(__dirname, PROJECT_DIR, 'README.md'), 'utf-8')
const hjs = fs.readFileSync(path.resolve(__dirname, PROJECT_DIR, 'h.js'), 'utf-8')

const buildIndexHtml = beautify.html(mustache.render(indexHtml, {
  readme: markdown(readme),
  h_js: h(hjs)
}))

/*
 * Copy index.html and h.js
 */

fs.writeFileSync(path.resolve(__dirname, BUILD_DIR, 'index.html'), buildIndexHtml)
fs.writeFileSync(path.resolve(__dirname, BUILD_DIR, 'js', 'h.js'), hjs)
