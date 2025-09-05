const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const path = '/app/data/output.txt';

app.use(cors());

app.get('/api', (req, res) => {
  const now = new Date().toISOString();
  const ip = req.ip;
  const content = `Acceso desde ${ip} a las ${now}\n`;
  fs.appendFileSync(path, content);
  //HOSTNAME se establece automáticamente y contiene el nombre del contenedor
  const pod = process.env.HOSTNAME || 'Pod desconocido';
  res.send(`¡Hola desde el backend Node.js!<br>Pod: <strong>${pod}</strong> - Mensaje guardado.`);
});

app.get('/historial', (req, res) => {
  try {
    const content = fs.readFileSync(path, 'utf8');
    res.type('text/plain').send(content);
  } catch (err) {
    res.status(500).send('No se pudo leer el archivo');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
