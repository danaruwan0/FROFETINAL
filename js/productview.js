// PRODUCTS (same as shop.js)
const products = [
    { name: "Belt", price: 1200, image: "../assets/shop/belt.png", category: ["accessories","men"], desc:"Leather belt, high quality" },
    { name: "Blue T-Shirt", price: 2500, image: "../assets/shop/blue t shirt.png", category: ["men"], desc:"Cotton casual t-shirt" },
    { name: "Deck Shoes", price: 7800, image: "../assets/shop/deck shoes.png", category: ["men","accessories"], desc:"Comfortable deck shoes" },
    { name: "Wedding Frock", price: 12500, image: "../assets/shop/wedding frock.png", category: ["women"], desc:"Elegant wedding frock" }
];

// GET QUERY PARAM
const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get("name");

const product = products.find(p => p.name === productName);

const pvImage = document.getElementById("pv-image");
const pvName = document.getElementById("pv-name");
const pvPrice = document.getElementById("pv-price");
const pvDesc = document.getElementById("pv-desc");
const pvSize = document.getElementById("pv-size");
const pvQty = document.getElementById("pv-qty");
const pvAddCart = document.getElementById("pv-addcart");

if(product){
    pvImage.src = product.image;
    pvName.textContent = product.name;
    pvPrice.textContent = `Rs ${product.price}`;
    pvDesc.textContent = product.desc;
}

// ADD TO CART (store in localStorage)
pvAddCart.addEventListener("click", ()=>{
    const size = pvSize.value;
    const qty = parseInt(pvQty.value);
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");

    let existing = cart.find(item=> item.name===product.name && item.size===size);
    if(existing){
        existing.qty += qty;
    } else {
        cart.push({name: product.name, price: product.price, size, qty, image: product.image});
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
});
