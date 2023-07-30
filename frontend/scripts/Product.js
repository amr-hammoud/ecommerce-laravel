class Product {

    constructor(id = "",name = "",price = "",description = "",category = "",image = ""){
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
    }

    toCardContent(){
        return `
                    <div class="card-face" id="card-face">
                        <div class="face-img">
                            <img src="${this.image}" alt="product image">
                        </div>
                        <div class="face-details">
                            <div class="category">${this.category}</div>
                            <div class="name">${this.name}</div>
                            <div class="price">$${this.price} USD</div>
                        </div>
                    </div>
                    <div class="card-back" id="card-back">
                        <div class="back-details">
                            <div class="name">${this.name}</div>
                            <div class="details">
                                ${this.description}
                            </div>
                        </div>
                    </div>
                    <div class="face-actions flex justify-end gap-1" id="${this.id}">
                        <img class="add-to-favorites" src="assets/icons/black/heart_plus.svg" alt="favorites">
                        <img class="add-to-cart" src="assets/icons/black/add_shopping_cart.svg" alt="cart">
                    </div>
                `
    }

    toUserRowContent(){
        return `<div class="cart-img">
                    <img src="${this.image}" alt="product image">
                </div>
                <div class="cart-details">
                    <div class="name">${this.name}</div>
                    <div class="price">$${this.price} USD</div>
                </div>
                <div class="cart-actions">
                    <img class="remove-from-cart" id="${this.id}" src="assets/icons/black/delete.svg" alt="">
                </div>`
    }
}