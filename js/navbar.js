// Initialize variables first
const toggle = document.getElementById('mobileToggle');
const menu = document.getElementById('mobileMenu');
const backdrop = document.getElementById("menuBackdrop");

// Toggle mobile navigation menu
function toggleMenu() {
  if (menu && menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    if (backdrop) backdrop.classList.remove("hidden");
  } else if (menu) {
    menu.classList.add("hidden");
    if (backdrop) backdrop.classList.add("hidden");
  }
}

// Toggle updates modal form
function toggleForm() {
  const form = document.getElementById("updatesForm");
  if (form) {
    const isVisible = form.style.display === "flex";
    form.style.display = isVisible ? "none" : "flex";
  }
}

// Mobile menu toggle button
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('show');
    if (backdrop) {
      backdrop.style.display = menu.classList.contains('show') ? "block" : "none";
    }
  });
}

// Close menu if backdrop clicked
if (backdrop) {
  backdrop.addEventListener("click", toggleMenu);
}

// Close menu when clicking a nav link (for better UX)
document.querySelectorAll('#mobileMenu a, #mobileMenu button').forEach(link => {
  link.addEventListener('click', () => {
    if (menu) {
      menu.classList.add("hidden");
      menu.classList.remove("show");
    }
    if (toggle) toggle.classList.remove("active");
    if (backdrop) backdrop.style.display = "none";
  });
});





