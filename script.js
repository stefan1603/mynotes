"use strict";
const notes = [
  //"Note 1"
  //"Note 2"
  // ...
];

function buildItem(note) {
  let item = document.createElement("li");
  item.textContent = note;
  item.addEventListener("click", handleClickLIItem);
  return item;
}

//Warte bis DOM-Elemente geladen wurden
//So ähnlich wie windows.eventListener "load" ????
document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("add");
  button.addEventListener("click", handleClick);

  const input = document.getElementById("text");
  input.addEventListener("keydown", handleKeyDown);
});

//Funktion bei "Enter"-Klick
function handleKeyDown(event) {
  if (event.key === "Enter") {
    add();
  }
}

//Normale Klick-Funktion
function handleClick() {
  add();
}

//Funktion zum Dranhängen der Eingabe
function add() {
  let input = document.getElementById("text");
  const note = input.value;
  if (note) {
    let list = document.getElementById("list");
    const item = buildItem(note);
    list.appendChild(item); //hier wird Angefügt
    notes.push(note);
    input.value = "";
    input.focus();
  } else {
    alert("Füge einen Text ein");
  }
}

//Löschen von Elementen
function handleClickLIItem(event) {
  const list = document.getElementById("list");
  list.removeChild(event.target);
}
