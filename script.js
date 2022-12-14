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

  item.id = note.id; //Note hat id, weil es ein Objekt ist
  /* The id property of the Element interface
   represents the element's identifier, reflecting the id global attribute. 
*/
  item.classList.add("note");

  //Baue grundaufbau von einem Eintrag
  const article = document.createElement("article");
  //article ist der "ganze Eintrag"
  const title = document.createElement("header");
  title.textContent = note.title;
  title.classList.add("note__title");
  const text = document.createElement("p");
  text.textContent = note.text;
  text.classList.add("note__text");

  const controls = document.createElement("div");
  controls.classList.add("note__controls");
  const button = document.createElement("button");

  button.classList.add("note__controls__delete");
  button.addEventListener("click", handleClickDelete(note.id));
  //icon wird erstellt als Button - Trash
  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-trash");
  button.appendChild(icon);
  controls.appendChild(button);

  article.appendChild(title);
  article.appendChild(text);
  article.appendChild(controls);
  item.appendChild(article);

  return item;
}

//Warte bis DOM-Elemente geladen wurden
//So ähnlich wie windows.eventListener "load" ????
//          domloaded vs windows.load
//The DOMContentLoaded event is fired when the document has been
//completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish
//loading (the load event can be used to detect a fully-loaded page)
document.addEventListener("DOMContentLoaded", function () {
  init();
});

//Normale Klick-Funktion
function handleClick() {
  add();
  save();
}

//Löschen von Elementen ... UND GIBT eine Funktion zurück
function handleClickDelete(id) {
  return function () {
    const item = document.getElementById(id);
    const list = document.getElementById("list");
    list.removeChild(item);

    //Arrow-Funktion ... jeder Eintrag im Array (bestehend aus Objekte)
    //hat seine "eigene Funktion"
    const pos = notes.findIndex((note) => note.id === id); //es wird durchgegangen welcher Eintrag die geleiche id hat
    notes.splice(pos, 1); //Eintrag von pos wird gelöscht
  };
}

function handleRegistration(registration) {
  registration.addEventListener("updatefound", function () {
    if (registration.installing) {
      const worker = registration.installing;
      worker.addEventListener("statechange", function () {
        if (worker.state === "installed") {
          handleUpdate(worker);
        }
      });
    } else if (registration.waiting) {
      const worker = registration.waiting;
      if (worker.state === "installed") {
        handleUpdate(worker);
      }
    }
  });
}

function handleUpdate(worker) {
  if (navigator.serviceWorker.controller) {
    const modal = document.getElementById("service-worker");
    const button = document.getElementById("service-worker-control");
    button.addEventListener("click", function () {
      worker.postMessage({ action: "skipWaiting" });
      modal.style.display = "none";
    });
    modal.style.display = "block";
  }
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
  //length = 10 ist der Default-Wert
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
  if ("serviceWorker" in navigator) {
    let refreshing;
    navigator.serviceWorker.addEventListener("controllerchange", function () {
      if (refreshing) return;
      window.location.reload();
      refreshing = true;
    });
    navigator.serviceWorker
      .register("/notes/sw.js", { scope: "/notes/ " })
      .then((registration) => handleRegistration(registration))
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
