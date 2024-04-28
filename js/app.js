const headerLoginBtn = document.querySelector(".header__login__btn");
const login = document.querySelector("#login");
const closeForm = document.querySelector(".close-form");

function checkAdmin() {
    let isLogin = localStorage.getItem("x-auth-token");
    if (isLogin) {
        headerLoginBtn.innerHTML = "Account";
        headerLoginBtn.setAttribute("href", "./pages/account.html");
    } else {
        headerLoginBtn.innerHTML = "Login";
        headerLoginBtn.setAttribute("href", "#");
    }
}

checkAdmin();

headerLoginBtn.addEventListener("click", () => {
    login.style.display = "flex";
    closeForm.style.display = "block";
});

closeForm.addEventListener("click", () => {
    login.style.display = "none";
    closeForm.style.display = "none";
});

login.addEventListener("click", (e) => {
    if (e.target.className === "xmark") {
        login.style.display = "none";
        closeForm.style.display = "none";
    }
});
