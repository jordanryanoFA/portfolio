const toggle = document.getElementById("theme-toggle");
const icon = document.getElementById("toggle-icon");
const logo = document.getElementById("logo-image");
const hamburgerBtn = document.getElementById("hamburger-btn");
const nav = document.querySelector(".nav");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    icon.src = "resources/Sun_fill.svg"; // sun icon
    logo.src = "resources/logo-dark.svg"; // dark logo
  } else {
    icon.src = "resources/Moon_fill_light.svg"; // moon icon
    logo.src = "resources/logo-light.svg"; // light logo
  }
});

hamburgerBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
});