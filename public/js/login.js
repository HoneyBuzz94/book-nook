const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-li").value.trim();
  const password = document.querySelector("#password-li").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to log in");
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

const createAccountHandler = async (event) => {
  console.log('running');
  event.preventDefault();

  const email = document.querySelector("#email-na").value.trim();
  const username = document.querySelector("#username-na").value.trim();
  const password = document.querySelector("#password-na").value.trim();

  if (email && username && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      if(response.ok){
        document.location.replace("/");
      }
    } else {
      alert("Failed to create account");
    }
  }
};

document
  .querySelector(".new-account-form")
  .addEventListener("submit", createAccountHandler);
