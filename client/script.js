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

function getInitials(user) {
  return `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase();
}

function showUserDetails(index) {
  const user = users[index];
  const userDetails = document.getElementById('userDetails');
  const userForm = document.getElementById('userForm');

  userForm.classList.remove('is-open');

  // Set active class on list item
  const listItems = document.querySelectorAll('.userListItem');
  listItems.forEach((item) => item.classList.remove('active'));
  listItems[index].classList.add('active');

  const avatarContent = user.imageUrl
    ? `<img src="${user.imageUrl}" alt="${user.firstName} ${user.lastName}" />`
    : `<span class="avatar-initials">${getInitials(user)}</span>`;

  userDetails.innerHTML = `
    <div class="user-card-header">
      <div class="user-avatar">${avatarContent}</div>
      <div>
        <p class="user-card-title">${user.firstName} ${user.lastName}</p>
        <p class="user-card-subtitle">@${user.username}</p>
        <span class="user-category">${user.category}</span>
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
    </div>
    <div class="user-card-actions">
      <button type="button" class="icon-btn edit-btn" onclick="editUser(${index})" title="Edit" aria-label="Edit user">
        <span class="material-symbols-rounded">edit</span>
      </button>
      <button type="button" class="icon-btn delete-btn" onclick="deleteUser(${index})" title="Delete" aria-label="Delete user">
        <span class="material-symbols-rounded">delete</span>
      </button>
    </div>
  `;
  userDetails.style.display = 'block';
}

function renderUsers() {
  const userListContainer = document.getElementById('userListContainer');

  const html = `
    <ul class="userList">
      ${users
        .map(
          (user, index) => `
        <li class="userListItem" onclick="showUserDetails(${index})">
          ${user.firstName} ${user.lastName}
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

  document.getElementById('userId').value = user.id;
  document.getElementById('firstName').value = user.firstName;
  document.getElementById('lastName').value = user.lastName;
  document.getElementById('username').value = user.username;
  document.getElementById('category').value = user.category;
  document.getElementById('imageUrl').value = user.imageUrl ?? '';

  userDetails.style.display = 'block';
  userForm.classList.add('is-open');
}

function deleteUser(index) {
  if (confirm('Are you sure you want to delete this user?')) {
    users.splice(index, 1);
    document.getElementById('userDetails').style.display = 'none';
    document.getElementById('userForm').classList.remove('is-open');
    renderUsers();
    // Remove active class after re-rendering
    const listItems = document.querySelectorAll('.userListItem');
    listItems.forEach((item) => item.classList.remove('active'));
  }
}

function cancelEdit() {
  document.getElementById('userForm').classList.remove('is-open');
  document.getElementById('userDetails').style.display = 'block';
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
  document.getElementById('userForm').classList.remove('is-open');
});

renderUsers();
