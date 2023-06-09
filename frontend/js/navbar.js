document.addEventListener('DOMContentLoaded', function () {
  const navbarHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          <h1 class="logo-text">StudyBuddy</h1>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="features.html">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="testimonials.html">Testimonials</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="faq.html">FAQ</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="dashboard.html">Dashboard</a>
            </li>
            <li class="nav-item">
            </li>
            <li class="nav-item">
              <a class="nav-link" href="resources.html">Resources</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="index.html#contact">Contact</a>
                        </li>
          </ul>
        </div>
      </div>
    </nav>
  `;

  const navbarContainer = document.getElementById('navbar-container');
  if (navbarContainer) {
    navbarContainer.innerHTML = navbarHTML;
  }
});