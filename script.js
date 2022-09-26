"use strict";

window.addEventListener(
  "load",
  function () {
    let btn = document.getElementById("mybtn");
    let input = document.getElementById("text");
    let list = document.getElementById("list");

    btn.addEventListener(
      "click",
      function () {
        let myli = document.createElement("li");
        myli.innerText = input.value;
        list.append(myli);
        input.value = "";
      },
      false
    );
  },
  false
);
