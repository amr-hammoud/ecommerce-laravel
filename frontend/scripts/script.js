const currentUrl = window.location.href

const account_button = document.getElementById("account-button");
const account_tab = document.getElementById("account-tab");
account_button.addEventListener("click", () => {
	account_tab.classList.toggle("show");
});

// User
let cart, favorites, products_list;
let cart_tab;

// Admin
let add_button, create_container;
let confirmation_container, confirmation_delete, confirmation_cancel;

products_list = [];
localStorage.setItem("products", JSON.stringify(products_list));

function addCartListener(){
	const cart_button = document.getElementById("cart-button");
	const cart_tab = document.getElementById("cart-tab");
	cart_button.addEventListener("click", () => {
	const count = cart_button.querySelector("span").innerText;
	if (count != "0") {
		cart_tab.classList.toggle("show");
	}
});
}

function findProduct(id) {
	return products_list.find((product) => product.id == id);
}

function addButtonListeners(element, type) {

	element.addEventListener("mouseover", () => {
		element.src = `assets/icons/filled/${type}.svg`;
	});

	element.addEventListener("mouseout", () => {
		element.src = `assets/icons/black/${type}.svg`;
	});


	
	if (type === "f") {
		element.addEventListener("click", (e) => {
			favorites.push(e.target.parentElement.id);
			localStorage.setItem("favorites", JSON.stringify(favorites));
			updateCount(type); // TODO: replace with addItem to list
		});
	}
	
	else if (type === "c") {
		element.addEventListener("click", (e) => {
			const id = e.target.parentElement.id;
			product = findProduct(id);

			if (product != -1) {
				// updateLocalStorageArray(product,"cart","push")
				cart.push(id);
				localStorage.setItem("cart", JSON.stringify(cart));
				addCartItem(product);
				updateCount(type);
			}
		});
	} else if (type === "dc") {

		element.addEventListener("click", (e) => {
			const id = e.target.id;
			const index = cart.indexOf(id);
			if (index != -1) {
				cart.splice(index, 1);
				localStorage.setItem("cart", JSON.stringify(cart));
				e.srcElement.parentElement.parentElement.remove();
				let count = updateCount(type);
				if (count == 0) {
					cart_tab = document.getElementById("cart-tab")
					cart_tab.classList.remove("show");
				}
			}
		});
	}

	else if (type === "dp") {
		element.addEventListener("click", (e) => {

			confirmation_container.classList.add("confirmation-container-show");
			
			confirmation_delete.addEventListener("click", () => {
				const id = e.target.id;
				product = findProduct(id);
				const index = products_list.indexOf(product);
				console.log(index);
				if (index != -1) {
					products_list.splice(index, 1);
					localStorage.setItem("products", JSON.stringify(products_list));
					e.srcElement.parentElement.parentElement.parentElement.remove()
					confirmation_container.classList.remove("confirmation-container-show");
				}
			})

			confirmation_cancel.addEventListener("click", () => {
				confirmation_container.classList.remove("confirmation-container-show");
			})
		});
	}
}

function updateCount(type) {
	let count_text;
	let count = 0;
	if (type === "f" || type === "df") {
		count_text = document.getElementById("favorites-count");
		count = JSON.parse(localStorage.getItem("favorites")).length;
	} else if (type === "c" || type === "dc") {
		count_text = document.getElementById("cart-count");
		count = JSON.parse(localStorage.getItem("cart")).length;
	}
	count_text.innerText = count;
	return count;
}

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

function addCartItem(product) {
	let row = document.createElement("div");
	row.classList.add("cart-tab-item");
	row.innerHTML = product.toUserRowContent();

	const remove_from_cart = row.querySelector(".remove-from-cart");

	addButtonListeners(remove_from_cart, "dc");

	let cart_container = document.getElementById("cart-tab");
	cart_container.appendChild(row);
}

function addAdminProduct(product) {
	let row = document.createElement("div");
	row.classList.add("product-row");
	row.innerHTML = product.toAdminRowContent();

	const edit_product = row.querySelector(".edit-product");
	const delete_product = row.querySelector(".delete-product");


	addButtonListeners(edit_product, "e");
	addButtonListeners(delete_product, "dp");

	let products_container = document.getElementById("admin-products");
	products_container.appendChild(row);
}

function populateCards(type) {
	if(type === "admin"){
		products_list.forEach((product) => {
			addAdminProduct(product);
		});
	}
	else if(type === "user"){
		products_list.forEach((product) => {
			addCard(product);
		});
	}
}

function populateCart(list) {
	cart.forEach((id) => {
		list.forEach((product) => {
			if (product.id == id) {
				addCartItem(product);
			}
		});
	});
}

products_list.push(
	new Product(
		"11",
		"MSI",
		"250",
		"lorem ipsum",
		"assets/images/laptop.png"
	)
);
products_list.push(
	new Product(
		"12",
		"HP",
		"250",
		"lorem ipsum",
		"assets/images/laptop.png"
	)
);
products_list.push(
	new Product(
		"13",
		"APPLE",
		"250",
		"lorem ipsum",
		"assets/images/laptop.png"
	)
);
products_list.push(
	new Product(
		"14",
		"APPLE",
		"250",
		"lorem ipsum",
		"assets/images/laptop.png"
	)
);
products_list.push(
	new Product(
		"15",
		"APPLE",
		"250",
		"lorem ipsum",
		"assets/images/laptop.png"
	)
);

if(currentUrl.search("index") != -1){
	populateCards("user");
	addCartListener()
	if (localStorage.getItem("favorites") === null) {
		let favorites = [];
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}
	
	if (localStorage.getItem("cart") === null) {
		let cart = [];
		localStorage.setItem("cart", JSON.stringify(cart));
	} else {
		cart = JSON.parse(localStorage.getItem("cart"));
		populateCart(products_list);
		updateCount("c");
	}
}

if(currentUrl.search("admin") != -1){
	populateCards("admin");
	add_button = document.getElementById("add-button")
	create_container = document.getElementById("create-product-container");
	confirmation_container = document.getElementById("confirmation-container");
	confirmation_delete = document.getElementById("confirmation-button-delete");
	confirmation_cancel = document.getElementById("confirmation-button-cancel");

	const confirmation_close = document.getElementById("popup-close-confirmation");
	confirmation_close.addEventListener("click", () => {
		confirmation_container.classList.remove("confirmation-container-show")
	})

	const create_product_close = document.getElementById("create-product-close");
	create_product_close.addEventListener("click", () => {
		create_container.classList.remove("create-product-container-show")
	})

	add_button.addEventListener("click", () => {
		create_container.classList.toggle("create-product-container-show")
	})
}




