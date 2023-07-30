const account_button = document.getElementById("account-button");
const account_tab = document.getElementById("account-tab");

account_button.addEventListener("click", () => {
	account_tab.classList.toggle("show");
});

let favorites = [];
localStorage.setItem("favorites", JSON.stringify(favorites));
let cart = [];
localStorage.setItem("cart", JSON.stringify(cart));

function addButtonListeners(element, type) {
	if (type === "f") {
		element.addEventListener("mouseover", () => {
			element.src = "assets/icons/filled/favorite.svg";
		});

		element.addEventListener("mouseout", () => {
			element.src = "assets/icons/black/heart_plus.svg";
		});

		element.addEventListener("click", (e) => {
			favorites.push(e.target.parentElement.id);
			localStorage.setItem("favorites", JSON.stringify(favorites));
			updateCount(type);
		});
	} else if (type === "c") {
		element.addEventListener("mouseover", () => {
			element.src = "assets/icons/filled/shopping_cart.svg";
		});

		element.addEventListener("mouseout", () => {
			element.src = "assets/icons/black/add_shopping_cart.svg";
		});

		element.addEventListener("click", (e) => {
			cart.push(e.target.parentElement.id);
			localStorage.setItem("cart", JSON.stringify(cart));
			updateCount(type);
		});
	}
}

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

let product_list = [];

function addCard(product) {
	let card = document.createElement("div");
	card.classList.add("product-card");
	card.innerHTML = product.toCardContent();

	const add_to_favorites = card.querySelector(".add-to-favorites");
	const add_to_cart = card.querySelector(".add-to-cart");

	addButtonListeners(add_to_favorites, "f");
	addButtonListeners(add_to_cart, "c");

	let products_container = document.getElementById("products");
	products_container.appendChild(card);
}

product_list.forEach((product) => {
	addCard(product)
})