import { applications } from "../crud.js";
import {
  appliedCount,
  inProgressCount,
  offerCount,
  rejectedCount,
} from "../crud.js";
import { addKebabListeners } from "./menus.js";
import { addDragListeners } from "./dragAndDrop.js";

export const renderCounts = () => {
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

export const renderItems = () => {
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

      <button class="item__button" type="button">⁝</button>

      <div class="item__options" style="display: none;">
        <button class="item__update-button" type="button">✏️ Edit</button>

        <button class="item__delete-button" type="button">🗑️ Delete</button>
      </div>
    </div>

    <div class="item__details">
      <p class="item__company">${application.company}</p>

      <p class="item__date">${application.dateApplied.toLocaleDateString()}</p>
    </div>
    `;

    // attach event listeners
    addKebabListeners(item);

    addDragListeners(item);

    // render onto page
    dropzone.appendChild(item);

    renderCounts();
  });
};
renderItems();
