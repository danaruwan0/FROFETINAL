// ================== MENU TOGGLE ==================
const menuIcon = document.querySelector(".menu-icon");
const pageLink = document.querySelector(".pageLink");

menuIcon.addEventListener("click", () => {
    pageLink.classList.toggle("active");
});


// ================== PRODUCTS ==================
const products = [
    { name: "Baby Kit", price: 3200, image: "../assets/shop/baby kit.png", category: ["kids"] },
    { name: "Belt", price: 1200, image: "../assets/shop/belt.png", category: ["accessories", "men"] },
    { name: "Black T-Shirt", price: 2500, image: "../assets/shop/black t shirt.png", category: ["men"] },
    { name: "Blue T-Shirt", price: 2500, image: "../assets/shop/blue t shirt.png", category: ["men"] },
    { name: "Boys Short", price: 1800, image: "../assets/shop/boys short.png", category: ["kids"] },
    { name: "Buruka", price: 6500, image: "../assets/shop/buruka.png", category: ["women"] },
    { name: "Child Denim", price: 2600, image: "../assets/shop/child denim.png", category: ["kids"] },
    { name: "Child Frock", price: 3000, image: "../assets/shop/child frock.png", category: ["kids"] },
    { name: "Child T-Shirt", price: 2200, image: "../assets/shop/child t shirt.png", category: ["kids"] },
    { name: "Deck Shoes", price: 7800, image: "../assets/shop/deck shoes.png", category: ["men", "accessories"] },
    { name: "Hand Bag 02", price: 6400, image: "../assets/shop/hand bag 2.png", category: ["women", "accessories"] },
    { name: "Hand Bag 01", price: 6000, image: "../assets/shop/hand bag1.png", category: ["women", "accessories"] },
    { name: "Hand Bag 03", price: 7000, image: "../assets/shop/hand bag3.png", category: ["women", "accessories"] },
    { name: "Hijab", price: 2000, image: "../assets/shop/hijab.png", category: ["women"] },
    { name: "Kurta", price: 5200, image: "../assets/shop/kurta.png", category: ["men"] },
    { name: "Ladies Blouse", price: 2800, image: "../assets/shop/ladies blouse.png", category: ["women"] },
    { name: "Ladies Boot Shoes", price: 8200, image: "../assets/shop/ladies boot shoes.png", category: ["women", "accessories"] },
    { name: "Ladies Cap", price: 1600, image: "../assets/shop/ladies cap.png", category: ["women", "accessories"] },
    { name: "Ladies Denim", price: 4800, image: "../assets/shop/ladies denim.png", category: ["women"] },
    { name: "Ladies Frock 02", price: 5400, image: "../assets/shop/ladies frock2.png", category: ["women"] },
    { name: "Ladies Frock 03", price: 5600, image: "../assets/shop/ladies frock3.png", category: ["women"] },
    { name: "Gym Pant", price: 3900, image: "../assets/shop/ladies long fit gym pant.png", category: ["women"] },
    { name: "Office Pant", price: 4200, image: "../assets/shop/ladies office long pant.png", category: ["women"] },
    { name: "Ladies Short", price: 2600, image: "../assets/shop/ladies short pant.png", category: ["women"] },
    { name: "Ladies Skirt", price: 3100, image: "../assets/shop/ladies skirt.png", category: ["women"] },
    { name: "Men Cap", price: 1700, image: "../assets/shop/mens cap.png", category: ["men", "accessories"] },
    { name: "Men Denim", price: 4600, image: "../assets/shop/mens denim.png", category: ["men"] },
    { name: "Office Shirt", price: 3800, image: "../assets/shop/mens office shirts.png", category: ["men"] },
    { name: "Office Trouser", price: 4200, image: "../assets/shop/mens office trouser.png", category: ["men"] },
    { name: "Office Shoes", price: 8500, image: "../assets/shop/office shoes.png", category: ["men", "accessories"] },
    { name: "Office Tie", price: 1500, image: "../assets/shop/office tie.png", category: ["men", "accessories"] },
    { name: "Blue Saree", price: 9000, image: "../assets/shop/saree blue.png", category: ["women"] },
    { name: "Red Saree", price: 9200, image: "../assets/shop/saree red.png", category: ["women"] },
    { name: "School Bag", price: 3600, image: "../assets/shop/school bag.png", category: ["kids", "accessories"] },
    { name: "Serviettes", price: 800, image: "../assets/shop/Serviettes.png", category: ["accessories"] },
    { name: "Vest", price: 1500, image: "../assets/shop/vest.png", category: ["men"] },
    { name: "Wedding Frock", price: 12500, image: "../assets/shop/wedding frock.png", category: ["women"] }
];


