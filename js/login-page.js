const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    let dto = {
        "email": username,
        "password": password,
    }

    fetch(db + '/gebruiker/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dto)
    })
        .then(response => response.json()) 
        .then(success => {
            if (success) {
                loginErrorMsg.style.opacity = 0;

                alert("You have successfully logged in.");
                window.location = "receptentabelfrontend.html"
            } else {
                loginErrorMsg.style.opacity = 1;
            }
        })
})