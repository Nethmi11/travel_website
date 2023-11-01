let iconCart = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
console.log(cart);

iconCart.onclick = () => {
    cart.classList.add("active");
};

closeCart.onclick = () => {
    cart.classList.remove("active");
};
  
//calling the allUpdates function to run
allUpdates()


function allUpdates() {
    //Remove products from cart
    let removeCartItemButtons = document.getElementsByClassName('cart-remove-icon');
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let removebutton = removeCartItemButtons[i];
        removebutton.addEventListener('click', removeCartItem);
    }

    //change product quantity
    let quantityInputs = document.getElementsByClassName('cart-product-quantity');
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChange);
    }

    //Add to cart
    let addToCartButtons = document.getElementsByClassName('add-to-cart');
    for (let i = 0; i < addToCartButtons.length; i++) {
        let addbutton = addToCartButtons[i];
        addbutton.addEventListener('click', clickedAddToCart);
    }

    //purchase/buy button work
    document.getElementsByClassName('button-buy')[0].addEventListener('click', buyNowClicked)
}

//making final buy button work
function buyNowClicked() {
    let cartItemConatiner = document.getElementsByClassName('contents-of-cart')[0];
    let cartRows = document.getElementsByClassName('cart-box');

    if (cartRows.length !== 0){
        alert('Proceeding to checkout');
        let checkoutTotal = document.getElementsByClassName('total-price')[0].innerText;
        localStorage.setItem('checkoutTotal', checkoutTotal);
        console.log('checkoutTotal', checkoutTotal);

        while (cartItemConatiner.hasChildNodes()) {
            cartItemConatiner.removeChild(cartItemConatiner.firstChild)
        }
        updateCartTotal();

        window.location.href="Checkout Form/checkoutForm_page.html";
        
        // window.open("Checkout Form/checkoutForm_page.html","_blank")
    }else{
        alert('Atlleast one item should be ordered');
    }  
     
}

//removing items from the cart
function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateCartTotal();
}

//checks if quanitity input is within range 
function quantityChange(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

//when the add to cart is clicked information is taken
function clickedAddToCart(event) {
    let addbuttonClicked = event.target;
    let shopItem = addbuttonClicked.parentElement;
    let title = shopItem.getElementsByClassName('product-title')[0].innerText;
    let price = shopItem.getElementsByClassName('product-price')[0].innerText;
    let imageSrc = shopItem.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, imageSrc);
    console.log(title,price,imageSrc)
    updateCartTotal();
}

//completely getting the items
function addProductToCart(title, price, imageSrc) {
    let cartItems = document.getElementsByClassName('contents-of-cart')[0];
    let cartItemNames = cartItems.getElementsByClassName('cart-product-title');
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('You already have this item in your cart');
            return;
        }
    }
    
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-box');
    let cartRowContents = `   
        <img src="${imageSrc}" alt="" class="cart-img">
        <div class="details-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-product-price">${price}</div>
            <input type="number" value="1" class="cart-product-quantity">
        </div>
        <!-- remove cart -->
        <i class='bx bxs-trash-alt cart-remove-icon'></i>`;

    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('cart-remove-icon')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-product-quantity')[0].addEventListener('change', quantityChange);
}



//updating the total 
function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('contents-of-cart')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-box');
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-product-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-product-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
}