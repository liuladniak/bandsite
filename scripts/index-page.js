const comments = [
  {
    name: "Victor Pinto",
    dateAdded: formatDate(new Date("11/02/2023")),
    comment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },

  {
    name: "Christina Cabrera",
    dateAdded: formatDate(new Date("10/28/2023")),
    comment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Isaac Tadesse",
    dateAdded: formatDate(new Date("10/20/2023")),
    comment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

function formatDate(date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function createElementWithClass(tag, className) {
  const el = document.createElement(tag);
  el.classList.add(className);
  return el;
}

function createCardElement(comment) {
  const cardEl = createElementWithClass("div", "comment__card");

  let userAvatar;
  if (comment.avatar) {
    userAvatar = createElementWithClass("img", "user-avatar");
    userAvatar.src = comment.avatar;
    userAvatar.alt = "User avatar image";
  } else {
    userAvatar = createElementWithClass("div", "user-avatar");
  }

  cardEl.appendChild(userAvatar);

  const commentContentEl = createElementWithClass("div", "user__comment");

  const headingWrpEl = createElementWithClass("div", "comment__heading");
  const userNameEl = createElementWithClass("h3", "user-name");
  const datePosted = createElementWithClass("p", "comment__date");

  userNameEl.innerText = comment.name;
  headingWrpEl.appendChild(userNameEl);

  datePosted.innerText = comment.dateAdded;
  headingWrpEl.appendChild(datePosted);

  commentContentEl.appendChild(headingWrpEl);

  const commentEl = createElementWithClass("p", "comment__content");
  commentEl.innerText = comment.comment;
  commentContentEl.appendChild(commentEl);

  cardEl.appendChild(commentContentEl);

  return cardEl;
}

function renderComments(comments) {
  const commentsContainer = document.querySelector(".comments--posted");
  commentsContainer.innerHTML = "";
  comments.forEach((comment) => {
    const cardEl = createCardElement(comment);
    commentsContainer.appendChild(cardEl);
  });
}

function addNewComment(e) {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value;
  const date = new Date();
  const comment = form.comment.value;

  const newComment = {
    name: name,
    dateAdded: formatDate(date),
    comment: comment,
  };

  comments.push(newComment);
  const cardEl = createCardElement(newComment);
  const commentsContainer = document.querySelector(".comments--posted");
  commentsContainer.appendChild(cardEl);

  comments.sort((a, b) => b.dateAdded - a.dateAdded);
  renderComments(comments);

  form.reset();
}

comments.sort((a, b) => b.dateAdded - a.dateAdded);
renderComments(comments);

const newCommentForm = document.querySelector(".comments__form");
newCommentForm.addEventListener("submit", addNewComment);
