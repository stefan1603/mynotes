"use strict";
const notes = [
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
  const button = document.getElementById("add");
  button.addEventListener("click", handleClick);
});

//Normale Klick-Funktion
function handleClick() {
  add();
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
