const account_button = document.getElementById("account-button");
const account_tab = document.getElementById("account-tab");

let favorites = [];


const product_states = ["nofav_nocart","fav_nocart","nofav_cart","fav_cart"]

localStorage.setItem("favorites", JSON.stringify(favorites));


account_button.addEventListener("click", () => {
	account_tab.classList.toggle("show");
});

const add_to_cart = document.getElementById("add-to-cart");

const add_to_favorites = document.getElementById("add-to-favorites");

add_to_favorites.addEventListener("mouseover", () => {
	add_to_favorites.src = "assets/icons/filled/favorite.svg";
});

add_to_favorites.addEventListener("mouseout", () => {
	add_to_favorites.src = "assets/icons/black/heart_plus.svg";
});

add_to_favorites.addEventListener("click", (e) => {
    favorites.push(e.target.parentElement.id)
    localStorage.setItem("favorites", JSON.stringify(favorites));
});
