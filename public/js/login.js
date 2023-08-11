const loginHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  try {
    if (username && password) {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      console.log(response);

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        const errorMessage =
          "Invalid username or password.\n" ||
          "An error occurred during registration.";
        const errorElement = document.querySelector("#error-message");
        errorElement.textContent = errorMessage;
      }
    }
  } catch (err) {
    console.error(err);
  }
};

document.querySelector("#login").addEventListener("submit", loginHandler);
