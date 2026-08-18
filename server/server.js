const cors = require('cors');
const Database = require('better-sqlite3');
const express = require('express');
const server = express();

const PORT = process.env.PORT || 3000;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

const db = new Database('./users.db');

server.get('/', (req, res) => {
  res.json({ message: 'En get-förfrågan till vår server.' });
});

server.get('/users', (req, res) => {
  const users = db.prepare('SELECT * FROM users').all();
  if (!users) {
    res.status(404).json({ message: 'Inga användare hittades.' });
  }
  res.json(users);
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
