if (localStorage.getItem("token") === null) {
	window.location.href = "login.html";
} else {
	const token = localStorage.getItem("token");
	const currentUrl = window.location.href;
	const base_url = "http://127.0.0.1:8000/api/";

	const account_button = document.getElementById("account-button");
	const account_tab = document.getElementById("account-tab");
	account_button.addEventListener("click", () => {
		account_tab.classList.toggle("show");
	});

	// User
	let cart, favorites, products_list;
	let cart_tab;

	// Admin
	let add_button,
		create_container,
		container_title,
		container_button_main,
		container_button_cancel;
	let name_input, price_input, description_input, image_input;
	let confirmation_container, confirmation_delete, confirmation_cancel;

	products_list = [];

	// async function logout(){

	// 	const config = {
	// 		headers: { Authorization: `Bearer ${token}` },
	// 	};

	// 	const url = base_url + "user/logout";
	// 	try {
	// 		const response =  await axios.post(url,config);
	// 		localStorage.removeItem("token")
	// 		localStorage.removeItem("user_id")
	// 		window.location.reload
	// 		console.log(response);
	// 	} catch (error) {
	// 		console.log("Error from GET API: " + error);
	// 	}
	// }

	// logout()

	if (currentUrl.search("admin") != -1) {
		add_button = document.getElementById("add-button");
		create_container = document.getElementById("create-product-container");
		container_title = document.getElementById("popup-title");
		container_button_main = document.getElementById(
			"create-product-button-create"
		);
		container_button_cancel = document.getElementById(
			"create-product-button-cancel"
		);

		confirmation_container = document.getElementById(
			"confirmation-container"
		);
		confirmation_delete = document.getElementById(
			"confirmation-button-delete"
		);
		confirmation_cancel = document.getElementById(
			"confirmation-button-cancel"
		);

		name_input = document.getElementById("create-product-name");
		price_input = document.getElementById("create-product-price");
		description_input = document.getElementById(
			"create-product-description"
		);
		image_input = document.getElementById("create-product-image");

		const confirmation_close = document.getElementById(
			"popup-close-confirmation"
		);
		confirmation_close.addEventListener("click", () => {
			confirmation_container.classList.remove(
				"confirmation-container-show"
			);
		});

		const create_product_close = document.getElementById(
			"create-product-close"
		);
		create_product_close.addEventListener("click", () => {
			create_container.classList.remove("create-product-container-show");
		});

		container_button_cancel.addEventListener("click", () => {
			create_container.classList.remove("create-product-container-show");
		});

		add_button.addEventListener("click", () => {
			create_container.classList.toggle("create-product-container-show");
			container_title.innerText = "add product";
			container_button_main.innerText = "create";

			name_input.value = "";
			price_input.value = "";
			description_input.value = "";
		});

		container_button_main.addEventListener("click", () => {
			addProduct();
		});
	}

	async function addProduct() {
		const create_product_name_input = document.getElementById(
			"create-product-name"
		);
		const create_product_name_error = document.getElementById(
			"create-product-name-error"
		);
		const create_product_price_input = document.getElementById(
			"create-product-price"
		);
		const create_product_price_error = document.getElementById(
			"create-product-price-error"
		);
		const create_product_description_input = document.getElementById(
			"create-product-description"
		);
		const create_product_description_error = document.getElementById(
			"create-product-description-error"
		);
		const create_product_image_input = document.getElementById(
			"create-product-image"
		);
		const create_product_image_error = document.getElementById(
			"create-product-image-error"
		);

		let name_valid = false;
		let price_valid = false;
		let description_valid = false;
		let image_valid = false;

		if(create_product_name_input.value != ''){
			name_valid = true;
			create_product_name_error.innerText = ""
		}else{
			create_product_name_error.innerText = "*required"
		}

		let price = create_product_price_input.value;
		if(price != '' && !isNaN(price) && price > 0){
			price_valid = true;
			create_product_price_error.innerText = ""
		}else{
			create_product_price_error.innerText = "*Invalid number"
		}

		if(create_product_description_input.value != ''){
			description_valid = true;
			create_product_description_error.innerText = ""
		}else{
			create_product_description_error.innerText = "*required"
		}

		if(create_product_image_input.files[0] != null){
			image_valid = true
			create_product_image_error.innerText = ""
		}else {
			create_product_image_error.innerText = "*required"
		}

		

		if (name_valid && price_valid && image_valid) {
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};

			const body = new FormData();
			body.append("name", create_product_name_input.value);
			body.append("price", create_product_price_input.value);
			body.append("description", create_product_description_input.value);
			body.append("image", create_product_image_input.files[0]);

			const url = base_url + "product/addOrUpdate";
			try {
				const response = await axios.post(url, body, config);
				create_container.classList.remove(
					"create-product-container-show"
				);
				name_input.value = "";
				price_input.value = "";
				description_input.value = "";
				image_input.value = null;
				populateCards("admin");
			} catch (error) {
				console.log("Error from GET API: " + error);
			}
		}
	}

	async function getProducts() {
		const config = {
			headers: { Authorization: `Bearer ${token}` },
		};

		const url = base_url + "product/";
		try {
			return await axios.get(url, config);
		} catch (error) {
			console.log("Error from GET API: " + error);
		}
	}

	function addCartListener() {
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
				updateCount(type);
			});
		} else if (type === "c") {
			element.addEventListener("click", (e) => {
				const id = e.target.parentElement.id;
				product = findProduct(id);

				if (product != -1) {
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
						cart_tab = document.getElementById("cart-tab");
						cart_tab.classList.remove("show");
					}
				}
			});
		} else if (type === "dp") {
			element.addEventListener("click", (e) => {
				confirmation_container.classList.add(
					"confirmation-container-show"
				);

				confirmation_delete.addEventListener("click", () => {
					const id = e.target.id;
					product = findProduct(id);
					const index = products_list.indexOf(product);
					if (index != -1) {
						products_list.splice(index, 1);
						localStorage.setItem(
							"products",
							JSON.stringify(products_list)
						);
						e.srcElement.parentElement.parentElement.parentElement.remove();
						confirmation_container.classList.remove(
							"confirmation-container-show"
						);
					}
				});

				confirmation_cancel.addEventListener("click", () => {
					confirmation_container.classList.remove(
						"confirmation-container-show"
					);
				});
			});
		} else if (type === "e") {
			element.addEventListener("click", (e) => {
				container_title.innerText = "edit product";
				container_button_main.innerText = "update";

				name_input.value =
					e.srcElement.parentElement.parentElement.parentElement.querySelector(
						".name"
					).innerText;
				price_input.value =
					e.srcElement.parentElement.parentElement.parentElement.querySelector(
						"#price"
					).innerText;
				description_input.value =
					e.srcElement.parentElement.parentElement.parentElement.querySelector(
						".description"
					).innerText;

				create_container.classList.add("create-product-container-show");
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

	async function populateCards(type) {
		console.log();
		const response = await getProducts();
		const myproducts = response.data.products;

		products_list = []

		myproducts.forEach((product) => {
			products_list.push(
				new Product(
					product.id,
					product.name,
					product.price,
					product.description,
					product.image
				)
			);
		});

		if (type === "admin") {

			products_container = document.getElementById("admin-products")
			products_container.replaceChildren();

			products_list.forEach((product) => {
				addAdminProduct(product);
			});

		} else if (type === "user") {

			products_container = document.getElementById("products")
			products_container.replaceChildren();

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

	if (currentUrl.search("index") != -1) {
		populateCards("user");
		addCartListener();
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

	if (currentUrl.search("admin") != -1) {
		populateCards("admin");
	}
}
