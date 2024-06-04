import './style.css'
import {encode, decode} from 'js-base64'
import { initSplitter, setResizer } from './modules/splitter'
import { html as htmlEditor, js as jsEditor, css as cssEditor, htmlElement, jsElement, cssElement } from './modules/monaco'
import './modules/dark'
import { getElement as $ } from './modules/utilities'

const HASH_SEPARATOR = '|'

function init(){
  initSplitter()
  setResizer([
    { resize: htmlEditor, from: htmlElement },
    { resize: jsEditor, from: jsElement },
    { resize: cssEditor, from: cssElement },
  ])
  const hash = decodeURI(window.location.pathname.substring(1))
  const [html, css, js] = hash.split(HASH_SEPARATOR)

  if (html) htmlEditor.setValue(decode(html))
  if (js) jsEditor.setValue(decode(js))
  if (css) cssEditor.setValue(decode(css))
  update()
}

function update(){
  const html = htmlEditor.getValue()
  const js = jsEditor.getValue()
  const css = cssEditor.getValue()

  const hashedCode = `${encode(html)}${HASH_SEPARATOR}${encode(css)}${HASH_SEPARATOR}${encode(js)}`
  try {
    window.history.replaceState(null, '', `/${hashedCode}`)
  } catch (e) {}

  const result = createHtml({html, js, css})
  $('#result').setAttribute('srcdoc', result)
}

htmlEditor.onDidChangeModelContent(update)
jsEditor.onDidChangeModelContent(update)
cssEditor.onDidChangeModelContent(update)

function createHtml({html, js, css}: {html: string, js: string, css: string}){
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${css}</style>
  </head>
  <body>
      ${html}
      <script>${js}</script>
  </body>
  </html>
  `
}

init()