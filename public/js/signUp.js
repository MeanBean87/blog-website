// Purpose: signUp.js is used to sign up a new user
const signupHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  try {
    if (username && password) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        await fetch("/api/users/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: { "Content-Type": "application/json" },
        });
        document.location.replace("/dashboard");
      } else {
        const responseData = await response.json();
        const errorMessage =
          "Invalid username or password.\n" + responseData.error ||
          "An error occurred during registration.";
        const errorElement = document.querySelector("#error-message");
        errorElement.textContent = errorMessage;
      }
    }
  } catch (err) {
    console.error(err);
  }
};

document.querySelector("#signup").addEventListener("submit", signupHandler);
