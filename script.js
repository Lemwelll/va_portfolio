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

// ----- App slider on the home page -----
const slider = document.querySelector(".app-slider");

if (slider) {
  const track = slider.querySelector(".slides");
  const slides = Array.from(track.children);
  const dotsBox = slider.querySelector(".dots");
  let index = 0;
  let timer;

  slides.forEach(function (_, n) {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", "Show slide " + (n + 1));
    dot.addEventListener("click", function () {
      go(n);
      start();
    });
    dotsBox.appendChild(dot);
  });

  function go(n) {
    index = (n + slides.length) % slides.length;
    const prev = (index - 1 + slides.length) % slides.length;

    slides.forEach(function (slide, k) {
      slide.classList.toggle("is-active", k === index);
      slide.classList.toggle("is-prev", k === prev);
    });

    dotsBox.querySelectorAll("button").forEach(function (d, k) {
      d.classList.toggle("active", k === index);
    });
  }

  function stop() {
    clearInterval(timer);
  }

  function start() {
    stop();
    timer = setInterval(function () {
      go(index + 1);
    }, 1500);
  }

  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);

  go(0);
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    start();
  }
}document.querySelectorAll(".photo-fade").forEach(function (box) {
  const photos = Array.from(box.querySelectorAll(".photo"));
  if (photos.length < 2) return;

  let current = 0;
  let timer;

  function show(n) {
    photos[current].classList.remove("is-active");
    photos[current].tabIndex = -1;
    current = n;
    photos[current].classList.add("is-active");
    photos[current].tabIndex = 0;
  }

  function stop() {
    clearInterval(timer);
  }

  function start() {
    stop();
    timer = setInterval(function () {
      show((current + 1) % photos.length);
    }, 2000);
  }

  // pauses while the mouse or keyboard focus is on the photo
  box.addEventListener("mouseenter", stop);
  box.addEventListener("mouseleave", start);
  box.addEventListener("focusin", stop);
  box.addEventListener("focusout", start);

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    start();
  }
});