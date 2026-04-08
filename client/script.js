/* Exempeldata, en array av användare (minimera gärna) */
const users = [
  {
    id: 1,
    firstName: 'Anna',
    lastName: 'Andersson',
    username: 'anna_a',
    category: 'admin',
    imageUrl: ''
  },
  {
    id: 2,
    firstName: 'Erik',
    lastName: 'Eriksson',
    username: 'erik_e',
    category: 'member',
    imageUrl: ''
  },
  {
    id: 3,
    firstName: 'Maria',
    lastName: 'Johansson',
    username: 'maria_j',
    category: 'guest',
    imageUrl: ''
  },
  {
    id: 4,
    firstName: 'Johan',
    lastName: 'Svensson',
    username: 'johan_s',
    category: 'moderator',
    imageUrl: ''
  },
  {
    id: 5,
    firstName: 'Lisa',
    lastName: 'Nilsson',
    username: 'lisa_n',
    category: 'subscriber',
    imageUrl: ''
  },
  {
    id: 6,
    firstName: 'Karl',
    lastName: 'Lindberg',
    username: 'karl_l',
    category: 'admin',
    imageUrl: ''
  },
  {
    id: 7,
    firstName: 'Sara',
    lastName: 'Bergström',
    username: 'sara_b',
    category: 'member',
    imageUrl: ''
  },
  {
    id: 8,
    firstName: 'Peter',
    lastName: 'Larsson',
    username: 'peter_l',
    category: 'guest',
    imageUrl: ''
  },
  {
    id: 9,
    firstName: 'Emma',
    lastName: 'Karlsson',
    username: 'emma_k',
    category: 'moderator',
    imageUrl: ''
  },
  {
    id: 10,
    firstName: 'Magnus',
    lastName: 'Olsson',
    username: 'magnus_o',
    category: 'subscriber',
    imageUrl: ''
  }
];

/* Stödfunktion för framtida funktionalitet */
function getInitials(user) {
  return `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase();
}
/* *** Nedan skriver vi resten av koden. *** */
