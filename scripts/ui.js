import {
  applications,
  createApplication,
  updateApplication,
  deleteApplication,
  appliedCount,
  inProgressCount,
  offerCount,
  rejectedCount,
} from "./crud.js";

// dom elements
const container = document.querySelector(".container"); // TODO: apparently it's possible to condense from 3 event listeners (kebab, edit, delete) down to 1
const modal = document.getElementById("modal");
const modalTitle = document.querySelector(".modal__title");
const modalForm = document.querySelector(".modal__form");

const roleInput = document.querySelector(`.modal__input[name="role"]`);
const companyInput = document.querySelector(`.modal__input[name="company"]`);

const createButton = document.getElementById("create-button");
const submitButton = document.querySelector(".modal__submit-button");
const closeButton = document.querySelector(".modal__close-button");

// ui state
let modalMode = "create";

let applicationId = null;

// item rendering
export const renderApplications = () => {
  const columns = ["apply", "progress", "reject", "offer"];

  // first, clear all columns
  columns.forEach((columnId) => {
    const dropzone = document.querySelector(`#${columnId} .dropzone`);

    dropzone.innerHTML = "";
  });

  // render each application into the correct column
  applications.forEach((application) => {
    const dropzone = document.querySelector(`#${application.status} .dropzone`);

    const item = document.createElement("li");
    item.classList.add("item");

    item.dataset.id = application.id;

    item.setAttribute("draggable", "true");

    item.innerHTML = `
    <div class="item__details">
      <h2 class="item__role">${application.role}</h2>

      <button class="item__button">⁝</button>

      <div class="item__options" style="display: none;">
        <button class="item__update-button">✏️ Edit</button>

        <button class="item__delete-button">🗑️ Delete</button>
      </div>
    </div>

    <p class="item__details">
      <span class="item__company">${application.company}</span>

      <span class="item__date">${application.dateApplied.toLocaleDateString()}</span>
    </p>
    `;

    dropzone.appendChild(item);
  });

  // render counts for each column
  const appliedCountLabel = document.querySelector(`#apply .column__count`);
  appliedCountLabel.textContent = appliedCount;

  const inProgressCountLabel = document.querySelector(
    `#progress .column__count`,
  );
  inProgressCountLabel.textContent = inProgressCount;

  const rejectedCountLabel = document.querySelector(`#reject .column__count`);
  rejectedCountLabel.textContent = rejectedCount;

  const offerCountLabel = document.querySelector(`#offer .column__count`);
  offerCountLabel.textContent = offerCount;
};

// open modal
const openModal = () => {
  modal.style.display = "flex";
};

createButton.addEventListener("click", () => {
  modalMode = "create";
  modalTitle.textContent = "New Application";

  openModal();
});

// close modal
const closeModal = () => {
  modalForm.reset();

  modalMode = "create";

  applicationId = null;

  modal.style.display = "none";
};

closeButton.addEventListener("click", closeModal);

// modal submit
submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const role = roleInput.value.trim();
  const company = companyInput.value.trim();

  if (!role || !company) return;

  if (modalMode === "create") {
    createApplication(role, company);
  } else if (modalMode === "update") {
    updateApplication(applicationId, role, company);
  }

  closeModal();

  renderApplications();
});

// open kebab menu
container.addEventListener("click", (event) => {
  const itemButton = event.target.closest(".item__button"); // .closest traverses up dom tree from event target
  if (!itemButton) return; // if there's no items on the board, there'll be no kebab buttons to be found

  const itemOptions = itemButton.nextElementSibling;

  // close all other kebab menus first
  document.querySelectorAll(".item__options").forEach((menu) => {
    if (menu !== itemOptions) {
      menu.style.display = "none";
    }
  });

  // and then open/close kebab menu (based on current status)
  if (itemOptions.style.display === "none") {
    itemOptions.style.display = "flex";
  } else {
    itemOptions.style.display = "none";
  }
});

// kebab update button
container.addEventListener("click", (event) => {
  const updateButton = event.target.closest(".item__update-button");
  if (!updateButton) return;

  const item = updateButton.closest(".item");
  applicationId = item.dataset.id;

  const application = applications.find((app) => app.id === applicationId);
  if (!application) return;

  roleInput.value = application.role;
  companyInput.value = application.company;

  modalMode = "update";
  modalTitle.textContent = "Update Application";

  openModal();

  const itemOptions = event.target.closest(".item__options");
  itemOptions.style.display = "none";
});

// kebab delete button
container.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".item__delete-button");
  if (!deleteButton) return;

  const item = deleteButton.closest(".item");
  applicationId = item.dataset.id;

  deleteApplication(applicationId);

  renderApplications();
});
