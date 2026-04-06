    import React, { useState } from 'react';
    import { createNote } from '../api';

    export default function NoteForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSave = async e => {
        e.preventDefault();
        await createNote({ tittle: title, content, archivead: false });
        setTitle(''); setContent('');
        window.location.reload();  
    };

    return (
        <form onSubmit={handleSave}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" required />
        <br />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Contenido" required />
        <br />
        <button type="submit">Crear nota</button>
        </form>
    );
    }