// _____________________background image depends what time is it - start
let currentHour = new Date();
let body = document.querySelector("body");
if (
  (currentHour.getHours() >= 0 && currentHour.getHours() <= 6) ||
  currentHour.getHours() >= 21
) {
  body.style.backgroundImage = "url('img/landscape-night.svg')";
} else if (currentHour.getHours() >= 7 && currentHour.getHours() <= 8) {
  body.style.backgroundImage = "url('img/landscape-sunrise.svg')";
} else if (currentHour.getHours() >= 9 && currentHour.getHours() <= 18) {
  body.style.backgroundImage = "url('img/landscape-day.svg')";
} else if (currentHour.getHours() >= 19 && currentHour.getHours() <= 20) {
  body.style.backgroundImage = "url('img/landscape-sunset.svg')";
} else {
  alert("other hour");
}

// _____________________background image depends what time is it - end

// BARDZO WAZNA JEST KOLEJNOSC BO INACZEJ LOC BY NIE BYL WIDZIANY
//   znajdz button
let btn = document.querySelector("button");
//znajdz input
let input = document.querySelector("input");
let img = document.querySelector(".img");
btn.onclick = function() {
  var loc = input.value.trim(); //loc musi byc wewnatrz funkcji
  // var loc = input.value.trim(); //obcina biale znaki i nie mozna tez szukac bialych znakow bo ich nie bedzie. NIEDZIALA. DODAC TEZ IFA
  // przypisz input do loca

  //___________________________________
  //FUNKCJA Z ktorej korzystamy wewnatrz fetcha by nie bylo ileś miejsc po przecinku - wynik
  function calculate(kelvin) {
    return Math.floor(kelvin - 272.15);
  }
  //function to capitalize first letter of city.
  function capitalizeFirstLetter(string) {
    //wybiera pierwszy symbol z naszej zmiennej i podnosi do dużej litery. "+string.slice(1)" docina resztę tzn. np. arsaw ( z warsaw).
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  //___________________________________
  //wykonaj fetch zmieniajac zmienna loc
  if (loc !== "") {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        loc +
        "&appid=ae76d0efed32d9f29c4d54a5738b80ca"
    )
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        //   if city exist - the also cod = 200 - like true - we have to check it - is name existing
        if (myJson.cod === 200) {
          //___________________________________________________
          document.querySelector(
            ".wynik"
          ).innerText = `Temperature in  ${capitalizeFirstLetter(
            loc
          )} is ${calculate(myJson.main.temp)} C.`; //teraz w body liczy nam celsiusz a w kosoli kelwiny. gdzies w api tego openweather zmienia sie ustawienie by bylo celciusze
          //____________________________________________________

          if (calculate(myJson.main.temp) < 0) {
            img.style.backgroundPosition = "-900px top";
          } else if (
            calculate(myJson.main.temp) >= 0 &&
            calculate(myJson.main.temp) <= 18
          ) {
            img.style.backgroundPosition = "left top";
          } else if (calculate(myJson.main.temp) >= 18) {
            img.style.backgroundPosition = "-300px top ";
          }
        } else {
          modal.classList.add("is-active");
          modalParapraph.innerText =
            " You typed wrong name, please type once again.";
        }
      });
  } else {
    modal.classList.add("is-active");
    modalParapraph.innerText = "You didn't type city. Please fill it out.";
  }
};

//Trigger a Button Click on Enter -- additional option.
input.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    btn.onclick();
  }
});
//_________________________________________________________delete modal.
const btnDelete = document.querySelector(".delete");
let modal = document.querySelector(".modal");
let modalParapraph = document.querySelector("#paragraph");

btnDelete.onclick = function() {
  modal.classList.remove("is-active");
};

//calosc jest na stackblitz.com/@medi71   trzbea dodac obsluche bledow przez kody 200 - poprawny , 404 zly . wszystkie powyzej 400 sa zle
