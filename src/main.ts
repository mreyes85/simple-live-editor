import './style.css'
import {encode, decode} from 'js-base64'
import './modules/splitter'
import { html as htmlEl, js as jsEl, css as cssEl } from './modules/monaco'
import './modules/dark'
import { getElement as $ } from './modules/utilities'

const HASH_SEPARATOR = '|'

function init(){
  const hash = decodeURI(window.location.pathname.substring(1))
  const [html, css, js] = hash.split(HASH_SEPARATOR)

  if (html) htmlEl.setValue(decode(html))
  if (js) jsEl.setValue(decode(js))
  if (css) cssEl.setValue(decode(css))
  update()
}

function update(){
  const html = htmlEl.getValue()
  const js = jsEl.getValue()
  const css = cssEl.getValue()

  const hashedCode = `${encode(html)}${HASH_SEPARATOR}${encode(css)}${HASH_SEPARATOR}${encode(js)}`
  try {
    window.history.replaceState(null, '', `/${hashedCode}`)
  } catch (e) {}

  const result = createHtml({html, js, css})
  $('#result').setAttribute('srcdoc', result)
}

htmlEl.onDidChangeModelContent(update)
jsEl.onDidChangeModelContent(update)
cssEl.onDidChangeModelContent(update)

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