/* Exempeldata, en array av användare (minimera gärna) */
const users = [];

/* *** Nedan skriver vi resten av koden. *** */
function showForm(id) {
  const userFormElement = document.getElementById('userForm');
  userFormElement.classList.remove('hidden');

  if (id !== undefined && id !== null) {
    const user = users.find((user) => Number(user.id) === Number(id));

    document.getElementById('formTitle').textContent =
      `Redigera användare: ${user.firstName} ${user.lastName}`;
    userForm.userId.value = user.id;
    userForm.firstName.value = user.firstName;
    userForm.lastName.value = user.lastName;
    userForm.username.value = user.username;
    userForm.imageUrl.value = user.imageUrl;
    userForm.category.value = user.category;
  } else {
    document.getElementById('formTitle').textContent = 'Lägg till användare';
    userForm.userId.value = null;
    userForm.reset();
  }

  document.getElementById('userDetails').classList.add('hidden');
}

function hideForm() {
  const userFormElement = document.getElementById('userForm');
  userFormElement.classList.add('hidden');

  if (userForm.userId.value) {
    document.getElementById('userDetails').classList.remove('hidden');
  }
  userForm.userId.value = null;
}

async function renderUsers() {
  const response = await fetch('http://localhost:3000/users');
  const serverUsers = await response.json();

  users.length = 0;
  serverUsers.map((user) => users.push(user));

  const userListContainerElement = document.getElementById('userListContainer');

  let html = `<ul class="user-list-items">`;

  users.forEach((user) => {
    html += `<li class="user-list-item" onclick="showUserDetails(${user.id})">
          <span class="user-name">${user.firstName} ${user.lastName}</span>
          <span class="user-username">@${user.username}</span>
          <span class="user-category category-${user.category}">${user.category}</span>
      </li>`;
  });

  html += '</ul>';

  const html2 = `<ul class="user-list-items">
  ${users
    .map((user) => {
      return `<li class="user-list-item" onclick="showUserDetails(${user.id})">
          <span class="user-name">${user.firstName} ${user.lastName}</span>
          <span class="user-username">@${user.username}</span>
          <span class="user-category category-${user.category}">${user.category}</span>
      </li>`;
    })
    .join('')}
  
  </ul>`;

  userListContainerElement.innerHTML = html2;
}

function showUserDetails(id) {
  hideForm();
  const user = users.find((user) => Number(user.id) === Number(id));

  const userDetailsElement = document.getElementById('userDetails');

  userDetailsElement.innerHTML = `
    <div class="user-card-header">
      <div class="user-avatar">${user.imageUrl ? `<img src="${user.imageUrl}" /alt="${user.firstName} ${user.lastName}">` : ''}</div>
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
      <button type="button" class="btn btn-primary" onclick="showForm(${id})">Redigera</button>
      <button type="button" class="btn btn-danger" onclick="deleteUser(${id})">Radera</button>
    </div>
  `;

  userDetailsElement.classList.remove('hidden');
}

document.getElementById('userForm').addEventListener('submit', saveUser);

function saveUser(e) {
  e.preventDefault();

  console.log('save user');

  const id = userForm.userId.value;
  const firstName = userForm.firstName.value;
  const lastName = userForm.lastName.value;
  const username = userForm.username.value;
  const category = userForm.category.value;
  const imageUrl = userForm.imageUrl.value;

  const user = { id, firstName, lastName, username, category, imageUrl };

  if (id) {
    fetch(`http://localhost:3000/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }).then(() => {
      renderUsers();
      showUserDetails(id);
    });
  } else {
    fetch(`http://localhost:3000/users/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then((result) => result.json())
      .then((newUser) => {
        renderUsers();
        showUserDetails(newUser.id);
      });
  }
}

function deleteUser(id) {
  fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' }).then(
    renderUsers
  );
}
renderUsers();
