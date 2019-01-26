// this program each time in for loop read / get data (strings) from localStorage when site is reloaded.
document.addEventListener("DOMContentLoaded", function() {
  var btnSave = document.querySelector("#save");
  var textarea = document.querySelector("textarea");
  var list = document.querySelector("#list");
  var counter = localStorage.length + 1;

  // get the loop for localStorage data ( it is an array / obj)
  for (var i = 0; i < localStorage.length; i++) {
    // we only read our notes from storage
    if (localStorage.key(i).indexOf("note") !== -1) {
      // create remove button ( then we will add it to each item)
      var buttonRemove = document.createElement("button");
      var buttonText = document.createTextNode("x");
      buttonRemove.appendChild(buttonText);
      buttonRemove.setAttribute("class", "delete");

      var li = document.createElement("li");
      // li.setAttribute("class", "display");
      li.textContent = localStorage.getItem(localStorage.key(i));
      // li.appendChild(buttonRemove);
      // list.appendChild(li).appendChild(buttonRemove);
      list.appendChild(li).insertBefore(buttonRemove, li.childNodes[0]);
      // list.insertBefore(li, list.childNodes[0]);
    }
  }
  // this button only save to localStorage nad show in real time each item saved to local storage with varius id. (becouse of counter added to name, who is set to increase value each time after add new value. So becouse of it we added two local variable of li element.  )
  btnSave.onclick = function() {
    var firstItem = document.createElement("li");
    // firstItem.setAttribute("class", "display");
    var textareaValue = textarea.value;

    if (textareaValue.trim() !== "") {
      //dodawaj za każdym razem do local storage - zwiekszajac nazwe wlasciwosci o 1 - tworzac kolejne itemy ktore mozna bedzie wyswietlic za pomocą pętli.
      localStorage.setItem("note" + counter, textareaValue);

      // create remove button ( then we will add it to each item)
      var buttonRemove = document.createElement("button");
      var buttonText = document.createTextNode("x");
      buttonRemove.appendChild(buttonText);
      // buttonRemove.setAttribute("class", "delete");

      firstItem.textContent = textarea.value;
      list
        .insertBefore(firstItem, list.childNodes[localStorage.length])
        // .appendChild(firstItem)
        .insertBefore(buttonRemove, firstItem.childNodes[0]); //ma wstawić przed firstItem czyli każdym li.

      //zwieksza o 1 nazwę właściwości obiektu: note1, note2, note3 - tworzac serie wpisów
      counter++;
    }
  };

  let btnClear = document.querySelector("#clear");
  btnClear.onclick = function() {
    // localStorage.removeItem("notepad");
    //wyczysc textarea
    textarea.value = "";
  };
  // let btnRemove = document.querySelector(".delete");
  // btnRemove.onclick = function() {
  //   list.removeChild(li, buttonRemove);
  //   localStorage.removeItem("note" + localStorage.length);
  // };

  let btnRemove = document.querySelector(".delete");
  btnRemove.onclick = function() {
    // var list = document.getElementById("myList"); // Get the <ul> element with id="myList"
    this.parentElement.setAttribute("class", "is-hidden");
  };
}); //end of domcontentloaded
