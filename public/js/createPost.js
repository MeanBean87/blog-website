// Purpose: createPost.js is used to create a new post
const createPostHandler = async (event) => {
  event.preventDefault();
  document.location.replace("/dashboard/new");
};

document
  .querySelector("#create-new-post")
  .addEventListener("click", createPostHandler);
