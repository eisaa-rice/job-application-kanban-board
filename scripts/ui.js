import {
  applications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "./crud.js";
import { renderItems } from "./render.js";

// modal

const openModal = () => {
  const modal = document.getElementById("modal");
  modal.showModal();
};

const closeModal = () => {
  const modal = document.getElementById("modal");
  const modalForm = modal.querySelector(".modal__form");

  delete modalForm.dataset.applicationId;
  modalForm.reset();

  modal.close();
};

const createButton = document.getElementById("create-button");
createButton.addEventListener("click", () => {
  const modalTitle = document.querySelector(".modal__title");
  modalTitle.textContent = "New Application";

  const modalForm = document.querySelector(".modal__form");
  delete modalForm.dataset.applicationId;
  modalForm.reset();

  openModal();
});

const closeButton = document.querySelector(".modal__close-button");
closeButton.addEventListener("click", closeModal);

const modalForm = document.querySelector(".modal__form");
modalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const roleInput = document.querySelector(`.modal__input[name="role"]`);
  const role = roleInput.value.trim();

  const companyInput = document.querySelector(`.modal__input[name="company"]`);
  const company = companyInput.value.trim();

  if (!role || !company) return;

  const applicationId = modalForm.dataset.applicationId;

  if (applicationId) {
    updateApplication(applicationId, { role, company });
  } else {
    createApplication(role, company);
  }

  closeModal();

  renderItems();
});

// item menu
export const addMenuListeners = (item) => {
  // open kebab menu
  const itemButton = item.querySelector(".item__button");
  const itemMenu = item.querySelector(".item__menu");

  itemButton.addEventListener("click", () => {
    // close all other menus
    document.querySelectorAll(".item__menu").forEach((menu) => {
      if (menu !== itemMenu) {
        menu.style.display = "none";
      }
    });

    // toggle current menu
    if (itemMenu.style.display === "none") {
      itemMenu.style.display = "flex";
    } else {
      itemMenu.style.display = "none";
    }
  });

  // update application
  const updateButton = item.querySelector(".item__update-button");
  updateButton.addEventListener("click", () => {
    const applicationId = item.dataset.id;

    const application = applications.find((app) => app.id === applicationId);
    if (!application) return;

    const roleInput = document.querySelector(`.modal__input[name="role"]`);
    roleInput.value = application.role;

    const companyInput = document.querySelector(
      `.modal__input[name="company"]`,
    );
    companyInput.value = application.company;

    const modalTitle = document.querySelector(".modal__title");
    modalTitle.textContent = "Update Application";

    const modalForm = document.querySelector(".modal__form");
    modalForm.dataset.applicationId = applicationId;

    openModal();

    const itemMenu = item.querySelector(".item__menu");
    itemMenu.style.display = "none";
  });

  // delete application
  const deleteButton = item.querySelector(".item__delete-button");
  deleteButton.addEventListener("click", () => {
    const applicationId = item.dataset.id;

    deleteApplication(applicationId);

    renderItems();
  });
};
