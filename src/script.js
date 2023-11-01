"use strict";

const addItems = document.querySelector(".add-items");
const itemList = document.querySelector(".plates");

let store = localStorage.getItem("todoList")
  ? JSON.parse(localStorage.getItem("todoList"))
  : [];

const AddToList = (event) => {
  event.preventDefault();

  const item = document.querySelector('[name="item"]').value.trim();

  if (item) {
    const list = { text: item, isChecked: false };
    store = [...store, list];
    renderList(store);
    localStorage.setItem("todoList", JSON.stringify(store));
  }
  addItems.reset();
};

function renderList(lists = []) {
  itemList.innerHTML = lists
    .map(
      (list, i) =>
        `
      <li>
        <input type="checkbox" ${list.isChecked ? "checked" : ""} id=${i}  />
        <label for=${i}><span>${list.text}</span></label>
        <button class="delete" id =${i}>x</button>
      </li>
    `
    )
    .join("");
}

function deleteItem(event) {
  if (!event.target.matches("button")) return;

  const index = event.target.id;
  const storeCopy = [...store];
  storeCopy.splice(index, 1); //[1,2,4,5,6]
  store = storeCopy;
  localStorage.setItem("todoList", JSON.stringify(store));
  renderList(storeCopy);
}

function checkItem(event) {
  if (!event.target.matches("input")) return;

  const index = event.target.id;
  const storeCopy = [...store];

  storeCopy[index].isChecked = !storeCopy[index].isChecked;

  store = storeCopy;
  localStorage.setItem("todoList", JSON.stringify(store));
  renderList(storeCopy);
}

renderList(store);

itemList.addEventListener("click", deleteItem);
itemList.addEventListener("click", checkItem);
addItems.addEventListener("submit", AddToList);
