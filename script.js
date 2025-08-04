// Global Variables

const itemInput = document.querySelector("#item-input");
const list = document.querySelector("#item-list");
const form = document.querySelector("#item-form");

// Functions

// Add Item
const onSubmit = (e) => {
  e.preventDefault();

  const item = itemInput.value;

  if (item.trim() === "") {
    alert("Please add an item");
    itemInput.value = "";

    return;
  }

  const listItem = document.createElement("li");
  listItem.className = "item";

  const deleteButton = document.createElement("button");

  deleteButton.className = "remove-item btn-link text-red";

  const icon = document.createElement("i");

  icon.className = "fa-solid fa-xmark";

  deleteButton.appendChild(icon);
  listItem.appendChild(document.createTextNode(item));
  listItem.appendChild(deleteButton);

  list.appendChild(listItem);

  itemInput.value = "";
};

// Event Listeners

form.addEventListener("submit", onSubmit);
