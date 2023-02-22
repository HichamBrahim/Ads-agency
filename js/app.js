const pageMenu = document.querySelector(".hero .menu");
const firstNav = document.querySelector(".primary-nav");
const spinElement = document.querySelector(".setting-aside .toggle-setting");
const showSetting = document.querySelector(".setting-aside");
const allBacks = Array.from(document.querySelectorAll(".front .back"));
const skillsSection = document.querySelector(".our-skills");
const bulletsColors = Array.from(
  document.querySelectorAll(".bullets-colors .bullet")
);
const backgoundContainer = document.querySelector(".hero");
const mainContainer = document.getElementById("main-container");
const booleanBtns = Array.from(document.querySelectorAll(".boolean-Button"));
const booleanBullets = Array.from(document.querySelectorAll(".boolean-bullet"));
const bulletsNav = document.querySelector(".bullets-nav");
const resetBtn = document.querySelector(".reset-setting");
const Allgalleries = Array.from(document.querySelectorAll(".our-gallery img"));
const overlay = document.querySelector(".overlay");
let count = 2;
let numberOfback = 6;
// events
pageMenu.addEventListener("click", handleMenu);

spinElement.addEventListener("click", handleSpin);

window.addEventListener("scroll", scrollAnimation);

Allgalleries.forEach((gallery) => {
  gallery.addEventListener("click", showModal);
});

bulletsColors.forEach((bullet) => {
  bullet.addEventListener("click", AnimationSetting);
});
let counter = setInterval(changeBack, 3000);
window.addEventListener("DOMContentLoaded", getLocalStorageSettings);

booleanBtns.forEach((booleanBtn) => {
  booleanBtn.addEventListener("click", changeBackgroundStatus);
});

booleanBullets.forEach((booleanbullet) => {
  booleanbullet.addEventListener("click", toggleBullets);
});

resetBtn.addEventListener("click", resetSetting);

// setup classes
setupClasses();

// functions
function setupClasses() {
  bulletsColors[0].classList.add("active");
  booleanBtns[0].classList.add("active");
  booleanBullets[0].classList.add("active");
  bulletsNav.classList.remove("remove");
}

function handleMenu() {
  firstNav.classList.toggle("active");
}
function handleSpin() {
  showSetting.classList.toggle("active");
  spinElement.children[0].classList.toggle("fa-spin");
}
function scrollAnimation() {
  if (window.scrollY >= skillsSection.offsetTop) {
    allBacks.forEach((back) => {
      back.style.width = back.dataset.width;
    });
  }
}

function showModal(gallery) {
  overlay.innerHTML = `<div class="modal">
        <div class="box">
            <h3>image ${gallery.target.dataset.order}</h3>
            <img src=${gallery.target.src} alt="">
        </div>
        <div class="close">X</div> 
    </div>`;
  overlay.classList.add("show");
  mainContainer.appendChild(overlay);

  if (overlay.hasChildNodes()) {
    const closeModal = document.querySelector(".overlay .close");
    closeModal.addEventListener("click", closeOverlay);
  }
}

function closeOverlay(close) {
  overlay.classList.remove("show");
}

function AnimationSetting(bullet) {
  removeClasses(bulletsColors);
  bullet.target.classList.add("active");
  mainContainer.style.setProperty(
    "--primary-color",
    `${bullet.target.dataset.color}`
  );
  // set Settings to localStorage
  window.localStorage.setItem("color", `${bullet.target.dataset.color}`);
}
function removeClasses(elements) {
  elements.forEach((elment) => {
    elment.classList.remove("active");
  });
}
function changeBack() {
  backgoundContainer.style.cssText = `background-image: linear-gradient( rgb(0,0,0,0.6) , rgb(0,0,0,0.5)), url("imgs/0${count}.jpg");`;
  count++;
  if (count === numberOfback) {
    count = 1;
  }
}
function getLocalStorageSettings() {
  if (window.localStorage.getItem("color")) {
    mainContainer.style.setProperty(
      "--primary-color",
      `${window.localStorage.getItem("color")}`
    );
    removeClasses(bulletsColors);
    bulletsColors.forEach((bullet) => {
      if (bullet.dataset.color === window.localStorage.getItem("color")) {
        bullet.classList.add("active");
      }
    });
  }
  if (window.localStorage.getItem("background-option")) {
    if (window.localStorage.getItem("background-option") === "no") {
      clearInterval(counter);
    } else {
      counter = setInterval(changeBack, 3000);
    }
    removeClasses(booleanBtns);
    booleanBtns.forEach((booleanBtn) => {
      if (
        booleanBtn.dataset.boolean ===
        window.localStorage.getItem("background-option")
      ) {
        booleanBtn.classList.add("active");
      }
    });
  }
  if (window.localStorage.getItem("bullets-option")) {
    if (window.localStorage.getItem("bullets-option") === "no") {
      bulletsNav.classList.add("remove");
    } else {
      bulletsNav.classList.remove("remove");
    }
    removeClasses(booleanBullets);
    booleanBullets.forEach((booleanBullet) => {
      if (
        booleanBullet.dataset.boolean ===
        window.localStorage.getItem("bullets-option")
      ) {
        booleanBullet.classList.add("active");
      }
    });
  }
}

function changeBackgroundStatus(booleanBtn) {
  removeClasses(booleanBtns);
  booleanBtn.target.classList.add("active");
  // data-boolean
  if (booleanBtn.target.dataset.boolean === "no") {
    clearInterval(counter);
    window.localStorage.setItem(
      "background-option",
      `${booleanBtn.target.dataset.boolean}`
    );
  } else {
    counter = setInterval(changeBack, 3000);
    window.localStorage.setItem(
      "background-option",
      `${booleanBtn.target.dataset.boolean}`
    );
  }
}

function toggleBullets(booleanbullet) {
  removeClasses(booleanBullets);
  booleanbullet.target.classList.add("active");
  if (booleanbullet.target.dataset.boolean === "no") {
    bulletsNav.classList.add("remove");
    window.localStorage.setItem(
      "bullets-option",
      `${booleanbullet.target.dataset.boolean}`
    );
  } else {
    bulletsNav.classList.remove("remove");
    window.localStorage.setItem(
      "bullets-option",
      `${booleanbullet.target.dataset.boolean}`
    );
  }
}

function resetSetting() {
  window.location.reload();
  window.localStorage.clear();
}
