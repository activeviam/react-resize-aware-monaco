import React from 'react';
import MonacoEditor from '../src/MonacoEditor.js';

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 500,
      visible: false
    };
    this.toggleWidth = this.toggleWidth.bind(this);
    this.toggleVisible = this.toggleVisible.bind(this);
  }
  toggleWidth() {
    this.setState({width: this.state.width === 500 ? 800 : 500});
  }
  toggleVisible() {
    this.setState({visible: !this.state.visible});
  }
  render() {
    return (
      <div style={{height: '100%'}}>
        <div style={{height: 'calc(100% - 50px)', width: this.state.width, background: 'red', maxWidth:'100%'}}>
          {this.state.visible ? <MonacoEditor 
            theme={{
                key: 'zob',
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
            }}
            options={{
                language: 'javascript',
                value:`
            /* eslint-disable react/prop-types */
            
            const ACTION_KEY = 'reference-currency-switcher';
            const ACTION_TRANSLATION_PATH = 'reference-currency-switcher';
            
            const {plugins, queries, widgets} = ActiveUI.initialize({
              fetchTranslation(locale, defaultFetchTranslation) {
                return defaultFetchTranslation().then(translation => {
                  translation[ACTION_TRANSLATION_PATH] = 'Change reference currency';
                  return translation;
                });
              },
            });
            `}}/> : null}
        </div>
        <div>
          <button onClick={this.toggleWidth}>Toggle Width</button>
          <button onClick={this.toggleVisible}>Toggle Visible</button>
        </div>
      </div>
    )
  }
}

export default Test;
