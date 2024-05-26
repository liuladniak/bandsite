const comments = [
  {
    name: "Victor Pinto",
    dateAdded: timeAgo(new Date("11/02/2023")),
    comment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
  },
  {
    name: "Christina Cabrera",
    dateAdded: timeAgo(new Date("10/28/2023")),
    comment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
  },
  {
    name: "Isaac Tadesse",
    dateAdded: timeAgo(new Date("10/20/2023")),
    comment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

function createElementWithClass(tag, className) {
  const el = document.createElement(tag);
  el.classList.add(className);
  return el;
}

function createCardElement(comment) {
  const cardEl = createElementWithClass("div", "comment__card");

  const avatarImgDefEl = createElementWithClass("div", "user-avatar");
  cardEl.appendChild(avatarImgDefEl);

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
  const date = timeAgo(new Date());
  const comment = form.comment.value;

  const newComment = {
    name: name,
    dateAdded: date,
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

function timeAgo(date) {
  const now = new Date();
  const secondsPast = Math.floor((now - date) / 1000);

  if (secondsPast < 60) {
    return "now";
  }
  const minutesPast = Math.floor(secondsPast / 60);
  if (minutesPast < 60) {
    return `${minutesPast} min${minutesPast === 1 ? "" : "s"} ago`;
  }
  const hoursPast = Math.floor(minutesPast / 60);
  if (hoursPast < 24) {
    return `${hoursPast} hr${hoursPast === 1 ? "" : "s"} ago`;
  }
  const daysPast = Math.floor(hoursPast / 24);
  if (daysPast < 30) {
    return `${daysPast} d${daysPast === 1 ? "" : "s"} ago`;
  }
  const monthsPast = Math.floor(daysPast / 30);
  if (monthsPast < 12) {
    return `${monthsPast} m${monthsPast === 1 ? "" : "s"} ago`;
  }
  const yearsPast = Math.floor(monthsPast / 12);
  return `${yearsPast} y${yearsPast === 1 ? "" : "s"} ago`;
}
