import { response } from "./band-site-api.js";
import { formatDateShow } from "./utils.js";

const showsContainer = document.querySelector(".cards__list");

let shows;

async function loadShows() {
  try {
    shows = await response.getShows();
    shows.forEach((show, i) => {
      show.date = formatDateShow(shows[i].date);
    });
    renderShows(shows);
  } catch (err) {
    console.error("Error loading shows", err);
  }
}
loadShows();

createTableTitleEl();

function createElementWithClass(tag, className) {
  const el = document.createElement(tag);
  el.classList.add(className);
  return el;
}

// Function to create Date, Venue, Location titles for the cards table
function createTableTitleEl() {
  const cardTableTop = createElementWithClass("div", "show-card--top");
  showsContainer.appendChild(cardTableTop);
  const cardTitleTopDate = createElementWithClass(
    "span",
    "show-card__title--top"
  );
  cardTitleTopDate.innerText = "Date";
  cardTableTop.appendChild(cardTitleTopDate);
  const cardTitleTopVenue = createElementWithClass(
    "span",
    "show-card__title--top"
  );
  cardTitleTopVenue.innerText = "Venue";
  cardTableTop.appendChild(cardTitleTopVenue);
  const cardTitleTopLoc = createElementWithClass(
    "span",
    "show-card__title--top"
  );
  cardTitleTopLoc.innerText = "Location";
  cardTableTop.appendChild(cardTitleTopLoc);
  return cardTableTop;
}
//Functtion to create individual card elements
function createCardElement(show) {
  const cardEl = createElementWithClass("div", "show-card");

  const dateWrp = createElementWithClass("div", "show-card__date");
  cardEl.appendChild(dateWrp);
  const dateTitle = createElementWithClass("span", "show-card__title");
  dateTitle.innerText = "Date";
  dateWrp.appendChild(dateTitle);
  const dateEl = createElementWithClass("span", "show-card__content");
  dateEl.innerText = show.date;
  dateWrp.appendChild(dateEl);

  const venueWrp = createElementWithClass("div", "show-card__venue");
  cardEl.appendChild(venueWrp);
  const venueTitle = createElementWithClass("span", "show-card__title");
  venueTitle.innerText = "Venue";
  venueWrp.appendChild(venueTitle);
  const venueEl = document.createElement("span");
  venueEl.innerText = show.place;
  venueWrp.appendChild(venueEl);

  const locationWrp = createElementWithClass("div", "show-card__venue");
  cardEl.appendChild(locationWrp);
  const locationTitle = createElementWithClass("span", "show-card__title");
  locationTitle.innerText = "Location";
  locationWrp.appendChild(locationTitle);
  const locationEl = document.createElement("span");
  locationEl.innerText = show.location;
  locationWrp.appendChild(locationEl);

  const button = createElementWithClass("button", "btn-cta");
  button.classList.add("btn-cta--shows");
  cardEl.appendChild(button);
  const buttonLink = document.createElement("a");
  buttonLink.innerText = "Buy Tickets";
  buttonLink.href = "/";
  button.appendChild(buttonLink);

  return cardEl;
}

//Function to display the cards on the page
function renderShows(shows) {
  shows.forEach((show) => {
    const cardEl = createCardElement(show);
    showsContainer.appendChild(cardEl);
  });

  //Functionality to add css styles on select
  const showCards = document.querySelectorAll(".show-card");
  showCards.forEach((show) => {
    show.addEventListener("click", () => {
      document
        .querySelector(".show-card--selected")
        ?.classList.remove("show-card--selected");
      show.classList.toggle("show-card--selected");
    });
  });
}
