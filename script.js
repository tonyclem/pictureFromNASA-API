const resultsNav = document.getElementById("resultsNav");
const favoritesNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".image-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

// Nasa APi
const count = 10;
const apiKey = "DEMO_KEY";
const apiUri = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

// ShowContent
function showContent(page) {
  window.scrollTo({ top: 0, behavior: "instant" });
  // if condition to check if the page is equal to results and show the hidden or remove the hidden
  if (page === "results") {
    resultsNav.classList.remove("hidden");
    favoritesNav.classList.add("hidden");
  } else {
    resultsNav.classList.add("hidden");
    favoritesNav.classList.remove("hidden");
  }
  loader.classList.add("hidden");
}

function createDOMNodes(page) {
  // create a currentArray to get item from, localStorage or to fetch from Api
  const currentArray =
    page === "results" ? resultsArray : Object.values(favorites);

  currentArray.forEach((result) => {
    // Card container / created new card
    const card = document.createElement("div");
    // added style, with card from css
    card.classList.add("card");

    // link
    const link = document.createElement("a");
    link.href = result.apiUri;
    // title that we display on the page
    link.title = "View Full Image";
    // target blank / open in new target
    link.target = "_blank";

    // Image // create a an img tag
    const image = document.createElement("img");
    image.src = result.hdurl;
    image.alt = "NASA PICTURE of the Day";
    // to reduced page load times
    image.loading = "lazy";
    // added style, with card-img from css
    image.classList.add("card-img-top");

    // Card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    // Card Title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result.title;
    // Save Text
    const saveText = document.createElement("p");
    saveText.classList.add("clickable");
    // condition to compared the values if result is true or false
    if (page === "results") {
      saveText.textContent = "Add To Favorites";
      // creating added to favorite / onclick asset
      saveText.setAttribute("onclick", `saveFavorite('${result.url}')`);
    } else {
      saveText.textContent = "Remove Favorites";
      // creating added to favorite / onclick asset
      saveText.setAttribute("onclick", `removeFavorite('${result.url}')`);
    }

    // Card Text / created paragraph
    const cardText = document.createElement("p");
    // add the text
    cardText.textContent = result.explanation;

    // Footer Container
    const footer = document.createElement("small");
    footer.classList.add("text-muted");

    // Date
    const date = document.createElement("strong");
    // added data from the api
    date.textContent = result.date;

    // CopyRight
    const copyrightResult =
      result.copyright === undefined ? "" : result.copyright;
    const copyright = document.createElement("span");
    copyright.textContent = `${copyrightResult}`;

    // Append
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
  });
}

function updateDOM(page) {
  // Get favorites from localStorage
  if (localStorage.getItem("nasaFavorites")) {
    // to convert text into a JavaScript object parse / and if we can't get the item from localStorage  return favorites
    favorites = JSON.parse(localStorage.getItem("nasaFavorites"));
  }
  // reset all the element
  imagesContainer.textContent = "";
  createDOMNodes(page);
  //   showContent(page);
}

// get 10 Image from Nasa Api
async function getNasaPicture() {
  // Show Loader
  loader.classList.remove("hidden");
  try {
    //   fetch data // assign it to json
    const response = await fetch(apiUri);
    resultsArray = await response.json();
    updateDOM("results");
  } catch (error) {}
}

// Add result to Favorites
function saveFavorite(itemUrl) {
  //   console.log(itemUrl);
  //  Loop through result array to select Favorite
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;

      // show confirmation for 2 seconds
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);
      // Set Favorites in localStorage
      localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    }
  });
}

// Remove item from Favorites Storage
function removeFavorite(itemUrl) {
  // if condition statement
  if (favorites[itemUrl]) {
    // delete from the item favorite
    delete favorites[itemUrl];
    // Set Favorites in localStorage
    localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    // update the dom
    updateDOM("favorites");
  }
}

getNasaPicture();
