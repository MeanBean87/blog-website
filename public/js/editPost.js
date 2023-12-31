// Purpose: edit post
const editPostHandler = async (event) => {
  event.preventDefault();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();

  console.log(id, title, content);
  const response = await fetch(`/api/post/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, content }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};
document
  .querySelector("#edit-post-form")
  .addEventListener("submit", editPostHandler);
