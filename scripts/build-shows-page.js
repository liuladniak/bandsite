const shows = [
  {
    date: "Mon Sept 09 2024",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tue Sept 17 2024",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Oct 12 2024",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 16 2024",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Nov 29 2024",
    venue: "Toronto Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 18 2024",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];
const showsContainer = document.querySelector(".cards__list");
function createElementWithClass(tag, className) {
  const el = document.createElement(tag);
  el.classList.add(className);
  return el;
}
function createTableTitleEl() {
  const cardTableTop = document.createElementWithClass("div", "show-card--top");
  const cardTitleTopDate = document.createElementWithClass(
    "span",
    "show-card__title--top"
  );
  cardTitleTopDate.innerText = "Date";
  cardTableTop.appendChild(cardTitleTopDate);
  const cardTitleTopVenue = document.createElementWithClass(
    "span",
    "show-card__title--top"
  );
  cardTitleTopVenue.innerText = "Venue";
  cardTableTop.appendChild(cardTitleTopVenue);
  const cardTitleTopLoc = document.createElementWithClass(
    "span",
    "show-card__title--top"
  );
  cardTitleTopLoc.innerText = "Location";
  cardTableTop.appendChild(cardTitleTopLoc);
  showsContainer.appendChild(cardTableTop);
}

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
  venueEl.innerText = show.venue;
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

function renderShows(shows) {
  shows.forEach((show) => {
    const cardEl = createCardElement(show);
    showsContainer.appendChild(cardEl);
  });
}

renderShows(shows);

const showCards = document.querySelectorAll(".show-card");
showCards.forEach((show) => {
  show.addEventListener("click", () => {
    document
      .querySelector(".show-card--selected")
      ?.classList.remove("show-card--selected");
    show.classList.add("show-card--selected");
  });
});
