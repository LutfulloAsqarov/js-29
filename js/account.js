const logoutBtn = document.querySelector(".logout");

let isLogin = localStorage.getItem("x-auth-token");

// Admin panel himoya qilish

function checkUser() {
    if (!isLogin) {
        window.location.replace("/index.html");
    }
}
checkUser();

logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    window.open(`../index.html`, "_self");
});
