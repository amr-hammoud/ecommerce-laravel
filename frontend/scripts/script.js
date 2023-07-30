const account_button = document.getElementById("account-button");
const account_tab = document.getElementById("account-tab");

account_button.addEventListener("click", () => {
	account_tab.classList.toggle("show");
});

let favorites = [];
localStorage.setItem("favorites", JSON.stringify(favorites));
let cart = [];
localStorage.setItem("cart", JSON.stringify(cart));

// Add to Cart
const add_to_cart = document.getElementById("add-to-cart");

add_to_cart.addEventListener("mouseover", () => {
	add_to_cart.src = "assets/icons/filled/shopping_cart.svg";
});

add_to_cart.addEventListener("mouseout", () => {
	add_to_cart.src = "assets/icons/black/add_shopping_cart.svg";
});

add_to_cart.addEventListener("click", (e) => {
	cart.push(e.target.parentElement.id);
	localStorage.setItem("cart", JSON.stringify(cart));
	updateCount("c");
});

// Add To Favorites
const add_to_favorites = document.getElementById("add-to-favorites");

add_to_favorites.addEventListener("mouseover", () => {
	add_to_favorites.src = "assets/icons/filled/favorite.svg";
});

add_to_favorites.addEventListener("mouseout", () => {
	add_to_favorites.src = "assets/icons/black/heart_plus.svg";
});

add_to_favorites.addEventListener("click", (e) => {
	favorites.push(e.target.parentElement.id);
	localStorage.setItem("favorites", JSON.stringify(favorites));
	updateCount("f");
});

function updateCount(type) {
	let count_text;
	let count = 0;
	if (type === "f") {
		count_text = document.getElementById("favorites-count");
		count = JSON.parse(localStorage.getItem("favorites")).length;
	} else if (type === "c") {
		count_text = document.getElementById("cart-count");
		count = JSON.parse(localStorage.getItem("cart")).length;
	}

	count_text.innerText = count;
}
