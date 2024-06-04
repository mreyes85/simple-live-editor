import Split from 'split-grid'
import { getElement as $ } from './utilities'
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api'
const vGutterElement = $('.vertical-gutter')
const hGutterElement = $('.horizontal-gutter')

export const initSplitter = () => {
    const splitter = Split({
        columnGutters: [
            {
            track: 1,
            element: vGutterElement
            }
        ],
        rowGutters: [
            {
            track: 1,
            element: hGutterElement
            }
        ]
    })
    return splitter
}

// () => {
//     htmlEditor.layout({height:0, width:0})
//     jsEditor.layout({height:0, width:0})
//     cssEditor.layout({height:0, width:0})
//   }, () => {
//     const htmlRect = htmlElement.getBoundingClientRect()
//     htmlEditor.layout({height: htmlRect.height, width: htmlRect.width})
//     const jsRect = jsElement.getBoundingClientRect()
//     jsEditor.layout({height: jsRect.height, width: jsRect.width})
//     const cssRect = cssElement.getBoundingClientRect()
//     cssEditor.layout({height: cssRect.height, width: cssRect.width})
//   }

type ResizeElement = {
    resize: editor.IStandaloneCodeEditor
    from: HTMLElement
}

const resizeHandler = (elements: ResizeElement[]) => {
    return function (_: MouseEvent) {
        for (const element of elements) element.resize.layout({width: 0, height: 0})
        
        document.onmouseup = function (_: MouseEvent) {
            for (const element of elements) {
                const rect = element.from.getBoundingClientRect()
                element.resize.layout({width: rect.width, height: rect.height})
            }
            document.onmouseup = null
        }
    }
}

export const setResizer = (elements: ResizeElement[]) => {
    vGutterElement.onmousedown = resizeHandler(elements)
    vGutterElement.ondragstart = function() { return false }
    hGutterElement.onmousedown = resizeHandler(elements)
    hGutterElement.ondragstart = function() { return false }
    if(vGutterElement.parentElement) vGutterElement.parentElement.ondragstart = function() { return false }
}