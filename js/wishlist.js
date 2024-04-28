const cards = document.querySelector(".cards");

let wishlist = JSON.parse(localStorage.getItem("wishlist"));

function createCards(data) {
    let productCards = "";
    if (productCards.length === 0) {
        cards.innerHTML = `<div class="product__no"><h1>NO PRODUCT</h1></div>`;
    }
    data.forEach((product) => {
        productCards += `
                <div class="card" data-id=${product.id}>
                    <div class="card__img" >
                        <img class="product-img" src="${product.images[0]}"  alt="" />
                        <i class="fa-regular fa-heart"></i>
                    </div>
                    <div class="card__info">
                        <h3 class="card__title">${product.title}</h3>
                        <p class="card__description">${product.description}$</p>
                    </div>
                </div>
            `;
    });
    cards.innerHTML = productCards;
}

createCards(wishlist);

const addToWishlist = (id) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist"));
    let updateWishlist = wishlist.filter((el) => el.id !== +id);
    localStorage.setItem("wishlist", JSON.stringify(updateWishlist));

    createCards(updateWishlist);
};

cards.addEventListener("click", (e) => {
    if (e.target.className === "product-img") {
        let id = e.target.closest(".card").dataset.id;
        window.open(`./product.html?id=${id}`, "_self");
    } else if (e.target.className.includes("fa-heart")) {
        let id = e.target.closest(".card").dataset.id;
        addToWishlist(id);
    }
});
