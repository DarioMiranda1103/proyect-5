/*
Project: Project 5 Personal Web Site Visitor Form
Name: Dario Miranda
Submitted: April 22, 2026

I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student,
or leaving my code on a public web site constitutes cheating.
I acknowledge that if I am found in violation of this policy this may result
in a zero grade, a permanent record on file and possibly immediate failure of the class.

Reflection:
In this file I handled the interaction of the page, including showing and hiding sections 
like the visitor form and the success message. I also kept the functionality 
from previous projects like the theme toggle and image modal. One challenge was 
making sure everything worked together without conflicts. This helped me understand 
how to separate responsibilities between different JavaScript files.
*/

function initPage() {
  setupImageModal();
  setupThemeToggle();
  setupVisitSection();
}

function setupImageModal() {
  const images = document.querySelectorAll(".gallery-item img, .featured-figure img");
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");

  if (!modal || !modalImg) {
    return;
  }

  images.forEach(function (img) {
    img.addEventListener("click", function () {
      modal.classList.add("show");
      modalImg.src = img.src;
      modalImg.alt = img.alt;
    });
  });

  modal.addEventListener("click", function () {
    modal.classList.remove("show");
  });
}

function setupThemeToggle() {
  const themeButton = document.getElementById("themeToggle");
  let themeActive = false;
  let themeLink = null;

  if (!themeButton) {
    return;
  }

  themeButton.addEventListener("click", function () {
    if (!themeActive) {
      themeLink = document.createElement("link");
      themeLink.rel = "stylesheet";
      themeLink.href = "css/theme.css";
      themeLink.id = "themeStylesheet";
      document.head.appendChild(themeLink);

      themeActive = true;
      themeButton.textContent = "Disable Theme";
      themeButton.classList.add("theme-on");
    } else {
      if (themeLink) {
        themeLink.remove();
        themeLink = null;
      }

      themeActive = false;
      themeButton.textContent = "Toggle Theme";
      themeButton.classList.remove("theme-on");
    }
  });
}

function setupVisitSection() {
  const visitLink = document.getElementById("logVisitLink");
  const visitSection = document.getElementById("visit");

  if (!visitLink || !visitSection) {
    return;
  }

  visitLink.addEventListener("click", function () {
    visitSection.classList.remove("hidden-section");
  });
}