import React, { useEffect, useState } from 'react';
import { getAllNotes, getActiveNotes, getArchivedNotes, archiveNotes, getCategories, getNotesByCategory } from '../api';
import NoteCard from './NoteCard';

export default function NoteList({ refreshTrigger }) {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [cats, setCats] = useState([]);
  const [catId, setCatId] = useState('');
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCats(res.data);
    } catch (e) {
      console.error('Error al cargar categorías:', e);
      setCats([]);
    }
  };

  const loadFiltered = async (type) => {
    setLoading(true);
    setFilter(type);
    setCatId('');
    
    try {
      let data = [];
      if (type === 'ALL') data = await getAllNotes();
      if (type === 'ACTIVE') data = await getActiveNotes();
      if (type === 'ARCHIVED') data = await getArchivedNotes();
      setNotes(data);
    } catch (e) {
      console.error('Error al cargar notas:', e);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const loadByCategory = async (id) => {
    if (!id) {
      loadFiltered('ALL');
      return;
    }
    
    setLoading(true);
    setCatId(id);
    
    try {
      const res = await getNotesByCategory(id);
      setNotes(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error('Error al cargar notas por categoría:', e);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id) => {
    const note = notes.find(x => x.id === id);
    if (!note) return;

    try {
      await archiveNotes([id], !note.archivead);
      
      if (catId) {
        await loadByCategory(catId);
      } else {
        await loadFiltered(filter);
      }
    } catch (e) {
      console.error('Error al cambiar estado de nota:', e);
      alert('Error al cambiar el estado de la nota');
    }
  };

  // Cargar categorías inicialmente
  useEffect(() => {
    loadFiltered('ALL');
    loadCategories();
  }, []);

  // Recargar categorías cuando refreshTrigger cambia
  useEffect(() => {
    if (refreshTrigger > 0) {
      loadCategories();
    }
  }, [refreshTrigger]);

  return (
    <>
      <div style={{ 
        marginBottom: 16, 
        padding: 12,
        backgroundColor: '#f5f5f5',
        borderRadius: 6,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center'
      }}>
        <label style={{ fontWeight: 500, marginRight: 8 }}>
          Filtrar por categoría:
        </label>
        <select 
          value={catId} 
          onChange={e => loadByCategory(e.target.value)}
          style={{ 
            padding: '6px 12px',
            borderRadius: 4,
            border: '1px solid #ccc',
            fontSize: 14
          }}
        >
          <option value="">Todas las categorías</option>
          {cats.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>

        <div style={{ 
          borderLeft: '1px solid #ccc',
          paddingLeft: 12,
          marginLeft: 8,
          display: 'flex',
          gap: 8
        }}>
          <button 
            onClick={() => loadFiltered('ALL')}
            style={{ 
              padding: '6px 12px',
              backgroundColor: filter === 'ALL' && !catId ? '#4CAF50' : '#ddd',
              color: filter === 'ALL' && !catId ? 'white' : '#333'
            }}
          >
            Todas
          </button>
          <button 
            onClick={() => loadFiltered('ACTIVE')}
            style={{ 
              padding: '6px 12px',
              backgroundColor: filter === 'ACTIVE' ? '#4CAF50' : '#ddd',
              color: filter === 'ACTIVE' ? 'white' : '#333'
            }}
          >
            Activas
          </button>
          <button 
            onClick={() => loadFiltered('ARCHIVED')}
            style={{ 
              padding: '6px 12px',
              backgroundColor: filter === 'ARCHIVED' ? '#4CAF50' : '#ddd',
              color: filter === 'ARCHIVED' ? 'white' : '#333'
            }}
          >
            Archivadas
          </button>
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#777', padding: 20 }}>
          Cargando notas...
        </p>
      ) : notes.length === 0 ? (
        <p style={{ 
          color: '#777', 
          fontSize: 14,
          textAlign: 'center',
          padding: 20,
          backgroundColor: '#f9f9f9',
          borderRadius: 8
        }}>
          {catId ? 'No hay notas en esta categoría.' :
           filter === 'ACTIVE' ? 'No hay notas activas.' :
           filter === 'ARCHIVED' ? 'No hay notas archivadas.' :
           'No hay notas. ¡Crea tu primera nota!'}
        </p>
      ) : (
        notes.map(n => (
          <NoteCard 
            key={n.id} 
            note={n} 
            onToggle={handleToggle} 
          />
        ))
      )}
    </>
  );
}