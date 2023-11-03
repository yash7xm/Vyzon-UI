import React, { useState } from 'react';
import '../assets/Styles/Editor.css'
import { Color } from '../assets/Helper/Color';

const color = new Color();

function Editor() {
    const [code, setCode] = useState('');
    const [_code, _setCode] = useState('');

    const handleContentChange = (e) => {
        let _string = e.target.value;
        color.init(_string);
        console.log(color.getColor());
        _setCode(color.getColor());
        setCode(_string);
    }

    return (
        <div className="editor">
            <div className="text-area">
                <textarea name="" id="" onChange={handleContentChange} value={code}></textarea>
            </div>
            <div className="para">
                <p dangerouslySetInnerHTML={{ __html: _code }}></p>
            </div>
        </div>
    );
}

export default Editor;

