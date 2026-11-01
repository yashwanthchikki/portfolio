'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials modal (only wired up if that markup exists on the page)
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

if (modalContainer && modalCloseBtn && overlay) {
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");
  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  };
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  }
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.opacity = 1;
  setTimeout(() => {
    toast.style.opacity = 0;
  }, 1500);
}


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  selectedValue = selectedValue.toLowerCase();

  for (let i = 0; i < filterItems.length; i++) {
    const itemCategory = filterItems[i].dataset.category.toLowerCase();

    if (selectedValue === "all" || selectedValue === itemCategory) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};




// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

// filter buttons
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText; // keep original for display
    selectValue.innerText = selectedValue; 
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// select dropdown
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText; // original capitalization
    selectValue.innerText = selectedValue;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// contact form (Web3Forms): send without leaving the page and show the result
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  const statusEl = document.createElement("p");
  statusEl.className = "form-status";
  statusEl.setAttribute("role", "status");
  contactForm.appendChild(statusEl);

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const btn = contactForm.querySelector("button[type=submit]");
    btn.disabled = true;
    statusEl.dataset.state = "";
    statusEl.textContent = "Sending…";
    try {
      const res = await fetch(contactForm.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(contactForm)
      });
      const data = await res.json().catch(function () { return {}; });
      if (!res.ok || !data.success) throw new Error(data.message || ("error " + res.status));
      statusEl.dataset.state = "ok";
      statusEl.textContent = "Thanks! Your message has been sent. I'll get back to you soon.";
      contactForm.reset();
    } catch (err) {
      statusEl.dataset.state = "error";
      statusEl.innerHTML = "Sorry, the message couldn't be sent (" + err.message +
        "). Please email me at <a href=\"mailto:yashwanthchikkihd@gmail.com\">yashwanthchikkihd@gmail.com</a>.";
    } finally {
      btn.disabled = false;
    }
  });
}
