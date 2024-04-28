const cards = document.querySelector(".cards");
const seeMoreBtn = document.querySelector(".see__more-btn");
const loading = document.querySelector(".loading");
const categories = document.querySelector(".filter__categories");
const searchInput = document.querySelector(".header__search__input");
const counter = document.querySelector(".counter");

let count = 0;
let limitCount = 4;

const API_URL = "https://dummyjson.com";

async function filterCategory(url) {
    let data = await fetch(`${url}/products/categories`, {
        method: "GET",
    });

    data.json()
        .then((res) => createCategories(res))
        .catch((err) => console.log(err));
}
filterCategory(API_URL);

function createCategories(data) {
    let categoryTag = `<li class="filter__category"><a href='#'>all</a></li>`;
    data.forEach((category) => {
        categoryTag += `
            <li class="filter__category"><a href='#'>${category}</a></li>
        `;
    });
    categories.innerHTML = categoryTag;
}

async function fetchData(api, categoryN, searchValue) {
    let url = "";
    if (categoryN === "all") {
        if (searchValue) {
            url = `${api}/products/search/?q=${searchValue}`;
        } else {
            url = `${api}/products`;
        }
    } else {
        url = `${api}/products/category/${categoryN}`;
    }

    let data = await fetch(url, {
        method: "GET",
    });
    data.json()
        .then((res) => createCards(res))
        .catch((err) => console.log(err))
        .finally(() => {
            loading.style.display = "none";
            seeMoreBtn.innerHTML = "See more";
            seeMoreBtn.removeAttribute("disabled");
        });
}

fetchData(API_URL, "all");

function createCards(data) {
    let productCards = "";
    data.products.forEach((product) => {
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

const addToWishlist = async (id) => {
    let data = await fetch(`${API_URL}/products/${id}`);
    data.json()
        .then((product) => {
            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            let index = wishlist.findIndex((el) => el.id === product.id);
            let updateWishlist = [];
            let likedProducts =
                JSON.parse(localStorage.getItem("likedProducts")) || 0;

            if (index < 0) {
                updateWishlist = [...wishlist, product];

                likedProducts += 1;
            } else {
                updateWishlist = wishlist.filter((el) => el.id !== product.id);
                likedProducts -= 1;
            }

            counter.innerHTML = likedProducts;
            // console.log(likedProducts);
            localStorage.setItem(
                "likedProducts",
                JSON.stringify(likedProducts)
            );

            localStorage.setItem("wishlist", JSON.stringify(updateWishlist));
        })
        .catch((err) => console.log(err));
};

cards.addEventListener("click", (e) => {
    if (e.target.className === "product-img") {
        let id = e.target.closest(".card").dataset.id;
        window.open(`./pages/product.html?id=${id}`, "_self");
    } else if (e.target.className.includes("fa-heart")) {
        let id = e.target.closest(".card").dataset.id;
        addToWishlist(id);
    }
});

seeMoreBtn.addEventListener("click", () => {
    count++;
    fetchData(API_URL);
    seeMoreBtn.innerHTML = "Loading...";
    seeMoreBtn.setAttribute("disabled", true);
});

function createLoadingItem(count) {
    let loadingItem = "";
    for (let i = 0; i < count; i++) {
        loadingItem += `
            <div class="loading__item">
                <div class="loading__image bg__animation"></div>
                <div class="loading__title bg__animation"></div>
                <div class="loading__title bg__animation"></div>
            </div>
        `;
    }
    loading.innerHTML = loadingItem;
}

createLoadingItem(limitCount);

categories.addEventListener("click", (e) => {
    let categoryName = e.target.innerHTML;
    fetchData(API_URL, categoryName);
});

searchInput.addEventListener("input", (e) => {
    let value = e.target.value.trim();
    if (value) {
        fetchData(API_URL, "all", value);
    }
});
