"use strict";
let notes = [
  //"Note 1"
  //"Note 2"
  // ...
  // { id: "676c9ba771", title: "Title 1", text: "ToDo 1" },
  // { id: "dc19d1538f", title: "Title 2", text: "ToDo 2" },
  // { id: "fd8c75b4fb", title: "Title 3", text: "ToDo 2" },
];

function buildItem(note) {
  let item = document.createElement("li");

  item.id = note.id;
  /* The id property of the Element interface
   represents the element's identifier, reflecting the id global attribute. 
*/

  //Baue grundaufbau von einem Eintrag
  const article = document.createElement("article");
  //article ist der "ganze Eintrag"
  const title = document.createElement("header");
  title.textContent = note.title;
  const text = document.createElement("p");
  text.textContent = note.text;

  const controls = document.createElement("div");
  const button = document.createElement("button");
  button.textContent = "Delete";
  button.addEventListener("click", handleClickDelete(note.id));
  controls.appendChild(button);

  article.appendChild(title);
  article.appendChild(text);
  article.appendChild(controls);
  item.appendChild(article);

  return item;
}

//Warte bis DOM-Elemente geladen wurden
//So ähnlich wie windows.eventListener "load" ????
document.addEventListener("DOMContentLoaded", function () {
  init();
});

//Normale Klick-Funktion
function handleClick() {
  add();
  save();
}

//Löschen von Elementen
function handleClickDelete(id) {
  return function () {
    const item = document.getElementById(id);
    const list = document.getElementById("list");
    list.removeChild(item);

    //????
    const pos = notes.findIndex((note) => note.id === id);
    notes.splice(pos, 1);
  };
}

//Funktion zum Dranhängen der Eingabe
function add() {
  const title = document.getElementById("title");
  const text = document.getElementById("text");

  if (title.value || text.value) {
    //Wenn es einen Eintrag gegeben hat, füge etwas hinzu
    const list = document.getElementById("list");
    const note = createNote(title.value, text.value);
    const item = buildItem(note);
    list.appendChild(item);
    notes.push(note);
    title.value = ""; //leere Eintrag
    text.value = ""; //leere Eintrag
  }
}

//Generiert den Eintrag
function createNote(title, text) {
  const id = generateId(title, text);
  return { id, title, text };
}

//Generiert eine Einzigartige ID für jeden EIntrag
function generateId(title, text, length = 10) {
  return CryptoJS.SHA256(title + text + new Date())
    .toString()
    .substring(0, length);
}

function init() {
  registerEventHandlers();
  load();
  draw();
  registerServiceWorker();
}

function registerEventHandlers() {
  //bei Klick soll Eventhandler ausgeführt werden
  const button = document.getElementById("add");
  button.addEventListener("click", handleClick);
}

function registerServiceWorker() {
  //implementier service-worker
  //????
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/notes/sw.js", { scope: "/notes/ " })
      .then((registration) =>
        console.log("Service Worker registered!", registration)
      )
      .catch((error) =>
        console.log("Service Worker registration failed!", error)
      );
  }
}

function load() {
  //lade daten VON LocalStorage
  notes = JSON.parse(localStorage.getItem("notes")) || [];
  //aus JSON-Daten werden JS-Objekte .. damit kann man arbeiten
}

function save() {
  //speichere eingetragene Notes in local storage

  localStorage.setItem("notes", JSON.stringify(notes));
}

function draw() {
  //Zeichne mir die Notizen welche da sind
  const list = document.getElementById("list");
  //????
  while (list.firstChild) list.removeChild(list.firstChild);
  notes.forEach((note) => list.appendChild(buildItem(note)));
}
