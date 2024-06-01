import { BandSiteApi, BANDSITE_API_KEY } from "./band-site-api.js";

const response = new BandSiteApi(BANDSITE_API_KEY);

let comments;

async function loadComments() {
  try {
    comments = await response.getComments();
    comments.forEach((comment, i) => {
      comment.dateAdded = formatDate(comments[i].timestamp);
    });
    console.log(comments, "API COMMENTS");
    comments.sort((a, b) => b.dateAdded - a.dateAdded);
    renderComments(comments);
  } catch (err) {
    console.error("Error loading comments", err);
  }
}
loadComments();

function formatDate(timestamp) {
  const date = new Date(timestamp);
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

  // const commentDate = comment.dateAdded;

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
  commentsContainer.innerText = "";
  comments.forEach((comment) => {
    const cardEl = createCardElement(comment);
    commentsContainer.appendChild(cardEl);
  });
}

async function addNewComment(e) {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value;
  const comment = form.comment.value;

  const newComment = {
    name: name,
    comment: comment,
  };

  try {
    await response.postComment(newComment);
    comments = await response.getComments();
    renderComments(comments);

    form.reset();
  } catch (err) {
    console.error(err);
  }
}

const newCommentForm = document.querySelector(".comments__form");
newCommentForm.addEventListener("submit", (e) => addNewComment(e, comments));
