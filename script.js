// ----- Switch between pages (Home, Services, etc.) -----
const pages = document.querySelectorAll(".page");
const menuLinks = document.querySelectorAll("[data-link]");

function showPage() {
  // get the page name from the link, like #services
  let name = window.location.hash.replace("#", "");

  // if the name doesn't match any page, go to home
  const exists = Array.from(pages).some(function (page) {
    return page.id === name;
  });
  if (!exists) {
    name = "home";
  }

  // show only the chosen page
  pages.forEach(function (page) {
    page.classList.toggle("show", page.id === name);
  });

  // highlight the matching menu link
  menuLinks.forEach(function (link) {
    link.classList.toggle("active", link.dataset.link === name);
  });

  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", showPage);
showPage();

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