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
This was the most challenging part of the project. I implemented validation
for required fields, formats like email and phone, and custom logic like 
checking valid state abbreviations. I also worked on displaying error messages 
and changing input styles based on validity. One difficulty I had was making 
sure validation worked both on change and on submit. I also had to debug issues 
where some fields were not updating correctly. This file helped me better understand 
how form validation works in real applications.
*/

const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const zipCodeRegex = /^\d{5}(-\d{4})?$/;

const stateAbbreviations = [
  "AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA",
  "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA",
  "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND",
  "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT",
  "VT", "VI", "VA", "WA", "WV", "WI", "WY"
];

let form = null;
let successMsg = null;

function initValidation(formId, successId) {
  form = document.getElementById(formId);
  successMsg = document.getElementById(successId);

  if (!form) {
    return;
  }

  const fields = form.querySelectorAll("input, textarea");

  fields.forEach(function (field) {
    field.addEventListener("change", inputChanged);
  });

  form.addEventListener("submit", submitForm);
}

function inputChanged(ev) {
  const el = ev.currentTarget;
  el.classList.add("was-validated");
  validateField(el.id);
}

function submitForm(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  validateForm();

  const fields = form.querySelectorAll("input, textarea");
  fields.forEach(function (field) {
    field.classList.add("was-validated");
  });

  if (!form.checkValidity()) {
    return;
  }

  form.classList.add("hidden");
  successMsg.classList.remove("hidden");
}

function validateForm() {
  validateField("first-name");
  validateField("last-name");
  validateField("address");
  validateField("city");
  validateField("state");
  validateField("zip");
  validateField("phone");
  validateField("email");
  validateField("google");
}

function validateField(id) {
  switch (id) {
    case "first-name":
      checkRequired("first-name", "First name is required");
      break;

    case "last-name":
      checkRequired("last-name", "Last name is required");
      break;

    case "address":
      checkRequired("address", "Address is required");
      break;

    case "city":
      checkRequired("city", "City is required");
      break;

    case "state":
      if (checkRequired("state", "State is required")) {
        validateState("state", "Enter a valid two letter state code");
      }
      break;

    case "zip":
      if (checkRequired("zip", "Zip code is required")) {
        checkFormat("zip", "Use ##### or #####-####", zipCodeRegex);
      }
      break;

    case "phone":
      if (checkRequired("phone", "Phone number is required")) {
        checkFormat("phone", "Enter a valid phone number", phoneRegex);
      }
      break;

    case "email":
      if (checkRequired("email", "Email address is required")) {
        checkFormat("email", "Enter a valid email address", emailRegex);
      }
      break;

    case "google":
    case "friend":
    case "social":
    case "other-source":
      checkRequired("google", "Select at least one option");
      break;
  }
}

function validateState(id, msg) {
  const el = document.getElementById(id);
  const value = el.value.trim().toUpperCase();
  el.value = value;

  const valid = stateAbbreviations.includes(value);
  setElementValidity(id, valid, msg);
  return valid;
}

function checkFormat(id, msg, regex) {
  const el = document.getElementById(id);
  const value = el.value.trim();
  const valid = regex.test(value);

  setElementValidity(id, valid, msg);
  return valid;
}

function checkRequired(id, message) {
  const el = document.getElementById(id);
  let valid = false;

  if (!el) {
    return false;
  }

  const type = el.type;

  switch (type) {
    case "text":
    case "textarea":
      valid = el.value.trim() !== "";
      break;

    case "checkbox":
    case "radio": {
      const group = document.querySelectorAll(`input[name="${el.name}"]`);
      valid = Array.from(group).some(function (item) {
        return item.checked;
      });
      break;
    }

    default:
      valid = el.value.trim() !== "";
      break;
  }

  setElementValidity(id, valid, message);
  return valid;
}

function setElementValidity(id, valid, message) {
  const el = document.getElementById(id);

  if (!el) {
    return;
  }

  if (el.type === "checkbox" || el.type === "radio") {
    const group = document.querySelectorAll(`input[name="${el.name}"]`);
    const errorDiv = el.closest(".checkbox-group").querySelector(".errorMsg");

    group.forEach(function (item) {
      if (valid) {
        item.setCustomValidity("");
      } else {
        item.setCustomValidity(message);
      }
    });

    errorDiv.textContent = valid ? "" : message;
    return;
  }

  const fieldWrap = el.parentElement;
  const errorDiv = fieldWrap.querySelector(".errorMsg");

  if (valid) {
    el.setCustomValidity("");
    errorDiv.textContent = "";
  } else {
    el.setCustomValidity(message);
    errorDiv.textContent = message;
  }
}