"use strict";

const button = document.getElementById("add");
button.addEventListener("click", handleClick);

let input = document.getElementById("text");
input.addEventListener("keydown", handleKeyDown);

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
  if (input.value) {
    let list = document.getElementById("list");
    let item = document.createElement("li");

    item.innerText = input.value; //Neu erstelltes Listenelement besitzt eingegebenen Wert
    list.appendChild(item); //hier wird Angefügt
    input.value = "";
  } else {
    alert("Füge einen Text ein");
  }
}
