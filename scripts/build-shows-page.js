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

function createElementWithClass(tag, className) {
  const el = document.createElement(tag);
  el.classList.add(className);
  return el;
}

function createCardElement(comment) {
  const cardEl = createElementWithClass("div", "show-card");

  const dateWrp = createElementWithClass("div", "show-card__date");
  cardEl.appendChild(dateWrp);
  const dateTitle = createElementWithClass("span", "show-card__title");
  dateWrp.appendChild(dateTitle);
  const dateEl = createElementWithClass("span", "show-card__content");
  dateWrp.appendChild(dateEl);

  const venueWrp = createElementWithClass("div", "show-card__venue");
  cardEl.appendChild(venueWrp);
  const venueTitle = createElementWithClass("span", "show-card__title");
  venueWrp.appendChild(venueTitle);
  const venueEl = document.createElement("span");
  venueWrp.appendChild(venueEl);

  const locationWrp = createElementWithClass("div", "show-card__venue");
  cardEl.appendChild(locationWrp);
  const locationTitle = createElementWithClass("span", "show-card__title");
  locationWrp.appendChild(locationTitle);
  const locationEl = document.createElement("span");
  locationWrp.appendChild(locationEl);

  const button = createElementWithClass("button", "btn-cta");
  cardEl.appendChild(button);
  const buttonLink = document.createElement("a");
  button.appendChild(buttonLink);

  return cardEl;
}

function renderShows(shows) {
  const showsContainer = document.querySelector(".cards__list");
  shows.forEach((show) => {
    const cardEl = createCardElement(show);
    showsContainer.appendChild(cardEl);
  });
}

renderShows(shows);
