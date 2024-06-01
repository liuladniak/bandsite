import { response } from "./band-site-api.js";
import { formatDateComment } from "./utils.js";

let comments;

async function loadComments() {
  try {
    comments = await response.getComments();
    comments.forEach((comment, i) => {
      comment.date = formatDateComment(comments[i].timestamp);
    });
    console.log(comments, "API COMMENTS");
    comments.sort((a, b) => b.timestamp - a.timestamp);
    renderComments(comments);
  } catch (err) {
    console.error("Error loading comments", err);
  }
}
loadComments();

function createElementWithClass(tag, className) {
  const el = document.createElement(tag);
  el.classList.add(className);
  return el;
}

function createCardElement(comment) {
  const cardEl = createElementWithClass("div", "comment__card");

  let userAvatar;
  if (comment.avatar) {
    userAvatar = createElementWithClass("img", "form__user-img");
    userAvatar.src = comment.avatar;
    userAvatar.alt = "User avatar image";
  } else {
    userAvatar = createElementWithClass("div", "form__user-img");
  }

  cardEl.appendChild(userAvatar);

  const commentContentEl = createElementWithClass("div", "form__user-comment");

  const headingWrpEl = createElementWithClass("div", "comment__heading");
  const userNameEl = createElementWithClass("h3", "comment__heading-name");
  const datePosted = createElementWithClass("p", "comment__heading-date");

  userNameEl.innerText = comment.name;
  headingWrpEl.appendChild(userNameEl);

  datePosted.innerText = comment.date;
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

const newCommentForm = document.querySelector(".form");
newCommentForm.addEventListener("submit", (e) => addNewComment(e, comments));
