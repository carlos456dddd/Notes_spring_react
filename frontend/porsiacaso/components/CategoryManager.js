import React, { useEffect, useState } from 'react';
import { getCategories, addNoteToCategory, removeNoteFromCategory } from '../api';

export default function CategoryManager({ noteId, onUpdate }) {
  const [cats, setCats] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, [noteId]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await getCategories();
      const allCats = res.data;
      setCats(allCats);

      const assignedCats = allCats
        .filter(cat => cat.noteIds && cat.noteIds.includes(noteId))
        .map(cat => cat.id);
      
      setSelected(assignedCats);
    } catch (e) {
      console.error('Error al cargar categorías:', e);
    } finally {
      setLoading(false);
    }
  };

  const toggle = async (catId) => {
    const isAdding = !selected.includes(catId);
    
    try {
      if (isAdding) {
        await addNoteToCategory(catId, noteId);
        setSelected(prev => [...prev, catId]);
      } else {
        await removeNoteFromCategory(catId, noteId);
        setSelected(prev => prev.filter(id => id !== catId));
      }
      
      if (onUpdate) onUpdate();
    } catch (e) {
      console.error('Error al cambiar categoría:', e);
      alert('Error al cambiar la categoría. Intenta nuevamente.');
    }
  };

  if (loading) {
    return <div style={{ marginTop: 10, color: '#777' }}>Cargando categorías...</div>;
  }

  return (
    <div style={{ marginTop: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 4 }}>
      <b>Categorías:</b>
      {cats.length === 0 ? (
        <p style={{ color: '#777', fontSize: 14, margin: '8px 0' }}>
          No tienes categorías. Crea una primero.
        </p>
      ) : (
        <div style={{ marginTop: 8 }}>
          {cats.map(c => (
            <label 
              key={c.id} 
              style={{ 
                display: 'block', 
                margin: '6px 0',
                cursor: 'pointer',
                padding: '4px 0'
              }}
            >
              <input 
                type="checkbox" 
                checked={selected.includes(c.id)} 
                onChange={() => toggle(c.id)}
                style={{ marginRight: 6, cursor: 'pointer' }}
              />
              <span style={{ fontSize: 14 }}>{c.nombre}</span>
            </label>
          ))}
          {selected.length === 0 && (
            <p style={{ color: '#999', fontSize: 12, fontStyle: 'italic', marginTop: 8 }}>
              Esta nota no tiene categorías asignadas.
            </p>
          )}
        </div>
      )}
    </div>
  );
}