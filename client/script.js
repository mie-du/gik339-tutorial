const users = [
  { firstName: 'Anna', lastName: 'Andersson', username: 'anna_a', category: 'admin' },
  { firstName: 'Erik', lastName: 'Eriksson', username: 'erik_e', category: 'member' },
  { firstName: 'Maria', lastName: 'Johansson', username: 'maria_j', category: 'guest' },
  { firstName: 'Johan', lastName: 'Svensson', username: 'johan_s', category: 'moderator' },
  { firstName: 'Lisa', lastName: 'Nilsson', username: 'lisa_n', category: 'subscriber' },
  { firstName: 'Karl', lastName: 'Lindberg', username: 'karl_l', category: 'admin' },
  { firstName: 'Sara', lastName: 'Bergström', username: 'sara_b', category: 'member' },
  { firstName: 'Peter', lastName: 'Larsson', username: 'peter_l', category: 'guest' },
  { firstName: 'Emma', lastName: 'Karlsson', username: 'emma_k', category: 'moderator' },
  { firstName: 'Magnus', lastName: 'Olsson', username: 'magnus_o', category: 'subscriber' }
];


function showUserDetails(index) {
  const user = users[index];
  const userDetails = document.getElementById('userDetails');
  userDetails.innerHTML = `
    <p><strong>First Name:</strong> ${user.firstName}</p>
    <p><strong>Last Name:</strong> ${user.lastName}</p>
    <p><strong>Username:</strong> ${user.username}</p>
    <p><strong>Category:</strong> ${user.category}</p>
  `;
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

renderUsers();
