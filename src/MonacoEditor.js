import React from 'react';
import ReactResizeDetector from 'react-resize-detector';

import {init} from './monacoProvider.js';
import './darkThemePlus.js';

class MonacoEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            width: 0
        };
        this.onResize = this.onResize.bind(this);
    }
    onResize(width, height) {
        this.setState({height, width});
    }
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
            <div style={{height: '100%', overflow: 'hidden'}}>
                <ReactResizeDetector handleWidth handleHeight onResize={this.onResize.bind(this)}/>
                <div 
                    ref={elt => this.editor = elt}
                    style={{
                        height: this.state.height, 
                        width: this.state.width, 
                        overflow: 'hidden'
                    }} 
                />
            </div>
        );
    }
}

export default MonacoEditor;
