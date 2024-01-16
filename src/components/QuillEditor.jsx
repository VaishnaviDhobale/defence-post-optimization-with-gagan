// QuillEditor.js
import React, { useState, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const QuillEditor = ({ onSave }) => {
  const [quill, setQuill] = useState(null);

  useEffect(() => {
    const editor = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          ['link', 'image'],
          ['clean']
        ],
      },
    });

    setQuill(editor);

    // Cleanup on unmount
    return () => {
      editor.removeAllListeners();
      editor.clipboard.dangerouslyPasteHTML('');
      editor.destroy();
    };
  }, []);

  const handleSave = () => {
    const content = quill.root.innerHTML;
    onSave(content);
  };

  return (
    <div>
      <h1>Blog Editor</h1>
      <div id="editor" style={{ height: '400px' }} />
      <button onClick={handleSave}>Save Post</button>
    </div>
  );
};

export default QuillEditor;
