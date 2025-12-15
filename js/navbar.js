// Toggle mobile navigation menu
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const backdrop = document.getElementById("menuBackdrop");

  // Toggle visibility
  if (menu.classList.contains("translate-x-full")) {
    menu.classList.remove("translate-x-full");
    backdrop.classList.remove("hidden");
  } else {
    menu.classList.add("translate-x-full");
    backdrop.classList.add("hidden");
  }
}

const navbarToggle = document.querySelector('.navbar-toggle, #mobileToggle');
const navbarMenu = document.querySelector('.navbar-menu , #mobileMenu,mobile-Menu');
navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
   
});


// Close menu if backdrop clicked
document.getElementById("menuBackdrop").addEventListener("click", toggleMenu);



// Toggle updates modal form
function toggleForm() {
  const form = document.getElementById("updatesForm");
  const isVisible = form.style.display === "flex";
  form.style.display = isVisible ? "none" : "flex";
}

// Optional: Close menu when clicking a nav link (for better UX)
document.querySelectorAll('#mobileMenu a, #mobileMenu button').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById("mobileMenu").classList.add("hidden");
  });
});



toggle.addEventListener('click', () => {
  toggle.classList.toggle('active');
  menu.classList.toggle('show');
});





const toggle = document.getElementById('mobileToggle');
const menu = document.getElementById('mobileMenu');
let backdrop = document.getElementById("menuBackdrop");


toggle.addEventListener('click', () => {
  toggle.classList.toggle('active');
  menu.classList.toggle('show');
  backdrop.style.display = menu.classList.contains('show') ? "block" : "none";
});


// Close menu on nav link click
document.querySelectorAll('#mobileMenu a, #mobileMenu button').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove("show");
    toggle.classList.remove("active");
    backdrop.style.display = "none";
  });
});
