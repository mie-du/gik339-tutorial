DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  imageUrl TEXT DEFAULT ''
);

INSERT INTO users (firstName, lastName, username, category, imageUrl) VALUES
('Anna', 'Andersson', 'anna_a', 'admin', ''),
('Erik', 'Eriksson', 'erik_e', 'member', ''),
('Maria', 'Johansson', 'maria_j', 'guest', ''),
('Johan', 'Svensson', 'johan_s', 'moderator', ''),
('Lisa', 'Nilsson', 'lisa_n', 'subscribr', ''),
('Karl', 'Lindberg', 'karl_l', 'admin', ''),
('Sara', 'Bergström', 'sara_b', 'member', ''),
('Peter', 'Larsson', 'peter_l', 'guest', ''),
('Emma', 'Karlsson', 'emma_k', 'moderator', ''),
('Magnus', 'Olsson', 'magnus_o', 'subscriber', '');