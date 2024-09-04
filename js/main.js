//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
// Every time the button is clicked with a new drink it is added into the array... find a way so the array is empty whenever the button is clicked
//for it not to loop over multiple different drinks
document.querySelector("button").addEventListener("click", search);
let p = document.querySelector(".error");

let intervalID;
let errorMessage = "";

function search() {
  let cocktailName = document.querySelector("input").value;
  if (cocktailName === "") {
    console.log("Bollocks");
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
        console.log(data);

        // This section is to generate images, names and instructions from the API and put them into empty arrays
        let drinkImages = []; // Contains all the images for the different cocktails
        let drinkName = [];
        let drinkInstructions = [];

        for (let i = 0; i < data.drinks.length; i++) {
          drinkImages.push(data.drinks[i].strDrinkThumb);
          drinkName.push(data.drinks[i].strDrink);
          drinkInstructions.push(data.drinks[i].strInstructions);
        }

        let currentIndex = 0;

        // Called function for immediate search
        displaySearch();
        function displaySearch() {
          document.querySelector("img").src = drinkImages[currentIndex];
          document.querySelector("h2").innerText = drinkName[currentIndex];
          document.querySelector("h3").innerText =
            drinkInstructions[currentIndex];

          currentIndex++;

          if (currentIndex >= drinkImages.length) {
            currentIndex = 0;
          }
        }
        // Start a new interval for current search
        intervalID = setInterval(displaySearch, 4000);
      })
      .catch((err) => {
        console.log(`error ${err}`);
        p.textContent = "Please enter a valid drink";
      });
  }
}
