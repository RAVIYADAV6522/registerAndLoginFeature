// Register logic --------------------------------------------------------------------------------------------------------------------------
const registerForm = document.getElementById("signupForm");

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;

    // check that this user exists or not in our localstorage-------------------------------------------------
    let usersData = JSON.parse(localStorage.getItem("usersData")) || [];

    let userExists = usersData.find((user) => user.username === username);
    if (userExists) {
      alert("user already exists");
      return;
    }

    usersData.push({ username, password });
    localStorage.setItem("usersData", JSON.stringify(usersData));
    alert("signup successfull");
    registerForm.reset();
    window.location.href = "index.html";
  });
}

// Login logic ----------------------------------------------------------------------------------------------------------------------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    let usersData = JSON.parse(localStorage.getItem("usersData")) || [];

    let userExists = usersData.find(
      (user) => user.username === username && user.password === password
    );

    if (userExists) {
      sessionStorage.setItem("loggedInUser", username);
      alert("loggin successfull");
      window.location.href = "home.html";
    } else {
      alert("invalid credentials");
    }
  });
}

// home page logic --------------------------------------

const h1 = document.getElementById("homeh1");
const btn = document.getElementById("homebtn");

function logout() {
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

const username = sessionStorage.getItem("loggedInUser");
h1.innerHTML = `welcome to homepage  <span style="color:red;">${username}</span>`;

// if sessionstorage is empty and someone tries to open that page then redirect him to loginpage ----------------------
if (!username) {
  window.location.href = "index.html";
}

btn.addEventListener("click", () => {
  logout();
});

