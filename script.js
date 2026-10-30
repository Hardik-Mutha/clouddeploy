/**
 * CloudDeploy - Client-side JavaScript
 * Description: Simple, modern, and accessible script for navigation and interactions.
 * Note: Pure vanilla JavaScript - no external libraries or build tools needed.
 */

// Wait for the DOM to be fully loaded before attaching events
document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------------------------
     1. Mobile Navigation Menu Toggle
     Handles opening and closing the mobile drawer on smaller screens.
     ------------------------------------------------------------------------- */
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      // Toggle the 'open' class on the navigation list
      const isOpen = navLinks.classList.toggle('open');
      
      // Update ARIA accessibility state for screen readers
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close the mobile menu whenever any navigation link inside it is clicked
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* -------------------------------------------------------------------------
     2. Active Navigation Link Highlighting on Scroll
     Uses IntersectionObserver to observe visible sections and highlight links.
     ------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-links .nav-link');

  // Configure an observer to detect when a section is at least 35% visible
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.35,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        
        // Remove 'active' class from all links and add to the matching link
        allNavLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href === `#${activeId}`) {
            link.classList.add('active');
          } else if (href.startsWith('#')) {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  // Register each section with the observer
  sections.forEach((section) => {
    observer.observe(section);
  });

  /* -------------------------------------------------------------------------
     3. Subtle Interactive Card Effects (Optional polish)
     Logs a helpful beginner-friendly message to the developer console.
     ------------------------------------------------------------------------- */
  console.log(
    '%c CloudDeploy Project %c Website loaded successfully. AWS S3 + GitHub Actions pipeline demo.',
    'background: #ff9900; color: #000; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    'background: #111827; color: #38bdf8; padding: 4px 8px;'
  );
});
