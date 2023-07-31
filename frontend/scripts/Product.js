class Product {

    constructor(id = "",name = "",price = "",description = "",image = ""){
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
    }

    toCardContent(){
        return `
                    <div class="card-face" id="card-face">
                        <div class="face-img">
                            <img src="${this.image}" alt="product image">
                        </div>
                        <div class="face-details">
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
                        <img class="add-to-favorites" src="assets/icons/black/f.svg" alt="favorites">
                        <img class="add-to-cart" src="assets/icons/black/c.svg" alt="cart">
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
                    <img class="remove-from-cart" id="${this.id}" src="assets/icons/black/dc.svg" alt="">
                </div>`
    }

    toAdminRowContent(){
        return `<div class="row-group">
                        <div class="product-img">
                            <img src="${this.image}" alt="product image">
                        </div>
                        <div class="product-details">
                            <div class="name">${this.name}</div>
                            <div class="details">${this.description}</div>
                            <div class="price">$${this.price} USD</div>
                        </div>
                    </div>
                    <div>
                        <div class="product-actions">
                            <img class="edit-product" id="${this.id}" src="assets/icons/black/e.svg" alt="">
                            <img class="delete-product" id="${this.id}" src="assets/icons/black/dc.svg" alt="">
                        </div>
                    </div>`
    }
}