import React, { useState } from 'react';
import { login, setUserId } from '../api';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const uid = await login(username, password);
      setUserId(uid);
      onLogin(uid);
    } catch {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div style={styles.card}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <p style={styles.error}>{error}</p>}
        <button style={styles.button}>Entrar</button>
      </form>
    </div>
  );
}


const styles = {
  card: { width: 320, margin: '80px auto', padding: 25, border: '1px solid #ccc', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,.1)' },
  input: { display: 'block', width: '100%', marginBottom: 12, padding: '8px 10px', border: '1px solid #bbb', borderRadius: 4, fontSize: 14 },
  button: { width: '100%', padding: 10, background: '#026aa7', color: '#fff', border: 'none', borderRadius: 4, fontSize: 16, cursor: 'pointer' },
  error:  { color: 'red', fontSize: 13, marginBottom: 10 }
};