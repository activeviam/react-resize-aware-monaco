import React from 'react';
import ResizeAware from 'react-resize-aware';

import {init} from './monacoProvider.js';
import './darkThemePlus.js';

class MonacoEditor extends React.Component {
    componentDidMount() {
        init.then(monaco => {
            if(this.props.theme) {
                monaco.editor.defineTheme(this.props.theme.key, this.props.theme);
                monaco.editor.setTheme(this.props.theme.key);
            }
            const editor = monaco.editor.create(this.editor, Object.assign({automaticLayout: true}, this.props.options));
            editor.onDidChangeModelContent(event => this.props.onChange ? this.props.onChange(editor.getValue(), event) : null);
        });
    }
    render() {
        return (
            <div 
                ref={elt => this.editor = elt}
                style={{
                    height: this.props.height || 0, 
                    width: this.props.width || 0, 
                    overflow: 'hidden'
                }} 
            />
        );
    }
}

export default props => (
    <ResizeAware style={{height: '100%', width: '100%'}}>
        <MonacoEditor {...props}/>
    </ResizeAware>
);
