"use strict";

const notesApp = new Vue({
  el: "#app",

  data: {
    text: "My Notes",
    newTitle: "",
    newInput: "",
    notes: [{}],
  },
  methods: {
    handleClick: function () {
      this.notes.push({
        title: this.newTitle,
        input: this.newInput,
        id: generateId(this.newTitle, this.newInput),
      });
      localStorage.setItem("notes", JSON.stringify(this.notes));
      this.newInput = "";
      this.newTitle = "";
    },

    handleDelete: function (event) {
      this.notes.splice(this.notes.indexOf(event), 1);
    },
  },
});

//Generiert eine Einzigartige ID für jeden EIntrag
function generateId(title, text, length = 10) {
  //length = 10 ist der Default-Wert
  return CryptoJS.SHA256(title + text + new Date())
    .toString()
    .substring(0, length);
}
