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

function getCategoryColor(category) {
  const colors = {
    admin: 'bg-red-500/20 text-red-300',
    member: 'bg-blue-500/20 text-blue-300',
    guest: 'bg-gray-500/20 text-gray-300',
    moderator: 'bg-purple-500/20 text-purple-300',
    subscriber: 'bg-green-500/20 text-green-300'
  };
  return colors[category] || 'bg-gray-500/20 text-gray-300';
}

function showUserDetails(index) {
  const user = users[index];
  const userDetails = document.getElementById('userDetails');
  const userForm = document.getElementById('userForm');

  userForm.classList.add('hidden');

  // Set active class on list item
  const listItems = document.querySelectorAll('[data-user-id]');
  listItems.forEach((item) => item.classList.remove('bg-blue-500', 'ring-2', 'ring-blue-400'));
  document.querySelector(`[data-user-id="${index}"]`).classList.add('bg-blue-500', 'ring-2', 'ring-blue-400');

  const avatarContent = user.imageUrl
    ? `<img src="${user.imageUrl}" alt="${user.firstName} ${user.lastName}" class="w-full h-full object-cover rounded-full" />`
    : `<span class="text-2xl font-bold">${getInitials(user)}</span>`;

  userDetails.innerHTML = `
    <div class="flex items-start gap-4 pb-4 border-b border-white/20">
      <div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0 text-white">
        ${avatarContent}
      </div>
      <div class="flex-1">
        <h2 class="text-2xl font-bold">${user.firstName} ${user.lastName}</h2>
        <p class="text-white/70 text-sm">@${user.username}</p>
        <span class="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(user.category)}">${user.category}</span>
      </div>
    </div>
    <div class="mt-4 space-y-3">
      <div class="flex justify-between items-center">
        <span class="text-white/70 text-sm">First Name</span>
        <span class="font-semibold">${user.firstName}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-white/70 text-sm">Last Name</span>
        <span class="font-semibold">${user.lastName}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-white/70 text-sm">Username</span>
        <span class="font-semibold">${user.username}</span>
      </div>
    </div>
    <div class="flex gap-2 mt-6 pt-4 border-t border-white/20">
      <button onclick="editUser(${index})" class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
        Edit
      </button>
      <button onclick="deleteUser(${index})" class="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        Delete
      </button>
    </div>
  `;
  userDetails.classList.remove('hidden');
}

function renderUsers() {
  const userListContainer = document.getElementById('userListContainer');

  const html = `
    <div class="space-y-3">
      ${users
        .map(
          (user, index) => `
        <div data-user-id="${index}" onclick="showUserDetails(${index})" class="bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg p-4 cursor-pointer transition transform hover:scale-105">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              ${getInitials(user)}
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-white truncate">${user.firstName} ${user.lastName}</p>
              <p class="text-white/60 text-sm truncate">@${user.username}</p>
            </div>
            <span class="px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(user.category)} flex-shrink-0">${user.category}</span>
          </div>
        </div>
      `
        )
        .join('')}
    </div>
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

  userDetails.classList.add('hidden');
  userForm.classList.remove('hidden');
}

function deleteUser(index) {
  if (confirm('Are you sure you want to delete this user?')) {
    users.splice(index, 1);
    document.getElementById('userDetails').classList.add('hidden');
    document.getElementById('userForm').classList.add('hidden');
    renderUsers();
  }
}

function cancelEdit() {
  document.getElementById('userForm').classList.add('hidden');
  document.getElementById('userDetails').classList.remove('hidden');
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
