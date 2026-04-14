import {
  applications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../crud.js";
import { renderItems } from "./render.js";

// state
let applicationId = null;
let modalMode = "create";

const openModal = () => {
  const modal = document.getElementById("modal");

  modal.style.display = "flex";
};

const closeModal = () => {
  const modal = document.getElementById("modal");

  const modalForm = document.querySelector(".modal__form");
  modalForm.reset();

  modalMode = "create";
  applicationId = null;

  modal.style.display = "none";
};

const createButton = document.getElementById("create-button");
createButton.addEventListener("click", () => {
  modalMode = "create";

  const modalTitle = document.querySelector(".modal__title");
  modalTitle.textContent = "New Application";

  openModal();
});

const closeButton = document.querySelector(".modal__close-button");
closeButton.addEventListener("click", closeModal);

const submitButton = document.querySelector(".modal__submit-button");
submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const roleInput = document.querySelector(`.modal__input[name="role"]`);
  const role = roleInput.value.trim();

  const companyInput = document.querySelector(`.modal__input[name="company"]`);
  const company = companyInput.value.trim();

  if (!role || !company) return;

  if (modalMode === "create") {
    createApplication(role, company);
  } else if (modalMode === "update") {
    updateApplication(applicationId, { role, company });
  }

  closeModal();

  renderItems();
});

export const addKebabListeners = (item) => {
  // open kebab menu
  const itemButton = item.querySelector(".item__button");
  const itemOptions = item.querySelector(".item__options");

  itemButton.addEventListener("click", () => {
    // close all other menus
    document.querySelectorAll(".item__options").forEach((menu) => {
      if (menu !== itemOptions) {
        menu.style.display = "none";
      }
    });

    // toggle current menu
    if (itemOptions.style.display === "none") {
      itemOptions.style.display = "flex";
    } else {
      itemOptions.style.display = "none";
    }
  });

  // update application
  const updateButton = item.querySelector(".item__update-button");

  updateButton.addEventListener("click", () => {
    applicationId = item.dataset.id;

    const application = applications.find((app) => app.id === applicationId);
    if (!application) return;

    const roleInput = document.querySelector(`.modal__input[name="role"]`);
    roleInput.value = application.role;

    const companyInput = document.querySelector(
      `.modal__input[name="company"]`,
    );
    companyInput.value = application.company;

    modalMode = "update";

    const modalTitle = document.querySelector(".modal__title");
    modalTitle.textContent = "Update Application";

    openModal();

    const itemOptions = item.querySelector(".item__options");
    itemOptions.style.display = "none";
  });

  // delete application
  const deleteButton = item.querySelector(".item__delete-button");

  deleteButton.addEventListener("click", () => {
    applicationId = item.dataset.id;

    deleteApplication(applicationId);
    renderItems();
  });
};
