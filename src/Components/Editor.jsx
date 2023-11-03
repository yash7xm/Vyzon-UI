import React, { useState } from 'react';
import '../assets/Styles/Editor.css'

function Editor() {
    const [code, setCode] = useState('');
    const [_code, _setCode] = useState('');

    const handleContentChange = (e) => {
        const _string = e.target.value;
        let _codeT = _string;
        if (_string === 'let') {
            console.log(_string);
            _codeT = <span style={{ color: 'red' }}>{_string}</span>;
        }

        _setCode(_codeT);
        setCode(_string);
    }

    return (
        <div className="editor">
            <div className="text-area">
                <textarea name="" id="" onChange={handleContentChange} value={code}></textarea>
            </div>
            <div className="para">
                <p>{_code}</p>
            </div>
        </div>
    );
}

export default Editor;

