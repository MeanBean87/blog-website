// purpose: delete a post from the database
const deletePostHandler = async (event) => {
  event.preventDefault();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  console.log(id);

  const response = await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector("#delete-post")
  .addEventListener("click", deletePostHandler);
