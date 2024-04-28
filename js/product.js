const singleContent = document.querySelector(".single__content");
const loading = document.querySelector(".load");
const productImg = document.querySelector(".product__img");

const API_URL = "https://dummyjson.com";

async function fetchData(url) {
    let param = new URLSearchParams(window.location.search);
    let id = param.get("id");

    let data = await fetch(`${url}/products/${id}`);
    data.json()
        .then((res) => createCard(res))
        .catch((err) => console.log(err))
        .finally(() => {
            loading.style.display = "none";
        });
}

fetchData(API_URL);

function createCard(product) {
    let image = "";
    product.images.forEach(
        (i) => (image += `<img class="img" src='${i}' alt=''/>`)
    );
    singleContent.innerHTML = `
        <div class="product__img">
            <img src='${product.images[0]}' alt=''/>
            <div class="product__images">${image}</div>
        </div>
        <div class="product__info">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <h3>${product.price} $</h3>
            <button class="product__btn">Konzinka</button>
        </div>
    `;
}
