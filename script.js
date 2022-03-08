const resultsNav = document.getElementById("resultsNav");
const favoriteNav = document.getElementById("favoritesNav");
const imagesContainer = document.querySelector(".image-container");
const saveConfirmed = document.querySelector(".saveConfirmed");
const loader = document.querySelector(".loader");

// Nasa APi
const count = 14;
const apiKey = "DEMO_KEY";
const apiUri = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

function updateDom() {
  resultsArray.forEach((result) => {
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
    saveText.textContent = "Add To Favorites";
    // creating save

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

// get 10 Image from Nasa Api
async function getNasaPicture() {
  try {
    //   fetch data // assign it to json
    let response = await fetch(apiUri);
    resultsArray = await response.json();
    console.log(resultsArray);
    updateDom();
  } catch (error) {}
}
getNasaPicture();
