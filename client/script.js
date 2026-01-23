const users = [
  { id: 1, firstName: 'Anna', lastName: 'Andersson', username: 'anna_a', category: 'admin', imageUrl: '' },
  { id: 2, firstName: 'Erik', lastName: 'Eriksson', username: 'erik_e', category: 'member', imageUrl: '' },
  { id: 3, firstName: 'Maria', lastName: 'Johansson', username: 'maria_j', category: 'guest', imageUrl: '' },
  { id: 4, firstName: 'Johan', lastName: 'Svensson', username: 'johan_s', category: 'moderator', imageUrl: '' },
  { id: 5, firstName: 'Lisa', lastName: 'Nilsson', username: 'lisa_n', category: 'subscriber', imageUrl: '' },
  { id: 6, firstName: 'Karl', lastName: 'Lindberg', username: 'karl_l', category: 'admin', imageUrl: '' },
  { id: 7, firstName: 'Sara', lastName: 'Bergström', username: 'sara_b', category: 'member', imageUrl: '' },
  { id: 8, firstName: 'Peter', lastName: 'Larsson', username: 'peter_l', category: 'guest', imageUrl: '' },
  { id: 9, firstName: 'Emma', lastName: 'Karlsson', username: 'emma_k', category: 'moderator', imageUrl: '' },
  { id: 10, firstName: 'Magnus', lastName: 'Olsson', username: 'magnus_o', category: 'subscriber', imageUrl: '' }
];

function getInitials(user) {
  return `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase();
}

function addUser() {
  const userForm = document.getElementById('userForm');
  const userDetails = document.getElementById('userDetails');

  document.getElementById('formTitle').textContent = 'Lägg till användare';
  document.getElementById('userId').value = '';
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('username').value = '';
  document.getElementById('category').value = 'member';
  document.getElementById('imageUrl').value = '';

  userDetails.classList.add('hidden');
  userForm.classList.remove('hidden');
}

function showUserDetails(index) {
  const user = users[index];
  const userDetails = document.getElementById('userDetails');
  const userForm = document.getElementById('userForm');

  userForm.classList.add('hidden');

  // Set active class on list item
  const listItems = document.querySelectorAll('.user-list-item');
  listItems.forEach((item) => item.classList.remove('active'));
  document.querySelector(`[data-user-id="${index}"]`).classList.add('active');

  const avatarContent = user.imageUrl
    ? `<img src="${user.imageUrl}" alt="${user.firstName} ${user.lastName}" />`
    : getInitials(user);

  userDetails.innerHTML = `
    <div class="user-card-header">
      <div class="user-avatar">${avatarContent}</div>
      <div class="user-info">
        <h3 class="user-name">${user.firstName} ${user.lastName}</h3>
        <p class="user-username">@${user.username}</p>
        <span class="user-category category-${user.category}">${user.category}</span>
      </div>
    </div>
    <div class="user-card-body">
      <div class="user-detail">
        <span class="user-detail-label">Förnamn</span>
        <span class="user-detail-value">${user.firstName}</span>
      </div>
      <div class="user-detail">
        <span class="user-detail-label">Efternamn</span>
        <span class="user-detail-value">${user.lastName}</span>
      </div>
      <div class="user-detail">
        <span class="user-detail-label">Användarnamn</span>
        <span class="user-detail-value">${user.username}</span>
      </div>
    </div>
    <div class="user-card-actions">
      <button type="button" class="btn btn-primary" onclick="editUser(${index})">Redigera</button>
      <button type="button" class="btn btn-danger" onclick="deleteUser(${index})">Radera</button>
    </div>
  `;
  userDetails.classList.remove('hidden');
}

function renderUsers() {
  const userListContainer = document.getElementById('userListContainer');

  const html = `
    <ul class="user-list-items">
      ${users
        .map(
          (user, index) => `
        <li class="user-list-item" data-user-id="${index}" onclick="showUserDetails(${index})">
          <span class="user-name">${user.firstName} ${user.lastName}</span>
          <span class="user-username">@${user.username}</span>
          <span class="user-category category-${user.category}">${user.category}</span>
        </li>
      `
        )
        .join('')}
    </ul>
  `;

  userListContainer.innerHTML = html;
}

function editUser(index) {
  const user = users[index];
  const userForm = document.getElementById('userForm');
  const userDetails = document.getElementById('userDetails');

  document.getElementById('formTitle').textContent = 'Redigera användare';
  document.getElementById('userId').value = user.id;
  document.getElementById('firstName').value = user.firstName;
  document.getElementById('lastName').value = user.lastName;
  document.getElementById('username').value = user.username;
  document.getElementById('category').value = user.category;
  document.getElementById('imageUrl').value = user.imageUrl ?? '';

  userDetails.classList.add('hidden');
  userForm.classList.remove('hidden');
}

function deleteUser(index) {
  if (confirm('Är du säker på att du vill radera denna användare?')) {
    users.splice(index, 1);
    document.getElementById('userDetails').classList.add('hidden');
    document.getElementById('userForm').classList.add('hidden');
    renderUsers();
  }
}

function cancelEdit() {
  document.getElementById('userForm').classList.add('hidden');
  const userId = document.getElementById('userId').value;
  if (userId) {
    document.getElementById('userDetails').classList.remove('hidden');
  }
}

document.getElementById('userForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const id = Number(document.getElementById('userId').value);
  const user = users.find((u) => u.id === id);
  if (!user) return;

  user.firstName = document.getElementById('firstName').value.trim();
  user.lastName = document.getElementById('lastName').value.trim();
  user.username = document.getElementById('username').value.trim();
  user.category = document.getElementById('category').value;
  user.imageUrl = document.getElementById('imageUrl').value.trim();

  const newIndex = users.findIndex((u) => u.id === id);
  renderUsers();
  showUserDetails(newIndex);
  document.getElementById('userForm').classList.add('hidden');
});

renderUsers();
