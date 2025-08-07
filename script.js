// Global Variables

const itemInput = document.querySelector("#item-input");
const list = document.querySelector("#item-list");
const form = document.querySelector("#item-form");
const clearButton = document.querySelector("#clear");
const itemFilter = document.querySelector("#filter");
const formBtn = form.querySelector("button");
let isEditMode = false;

// Functions

const displayItem = () => {
  const itemFromStorage = getItemsFromStorage();

  itemFromStorage.forEach((item) => addItemToDOM(item));

  checkUI();
};

// Add Item
const onAddItemSubmit = (e) => {
  e.preventDefault();

  const item = itemInput.value;

  if (item.trim() === "") {
    alert("Please add an item");
    itemInput.value = "";

    return;
  }

  if (isEditMode) {
    const itemToEdit = list.querySelector(".edit-mode");

    if (checkIfItemExist(item) && item !== itemToEdit.textContent) {
      alert("That item already exists!");
      return;
    }

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExist(item)) {
      alert("That item already exists!");
      return;
    }
  }

  addItemToDOM(item);
  addItemToStorage(item);

  checkUI();

  itemInput.value = "";
};

const addItemToDOM = (item) => {
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
};

const addItemToStorage = (item) => {
  let itemFromStorage = getItemsFromStorage();

  itemFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
};

const onClickItem = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
};

const checkIfItemExist = (item) => {
  const itemFromStorage = getItemsFromStorage();

  return itemFromStorage.includes(item);
};

const setItemToEdit = (item) => {
  isEditMode = true;
  list.querySelectorAll("li").forEach((i) => {
    i.classList.remove("edit-mode");
  });
  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = "#228b22";
  itemInput.value = item.textContent;
};

const removeItem = (item) => {
  if (confirm("Are you sure?")) {
    // Remove item from DOM
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
};

const removeItemFromStorage = (item) => {
  let itemFromStorage = getItemsFromStorage();

  itemFromStorage = itemFromStorage.filter((i) => i !== item);
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
};

const clearItems = (e) => {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  localStorage.removeItem("items");

  checkUI();
};

const checkUI = () => {
  itemInput.value = "";
  const items = list.querySelectorAll("li");

  if (items.length === 0) {
    clearButton.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearButton.style.display = "block";
    itemFilter.style.display = "block";
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#333";

  isEditMode = false;
};

const filter = (e) => {
  const searchFor = e.target.value.toLowerCase();
  const items = Array.from(list.querySelectorAll("li"));

  items.map((item) => {
    if (item.firstChild.textContent.toLowerCase().includes(searchFor)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
};

const getItemsFromStorage = () => {
  let itemFromStorage;

  if (localStorage.getItem("items") === null) {
    itemFromStorage = [];
  } else {
    itemFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemFromStorage;
};

// Initialize app
function init() {
  // Event Listeners

  form.addEventListener("submit", onAddItemSubmit);
  list.addEventListener("click", onClickItem);
  clearButton.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filter);
  document.addEventListener("DOMContentLoaded", displayItem);

  checkUI();
}

init();
