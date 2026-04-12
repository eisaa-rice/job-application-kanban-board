// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Kanban_board
const columns = document.querySelectorAll(".column");
const items = document.querySelectorAll(".item");

items.forEach((item) => {
  item.addEventListener("dragstart", (event) => {
    item.id = item.dataset.id; // TODO: maybe change to a constant id, such as "active" or "dragged" or smth

    event.dataTransfer.effectAllowed = "move";

    event.dataTransfer.setData("item", ""); // TODO: idk what this is
  });

  item.addEventListener("dragend", (event) => {
    item.removeAttribute("id");
  });
});

const makePlaceholder = (draggedItem) => {};

const movePlaceholder = (event) => {};
