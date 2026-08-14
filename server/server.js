const express = require('express');
const server = express();

const PORT = process.env.PORT || 3000;

server.get('/', (req, res) => {
  res.json({ message: 'En get-förfrågan till vår server.' });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
