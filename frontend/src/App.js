import { useEffect, useState } from 'react';

function App() {
  const [mensaje, setMensaje] = useState('Cargando...');
  const [historial, setHistorial] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api`)
      .then(res => res.text())
      .then(setMensaje)
      .catch(() => setMensaje("Error al conectar con el backend"));
  }, []);

  const cargarHistorial = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/historial`)
      .then(res => res.text())
      .then(setHistorial)
      .catch(() => setHistorial("Error al obtener historial"));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Frontend en React</h1>
      <p dangerouslySetInnerHTML={{ __html: mensaje }} />
      <button onClick={cargarHistorial}>Ver historial de accesos</button>
      <pre>{historial}</pre>
    </div>
  );
}

export default App;
// This is a simple React frontend that fetches data from a Node.js backend.
// It displays a message from the backend and allows the user to view the access history.
// The backend is expected to be running at the URL specified in the REACT_APP_BACKEND_URL environment variable.
// The frontend uses the Fetch API to make requests to the backend and updates the state accordingly.
