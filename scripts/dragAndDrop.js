// https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Kanban_board

const items = document.querySelectorAll(".item");
items.forEach((item) => {
  item.addEventListener("dragstart", (event) => {
    item.id = "dragged-item";

    event.dataTransfer.effectAllowed = "move";

    // custom data type
    event.dataTransfer.setData("item", "");
  });

  item.addEventListener("dragend", (event) => {
    item.removeAttribute("id");
  });
});

const makePlaceholder = (draggedItem) => {};

const movePlaceholder = (event) => {};

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

    draggedItem.remove();

    column.children[2].appendChild(draggedItem); // [div, p, ul]
  });
});
