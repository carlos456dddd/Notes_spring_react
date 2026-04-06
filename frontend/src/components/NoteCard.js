import React, { useState } from 'react';
import { updateNote, deleteNote } from '../api';
import CategoryManager from './CategoryManager';

export default function NoteCard({ note, onToggle }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.tittle);
  const [content, setContent] = useState(note.content);
  const [showCategories, setShowCategories] = useState(false);

  const handleSave = async () => {
    try {
      await updateNote(note.id, { tittle: title, content, archivead: note.archivead });
      setEditing(false);
      onToggle(note.id);
    } catch (e) {
      console.error('Error al actualizar nota:', e);
      alert('Error al guardar la nota');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Eliminar esta nota?')) {
      try {
        await deleteNote(note.id);
        window.location.reload();
      } catch (e) {
        console.error('Error al eliminar nota:', e);
        alert('Error al eliminar la nota');
      }
    }
  };

  const handleArchive = async () => {
    await onToggle(note.id);
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
      backgroundColor: note.archivead ? '#f5f5f5' : '#fff'
    }}>
      {editing ? (
        <>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ width: '100%', marginBottom: 8, padding: 6, fontSize: 16, fontWeight: 'bold' }}
            placeholder="Título"
          />
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            style={{ width: '100%', minHeight: 80, padding: 6, fontSize: 14 }}
            placeholder="Contenido"
          />
          <div style={{ marginTop: 10 }}>
            <button onClick={handleSave} style={{ marginRight: 8 }}>Guardar</button>
            <button onClick={() => setEditing(false)}>Cancelar</button>
          </div>
        </>
      ) : (
        <>
          <h3 style={{ margin: '0 0 8px 0', color: note.archivead ? '#888' : '#333' }}>
            {note.tittle}
          </h3>
          <p style={{ margin: '0 0 12px 0', color: note.archivead ? '#666' : '#555' }}>
            {note.content}
          </p>
          
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
            <button onClick={() => setEditing(true)} style={{ fontSize: 13 }}>
              Editar
            </button>
            <button onClick={handleArchive} style={{ fontSize: 13 }}>
              {note.archivead ? 'Desarchivar' : 'Archivar'}
            </button>
            <button 
              onClick={() => setShowCategories(!showCategories)} 
              style={{ fontSize: 13, backgroundColor: showCategories ? '#4CAF50' : '#2196F3' }}
            >
              {showCategories ? 'Ocultar categorías' : 'Gestionar categorías'}
            </button>
            <button 
              onClick={handleDelete} 
              style={{ fontSize: 13, backgroundColor: '#f44336' }}
            >
              Eliminar
            </button>
          </div>

          {showCategories && (
            <CategoryManager 
              noteId={note.id} 
              onUpdate={() => console.log('Categorías actualizadas')}
            />
          )}
        </>
      )}
    </div>
  );
}