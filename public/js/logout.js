//Purpose: logout.js is used to logout the user
const logoutHandler = async (event) => {
  event.preventDefault();

  const response = await fetch("/api/users/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

document.querySelector("#logout").addEventListener("click", logoutHandler);