// ================== VARIABLES ==================
const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const catBtns = document.querySelectorAll(".cat-btn");

const cartPanel = document.querySelector(".cart-panel");
const cartOverlay = document.querySelector(".cart-overlay");
const cartFooterTotal = document.querySelector(".cart-footer .total strong");

let activeCategory = "all";

// Load Cart from LocalStorage
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];


// ================== SAVE CART ==================
function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}


// ================== RENDER PRODUCTS ==================
function renderProducts() {
    grid.innerHTML = "";
    const keyword = searchInput.value.toLowerCase();

    products
        .filter(p =>
            (activeCategory === "all" || p.category.includes(activeCategory)) &&
            p.name.toLowerCase().includes(keyword)
        )
        .forEach((p, index) => {
            grid.innerHTML += `
                <div class="product-card">
                    <img src="${p.image}" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <p>Rs. ${p.price}</p>
                    <button class="add-cart" data-index="${index}">Add to Cart</button>
                </div>
            `;
        });

    // Add event listeners
    document.querySelectorAll(".add-cart").forEach(btn => {
        btn.addEventListener("click", () => {
            const productIndex = btn.dataset.index;
            addToCart(products[productIndex]);
        });
    });
}


// ================== CART FUNCTIONS ==================
function addToCart(product) {
    cartItems.push(product);
    saveCart();
    renderCart();
    openCart();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    saveCart();
    renderCart();
}

