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

function getCategoryBadge(category) {
  const badges = {
    admin: 'badge-admin',
    member: 'badge-member',
    guest: 'badge-guest',
    moderator: 'badge-moderator',
    subscriber: 'badge-subscriber'
  };
  return badges[category] || 'badge-secondary';
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

  userDetails.classList.add('d-none');
  userForm.classList.remove('d-none');
}

function showUserDetails(index) {
  const user = users[index];
  const userDetails = document.getElementById('userDetails');
  const userForm = document.getElementById('userForm');

  userForm.classList.add('d-none');

  // Set active class on list item
  const listItems = document.querySelectorAll('[data-user-id]');

  userDetails.innerHTML = `
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card text-center">
          <div class="card-header">
            <h5 class="card-title mb-0">${user.firstName} ${user.lastName}</h5>
          </div>
          <div class="card-body">
            <p class="card-text text-secondary">@${user.username}</p>
            <span class="badge ${getCategoryBadge(user.category)}">${user.category}</span>
          </div>
          <div class="card-footer">
            <button onclick="editUser(${index})" class="btn btn-outline-light btn-sm">
              ✏️ Redigera
            </button>
            <button onclick="deleteUser(${index})" class="btn btn-outline-danger btn-sm">
              🗑️ Radera
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  userDetails.classList.remove('d-none');
}

function renderUsers() {
  const userListContainer = document.getElementById('userListContainer');

  const html = `
    <table class="table table-dark table-hover mb-0">
      <thead>
        <tr>
          <th>Namn</th>
          <th>Användarnamn</th>
          <th>Kategori</th>
        </tr>
      </thead>
      <tbody>
        ${users
          .map(
            (user, index) => `
          <tr data-user-id="${index}" onclick="showUserDetails(${index})" class="user-item">
            <td>${user.firstName} ${user.lastName}</td>
            <td class="text-secondary">@${user.username}</td>
            <td><span class="badge ${getCategoryBadge(user.category)}">${user.category}</span></td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>
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

  userDetails.classList.add('d-none');
  userForm.classList.remove('d-none');
}

function deleteUser(index) {
  if (confirm('Are you sure you want to delete this user?')) {
    users.splice(index, 1);
    document.getElementById('userDetails').classList.add('d-none');
    document.getElementById('userForm').classList.add('d-none');
    renderUsers();
  }
}

function cancelEdit() {
  document.getElementById('userForm').classList.add('d-none');
  // Only show details if we were editing (not adding new)
  const userId = document.getElementById('userId').value;
  if (userId) {
    document.getElementById('userDetails').classList.remove('d-none');
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
  document.getElementById('userForm').classList.add('d-none');
});

renderUsers();
