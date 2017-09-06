# react-resize-aware-monaco

react-resize-aware-monaco exposes Microsoft's [Monaco Editor](https://github.com/Microsoft/monaco-editor) as a React Component.

### Installation
Add react-monaco to your dependencies:

```bash
npm install react-resize-aware-monaco --save-dev
```

Add the following to your Webpack config:

```javascript
{
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'node_modules/monaco-editor/min/vs',
        to: 'vs'
      }
    ])
  ]
}
```

### Usage

```javascript
import MonacoEditor from 'react-resize-aware-monaco';

const myComponent = props => (
    <MonacoEditor
        options={}
        onChange={}
        theme={}
    />
)
```

### Properties

* Options : Object, default : `{automaticLayout: true}`
    * It is the second argument that you would have given monaco.editor.create (see [playground](https://microsoft.github.io/monaco-editor/playground.html#creating-the-editor-editor-basic-options))
    * Please note that your can use `vs-dark-plus-kinda` for the theme. The corresponding theme looks like VS Code's dark-plus.
* onChange : Function, default : noop
    * The component's value is uncontrolled but you can use this property to get called back when it changes.
* theme : Object, default : undefined
    * It is the second argument that you would have given monaco.editor.defineTheme (see [playground](https://microsoft.github.io/monaco-editor/playground.html#customizing-the-appearence-exposed-colors)) with a key attribute which would have been the first argument to provide to said method.
