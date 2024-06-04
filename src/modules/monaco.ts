import * as MonacoEditor from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { getElement as $ } from './utilities'

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

MonacoEditor.editor.defineTheme('light', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {}
  })
MonacoEditor.editor.defineTheme('dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {}
})
MonacoEditor.editor.setTheme('light')

interface ContentWidget extends MonacoEditor.editor.IOverlayWidget {
    domNode: HTMLDivElement|null,
}

const htmlLogo: ContentWidget = {
    domNode: null,
    getId: function() {
        return 'html.content.widget';
    },
    getDomNode: function() {
        if (!this.domNode) {
            this.domNode = document.createElement('div');
            this.domNode.innerHTML = '<img width="48px" height="48px" src="/assets/html5.svg" />';
        }
        return this.domNode;
    },
    getPosition: function() {
        return {
            preference: 1
        };
    }
}
const html = MonacoEditor.editor.create($('#html'), {
    value: '',
    language: 'html',
    minimap: {
        enabled: false,
    },
})
html.addOverlayWidget(htmlLogo)

const jsLogo: ContentWidget = {
    domNode: null,
    getId: function() {
        return 'html.content.widget';
    },
    getDomNode: function() {
        if (!this.domNode) {
            this.domNode = document.createElement('div');
            this.domNode.innerHTML = '<img width="48px" height="48px" src="/assets/js.svg" />';
        }
        return this.domNode;
    },
    getPosition: function() {
        return {
            preference: 1
        };
    }
}
const js = MonacoEditor.editor.create($('#js'), {
    value: '',
    language: 'javascript',
    minimap: {
        enabled: false,
    },
})
js.addOverlayWidget(jsLogo)

const cssLogo: ContentWidget = {
    domNode: null,
    getId: function() {
        return 'html.content.widget';
    },
    getDomNode: function() {
        if (!this.domNode) {
            this.domNode = document.createElement('div');
            this.domNode.innerHTML = '<img width="48px" height="48px" src="/assets/css3.svg" />';
        }
        return this.domNode;
    },
    getPosition: function() {
        return {
            preference: 1
        };
    }
}
const css = MonacoEditor.editor.create($('#css'), {
    value: '',
    language: 'css',
    minimap: {
        enabled: false
    }
})
css.addOverlayWidget(cssLogo)

const setTheme = MonacoEditor.editor.setTheme

export {html, js, css, setTheme}