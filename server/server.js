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

server.post('/users', (req, res) => {
  const { firstName, lastName, username, category, imageUrl } = req.body;

  const preparedSQL = db.prepare(
    'INSERT INTO users (firstName, lastName, username, category, imageUrl) VALUES (?, ?, ?, ?, ?)'
  );

  const { lastInsertRowid } = preparedSQL.run(
    firstName,
    lastName,
    username,
    category,
    imageUrl
  );

  const newUser = {
    id: lastInsertRowid,
    firstName,
    lastName,
    username,
    category,
    imageUrl
  };

  res.status(201).json(newUser);
});

server.put('/users/:id', (req, res) => {
  const { firstName, lastName, username, category, imageUrl } = req.body;
  const { id } = req.params;

  const preparedSQL = db.prepare(
    'UPDATE users SET firstName = ?, lastName = ?, username = ?, category = ?, imageUrl = ? WHERE id = ?'
  );

  preparedSQL.run(firstName, lastName, username, category, imageUrl, id);
  res.status(200).json({ message: 'Användaren uppdaterades' });
});

server.delete('/users/:id', (req, res) => {
  const preparedSQL = db.prepare('DELETE FROM users WHERE id = ?');
  preparedSQL(req.params.id);
  res.status(200).json({ message: 'Användaren togs bort' });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
