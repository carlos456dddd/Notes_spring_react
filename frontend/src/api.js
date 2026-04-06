import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' }
});

/* ----------  login  ---------- */
export const login = (username, password) =>
  api.post('/login', { username, password })
     .then(res => {
       const uid = res.headers['x-user-id'];
       api.defaults.headers.common['X-User-Id'] = uid; 
       localStorage.setItem('uid', uid);
       return uid;
     });

/* ----------  notas  ---------- */
export const getActiveNotes = () =>
  api.get('/notes/archived', { params: { archived: false } })
     .then(res => res.data);   // ← ¡array!

export const getArchivedNotes = () =>
  api.get('/notes/archived', { params: { archived: true } })
     .then(res => res.data);   // ← ¡array!

export const getAllNotes = async () => {
  const [a, b] = await Promise.all([
    getActiveNotes(),
    getArchivedNotes()
  ]);
  return [...a, ...b];          // ← ¡array!
};
export const createNote   = (note)     => api.post('/notes', note);
export const updateNote   = (id, note) => api.put(`/notes/${id}`, note);
export const deleteNote   = (id)       => api.delete(`/notes/${id}`);
export const archiveNotes = (ids, opt) => api.patch('/notes/archived', { id: ids, option: opt });

export const getCategories      = () => api.get('/category');               
export const getNotesByCategory = id => api.get(`/category/${id}`);        
export const addNotesToCategory    = (catId, noteIds) => api.put(`/category/add/${catId}`, { ids_notes: noteIds });     
export const removeNotesFromCategory = (catId, noteIds) => api.put(`/category/delete/${catId}`, { ids_notes: noteIds }); 
export const addNoteToCategory    = (catId, noteId) => api.put(`/category/${catId}/notes/${noteId}`);                   
export const removeNoteFromCategory = (catId, noteId) => api.delete(`/category/${catId}/notes/${noteId}`);           



/* ----------  utilidad  ---------- */
export const setUserId = id => {
  api.defaults.headers.common['X-User-Id'] = id;
};

export const apio = axios;  