import {init} from './monacoProvider.js';

init.then(monaco => {
    monaco.editor.defineTheme('vs-dark-plus-kinda', {
        base: 'vs-dark', // can also be vs-dark or hc-black
        inherit: true, // can also be false to completely replace the builtin rules
        rules: [{background: '242629', foreground: '9cdcfe'}],
        colors: {
          'editor.background': '#242629',
          'editor.lineHighlightBackground': '#2f3237',
          'editorLineNumber.foreground': '#008800',
          'editor.inactiveSelectionBackground': '#3b3f44',
          'editorLineNumber.foreground': '#60656c'
        },
      });
});
