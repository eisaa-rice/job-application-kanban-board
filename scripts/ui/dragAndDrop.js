// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Kanban_board

import { updateApplication } from "../crud.js";
import { renderCounts } from "./render.js";

export const addDragListeners = (item) => {
  item.addEventListener("dragstart", (event) => {
    item.id = "dragged-item";

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("item", "");
  });

  item.addEventListener("dragend", () => {
    item.removeAttribute("id");
  });
};

const columns = document.querySelectorAll(".column");
columns.forEach((column) => {
  column.addEventListener("dragover", (event) => {
    // check for custom data type
    if (event.dataTransfer.types.includes("item")) {
      // allow item to drop onto column
      event.preventDefault();
    }
  });

  column.addEventListener("drop", (event) => {
    event.preventDefault();

    const draggedItem = document.getElementById("dragged-item");

    const draggedItemId = draggedItem.dataset.id;

    updateApplication(draggedItemId, { status: column.id });

    column.children[2].appendChild(draggedItem); // [div, p, ul]

    renderCounts();
  });
});
