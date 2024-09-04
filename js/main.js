//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
// Every time the button is clicked with a new drink it is added into the array... find a way so the array is empty whenever the button is clicked
//for it not to loop over multiple different drinks
document.querySelector("button").addEventListener("click", search);
const select = document.querySelector("#drink-select");
let p = document.querySelector(".error");
let instructions = document.querySelector(".instructions");
let intervalID;
let errorMessage = "";

function search() {
  let cocktailName = document.querySelector("input").value;
  if (cocktailName === "") {
    p.textContent = "Please enter a valid drink";
  } else {
    p.textContent = "";

    if (intervalID) {
      clearInterval(intervalID);
    }

    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.drinks);
        console.log(data.drinks[0].strInstructions);
        console.log(data.drinks[0].strMeasure1);

        // This section is to generate images, names and instructions from the API and put them into empty arrays
        let drinkImages = []; // Contains all the images for the different cocktails
        let drinkName = [];
        let drinkInstructions = [];

        select.innerHTML = "";
        for (let i = 0; i < data.drinks.length; i++) {
          drinkImages.push(data.drinks[i].strDrinkThumb);
          drinkName.push(data.drinks[i].strDrink);
          drinkInstructions.push(data.drinks[i].strInstructions);

          const option = document.createElement("option");
          option.value = data.drinks[i].strDrink;
          option.innerText = data.drinks[i].strDrink;
          select.appendChild(option);
        }

        let currentIndex = 0;

        // Called function for immediate search
        displaySearch();
        function displaySearch() {
          document.querySelector("img").src = drinkImages[currentIndex];
          document.querySelector("h2").innerText = drinkName[currentIndex];

          currentIndex++;

          if (currentIndex >= drinkImages.length) {
            currentIndex = 0;
          }
        }
        // Start a new interval for current search
        intervalID = setInterval(displaySearch, 4000);

        // With default 0 index drink instructions, changes drink type instructions with click
        instructions.textContent = drinkInstructions[0];
        select.addEventListener("change", (event) => {
          const selectedDrink = event.target.value;
          const index = drinkName.indexOf(selectedDrink);
          instructions.textContent = drinkInstructions[index];
        });
      })
      .catch((err) => {
        console.log(`error ${err}`);
        p.textContent = "Please enter a valid drink";
      });
  }
}
