// ----- Highlight the menu link of the section you are viewing -----
const sections = document.querySelectorAll(".page");
const menuLinks = document.querySelectorAll("[data-link]");

function highlightMenu(name) {
  menuLinks.forEach(function (link) {
    link.classList.toggle("active", link.dataset.link === name);
  });
}

// watches which section is in the middle of the screen while scrolling
const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        highlightMenu(entry.target.id);
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach(function (section) {
  observer.observe(section);
});

highlightMenu("home");

// ----- Click a screenshot to view it larger -----
const viewer = document.getElementById("viewer");
const bigImage = document.getElementById("big");
const caption = document.getElementById("caption");
const closeButton = document.getElementById("close");

document.querySelectorAll("[data-zoom]").forEach(function (button) {
  button.addEventListener("click", function () {
    bigImage.src = button.dataset.zoom;
    bigImage.alt = button.dataset.cap;
    caption.textContent = button.dataset.cap;
    viewer.showModal();
  });
});

closeButton.addEventListener("click", function () {
  viewer.close();
});

// clicking outside the image also closes it
viewer.addEventListener("click", function (event) {
  if (event.target === viewer) {
    viewer.close();
  }
});