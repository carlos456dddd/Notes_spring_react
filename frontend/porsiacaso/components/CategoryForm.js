import React, { useState, useEffect } from 'react';
import { getCategories } from '../api';
import axios from 'axios';

export default function CategoryForm({ onCategoryChange }) {
  const [nombre, setNombre] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (e) {
      console.error('Error al cargar categorías:', e);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      alert('El nombre de la categoría es requerido');
      return;
    }

    setLoading(true);
    try {
      const uid = localStorage.getItem('uid');
      await axios.post('http://localhost:8080/api/category', 
        { nombre: nombre.trim() },
        { headers: { 'X-User-Id': uid, 'Content-Type': 'application/json' } }
      );
      
      setNombre('');
      await loadCategories();
      
      // Notificar al componente padre que las categorías cambiaron
      if (onCategoryChange) {
        onCategoryChange();
      }
      
      alert('Categoría creada exitosamente');
    } catch (e) {
      console.error('Error al crear categoría:', e);
      alert('Error al crear la categoría: ' + (e.response?.data?.message || e.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta categoría?')) return;

    try {
      const uid = localStorage.getItem('uid');
      await axios.delete(`http://localhost:8080/api/category/${id}`, {
        headers: { 'X-User-Id': uid }
      });
      
      await loadCategories();
      
      // Notificar al componente padre que las categorías cambiaron
      if (onCategoryChange) {
        onCategoryChange();
      }
      
      alert('Categoría eliminada exitosamente');
    } catch (e) {
      console.error('Error al eliminar categoría:', e);
      alert('Error al eliminar la categoría: ' + (e.response?.data?.message || e.message));
    }
  };

  return (
    <div style={{ 
      border: '1px solid #ddd', 
      borderRadius: 8, 
      padding: 16, 
      marginBottom: 20,
      backgroundColor: '#f9f9f9'
    }}>
      <h3 style={{ marginTop: 0 }}>Gestionar Categorías</h3>
      
      <form onSubmit={handleCreate} style={{ marginBottom: 16 }}>
        <input
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Nombre de la categoría"
          disabled={loading}
          style={{ 
            padding: 8, 
            marginRight: 8, 
            minWidth: 200,
            border: '1px solid #ccc',
            borderRadius: 4
          }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear categoría'}
        </button>
      </form>

      <div>
        <h4 style={{ marginBottom: 10 }}>Categorías existentes:</h4>
        {categories.length === 0 ? (
          <p style={{ color: '#777', fontSize: 14 }}>No hay categorías creadas.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {categories.map(cat => (
              <li 
                key={cat.id} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  marginBottom: 8,
                  backgroundColor: '#fff',
                  borderRadius: 4,
                  border: '1px solid #e0e0e0'
                }}
              >
                <span style={{ fontWeight: 500 }}>{cat.nombre}</span>
                <button 
                  onClick={() => handleDelete(cat.id)}
                  style={{ 
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '4px 12px',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontSize: 12
                  }}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}