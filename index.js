const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
  reset: false, // ensures it only runs once
};

// Animate header content
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1000,
});

// Animate buttons (slide effect on load)
ScrollReveal().reveal(".header__buttons .btn.primary", {
  ...scrollRevealOption,
  origin: "left",
  delay: 1500,
});
ScrollReveal().reveal(".header__buttons .btn.secondary", {
  ...scrollRevealOption,
  origin: "right",
  delay: 1800,
});
