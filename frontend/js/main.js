function renderHeader() {
  fetch('/api/user-status')
    .then((response) => response.json())
    .then((data) => {
      const userInfoContainer = document.getElementById('user-info');
      if (data.isLoggedIn) {
        userInfoContainer.innerHTML = `
          Hi, ${data.userEmail}
          <a href="/users/signout">Sign out</a>
        `;
      } else {
        userInfoContainer.innerHTML = `
        <a href="signup-login.html" class="login-btn">Sign in</a>
        `;
      }
    });
}

function updateNavbar() {
  fetch('/api/user-status')
    .then((response) => response.json())
    .then((data) => {
      const signupLoginLink = document.getElementById('signup-login-link');
      if (data.isLoggedIn) {
        // Hide the signup/login link
        signupLoginLink.style.display = 'none';
      } else {
        // Show the signup/login link
        signupLoginLink.style.display = 'inline';
      }
    });
}

function redirectToLoginIfNotLoggedIn() {
  fetch('/api/user-status')
    .then((response) => response.json())
    .then((data) => {
      if (!data.isLoggedIn) {
        window.location.href = 'signup-login.html';
      }
    });
}

// Call renderHeader() and updateNavbar() on page load
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  updateNavbar();
});