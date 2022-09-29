/*"use strict";

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
);*/

"use strict";
window.addEventListener(
  "load",
  function () {
    const button = document.getElementById("add");
    button.addEventListener("click", function () {
      let input = document.getElementById("text");
      //let note = input.value;

      let list = document.getElementById("list");
      let item = document.createElement("li");
      item.innerText = input.value;
      list.appendChild(item);
    });
  },
  false
);
