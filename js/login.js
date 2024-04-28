const form = document.querySelector(".form");
const userName = document.querySelector(".input__username");
const password = document.querySelector(".input__password");
const formBtn = document.querySelector(".form__btn");

// const API_URL = "https://dummyjson.com";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let user = {
        username: userName.value,
        password: password.value,
    };

    signIn(user);
});

async function signIn(user) {
    await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .then((res) => {
            console.log("res >>>", res);
            if (res.message === "Invalid credentials") {
                return alert("username or password is incorrect");
            }
            localStorage.setItem("x-auth-token", res.token);
            window.open(`../pages/account.html`, "_self");
            closeForm.style.display = "none";
            login.style.display = "none";
        })
        .catch((err) => console.log("err >>>", err));
}