function renderCart() {

    // Create cart-body if not exists
    let cartBody = document.querySelector(".cart-body");
    if (!cartBody) {
        cartBody = document.createElement("div");
        cartBody.classList.add("cart-body");
        cartPanel.insertBefore(cartBody, cartPanel.querySelector(".cart-footer"));
    }

    cartBody.innerHTML = "";

    let totalPrice = 0;

    if (cartItems.length === 0) {
        cartBody.innerHTML = `<p style="text-align:center; color:#777; margin-top:30px;">Cart is empty</p>`;
        cartFooterTotal.textContent = `Rs 0`;
        return;
    }

    cartItems.forEach((item, i) => {
        totalPrice += item.price;

        cartBody.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-info">
                    <h4>${item.name}</h4>
                    <p>Rs. ${item.price}</p>

                    <button class="remove-item" data-index="${i}"
                        style="margin-top:8px; padding:6px 12px; border:none; background:#dc3545; color:white; font-size:13px; font-weight:600; border-radius:6px; cursor:pointer;">
                        Remove
                    </button>
                </div>
            </div>
        `;
    });

    cartFooterTotal.textContent = `Rs ${totalPrice}`;

    // Remove buttons
    document.querySelectorAll(".remove-item").forEach(btn => {
        btn.addEventListener("click", () => {
            removeFromCart(btn.dataset.index);
        });
    });
}


// ================== CATEGORY FILTER ==================
catBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        catBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeCategory = btn.dataset.category;
        renderProducts();
    });
});


// ================== SEARCH ==================
searchInput.addEventListener("input", renderProducts);


// ================== CART PANEL TOGGLE ==================
const cartIcon = document.querySelector(".fa-bag-shopping");
const closeCart = document.querySelector(".close-cart");

cartIcon.addEventListener("click", openCart);

function openCart() {
    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeCartPanel() {
    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");
    document.body.style.overflow = "";
}

closeCart.addEventListener("click", closeCartPanel);
cartOverlay.addEventListener("click", closeCartPanel);


// ================== ACCOUNT PANEL ==================
const userIcon = document.querySelector(".fa-user");
const accountPanel = document.querySelector(".account-panel");
const accountOverlay = document.querySelector(".account-overlay");
const closeAccount = document.querySelector(".close-account");

userIcon.addEventListener("click", () => {
    accountPanel.classList.add("active");
    accountOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
});

function closePanel() {
    accountPanel.classList.remove("active");
    accountOverlay.classList.remove("active");
    document.body.style.overflow = "";
}

closeAccount.addEventListener("click", closePanel);
accountOverlay.addEventListener("click", closePanel);


// ================== INITIAL LOAD ==================
renderProducts();
renderCart();














// ================== PAYMENT MODAL ==================
const checkoutBtn = document.getElementById("checkoutBtn");
const paymentOverlay = document.getElementById("paymentOverlay");
const paymentModal = document.getElementById("paymentModal");
const closePayment = document.getElementById("closePayment");

const cardName = document.getElementById("cardName");
const cardNumber = document.getElementById("cardNumber");
const expiryDate = document.getElementById("expiryDate");
const cvv = document.getElementById("cvv");

const buyNowBtn = document.getElementById("buyNowBtn");
const paymentMsg = document.getElementById("paymentMsg");

checkoutBtn.addEventListener("click", () => {
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    paymentOverlay.classList.add("active");
    paymentModal.classList.add("active");
    paymentMsg.textContent = "";
    document.body.style.overflow = "hidden";
});

// close payment modal
function closePaymentModal() {
    paymentOverlay.classList.remove("active");
    paymentModal.classList.remove("active");
    document.body.style.overflow = "";
}

closePayment.addEventListener("click", closePaymentModal);
paymentOverlay.addEventListener("click", closePaymentModal);


// ================== CARD FORMATTING ==================

// auto spacing card number
cardNumber.addEventListener("input", () => {
    let value = cardNumber.value.replace(/\D/g, "");
    value = value.substring(0, 16);
    value = value.replace(/(.{4})/g, "$1 ").trim();
    cardNumber.value = value;
});

// expiry format MM/YY
expiryDate.addEventListener("input", () => {
    let value = expiryDate.value.replace(/\D/g, "");
    if (value.length >= 3) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    expiryDate.value = value.substring(0, 5);
});


// ================== BUY NOW FUNCTION ==================
buyNowBtn.addEventListener("click", () => {

    if (cardName.value.trim() === "") {
        paymentMsg.style.color = "red";
        paymentMsg.textContent = "Please enter card holder name!";
        return;
    }

    if (cardNumber.value.replace(/\s/g, "").length !== 16) {
        paymentMsg.style.color = "red";
        paymentMsg.textContent = "Invalid card number!";
        return;
    }

    if (expiryDate.value.length !== 5 || !expiryDate.value.includes("/")) {
        paymentMsg.style.color = "red";
        paymentMsg.textContent = "Invalid expiry date!";
        return;
    }

    if (cvv.value.length !== 3) {
        paymentMsg.style.color = "red";
        paymentMsg.textContent = "Invalid CVV!";
        return;
    }

    paymentMsg.style.color = "green";
    paymentMsg.textContent = "Payment Successful! Order Placed ✅";

    // clear cart
    cartItems = [];
    saveCart();
    renderCart();

    // clear inputs
    cardName.value = "";
    cardNumber.value = "";
    expiryDate.value = "";
    cvv.value = "";

    setTimeout(() => {
        closePaymentModal();
    }, 1500);
});
