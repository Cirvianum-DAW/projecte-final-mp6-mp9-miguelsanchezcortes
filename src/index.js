// Import global styles
// import './styles/tailwind.css';
// import './styles/global.css';

// Import main page components based on the current page
import { renderNavbar } from './components/Navbar';
import { renderLoginPage } from './pages/LoginPage';
import { renderDashboardPage } from './pages/DashboardPage';
import { isAuthenticated } from './services/auth';

// Main application logic
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');
  const path = window.location.pathname;

  // Render the navbar on every page
  renderNavbar(isAuthenticated(), false);

  // Check the current page and render the appropriate content
  if (path === '/index.html' || path === '/') {
    console.log('Landing page');
  } else if (path === '/login.html') {
    console.log('Login page');
    renderLoginPage();
  } else if (path === '/dashboard.html') {
    renderDashboardPage();
  }
});
