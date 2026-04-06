import React, { useState, useEffect } from 'react';
import { login, setUserId } from './api';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import CategoryForm from './components/CategoryForm';

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [refreshCategories, setRefreshCategories] = useState(0);

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    if (uid) {
      setUserId(uid);
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const uid = await login(username, password);
      if (uid) {
        setAuthenticated(true);
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('uid');
    setAuthenticated(false);
    window.location.reload();
  };

  // Función para refrescar las categorías en ambos componentes
  const handleCategoryChange = () => {
    setRefreshCategories(prev => prev + 1);
  };

  if (!authenticated) {
    return (
      <div style={{ 
        maxWidth: 400, 
        margin: '100px auto', 
        padding: 20,
        border: '1px solid #ddd',
        borderRadius: 8,
        backgroundColor: '#fff'
      }}>
        <h2 style={{ textAlign: 'center' }}>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 12 }}>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Usuario"
              required
              style={{ width: '100%', padding: 10, fontSize: 14 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              style={{ width: '100%', padding: 10, fontSize: 14 }}
            />
          </div>
          <button 
            type="submit" 
            style={{ width: '100%', padding: 10, fontSize: 16 }}
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 16,
        borderBottom: '2px solid #ddd'
      }}>
        <h1 style={{ margin: 0 }}>📝 Mis Notas</h1>
        <button onClick={handleLogout} style={{ backgroundColor: '#f44336' }}>
          Cerrar Sesión
        </button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <button 
          onClick={() => setShowCategories(!showCategories)}
          style={{ 
            marginBottom: 12,
            backgroundColor: showCategories ? '#4CAF50' : '#2196F3',
            padding: '10px 16px'
          }}
        >
          {showCategories ? 'Ocultar gestión de categorías' : 'Gestionar categorías'}
        </button>
        
        {showCategories && <CategoryForm onCategoryChange={handleCategoryChange} />}
      </div>

      <div style={{ 
        marginBottom: 30,
        padding: 16,
        border: '1px solid #ddd',
        borderRadius: 8,
        backgroundColor: '#fff'
      }}>
        <h2 style={{ marginTop: 0 }}>Crear nueva nota</h2>
        <NoteForm />
      </div>

      <div>
        <h2>Listado de Notas</h2>
        <NoteList refreshTrigger={refreshCategories} />
      </div>
    </div>
  );
}