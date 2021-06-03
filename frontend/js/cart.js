// GET cameras in cart
let cart = localStorage.getItem('cart');

cart = JSON.parse(cart);

console.log(cart);
// Delete cart empty if cart not empty 
if (cart.length > 0) {
    document.getElementById("cartEmpty").remove();
};

// Display cameras
for (let camera of cart) {

    // Get parent element

    cameraList = document.querySelector("cameraListCart");

    // Get and Clone template

    const template = document.getElementById("camera");
    const clone = document.importNode(template.content, true);

    // Hydrate element clone

    clone.getElementById("cameraName").textContent = camera.name;
    clone.getElementById("cameraLense").textContent = camera.lenses;
    clone.getElementById("cameraPrice").textContent = camera.price / 100 + " €";

    // Display element
    document.getElementById("cameraListCart").appendChild(clone);

}

// TOTAL PRICE
function getTotalPrice() {

    // Declare table for data number
    let totalPriceTable = [];

    // Get number data in cart
    for (let i = 0; i < cart.length; i++) {
        let priceInCart = cart[i].price;

        // Put priceInCart in totalPrice table
        totalPriceTable.push(priceInCart);
    };

    // Add price in totalPrice
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let totalPrice = totalPriceTable.reduce(reducer, 0);
    localStorage.setItem("totalOrder", JSON.stringify(totalPrice));
    return totalPrice;
    
};

// Display totalPrice
document.getElementById("cartTotalPrice").innerText = getTotalPrice() / 100 + " €";

// call function getTotalPrice
getTotalPrice();


// FORM
    // Purchase button
    document.getElementById('confirmOrder').onclick = (e) => {
        e.preventDefault();
        validateForm();
      };
  

    function validateForm() {
    
        let formOk= true;
    // const regex
    const letterRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const numberRegex = /^\d+$/;


    // récupere champs de formulaire 
    const lastname = document.getElementById("lastname").value;
    const firstname = document.getElementById("firstname").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;
    const adress = document.getElementById("adress").value;
    const postcode = document.getElementById("postcode").value;

    if (firstname == ""|| letterRegex.exec(firstname) == null || firstname.length < 3) {
        alert("Veuillez entrer votre prénom");
        document.getElementById("firstname").focus(); // Focus
        formOk = false;
    }
    if (lastname == "" || letterRegex.exec(lastname) == null || lastname.length < 3) {
        alert("Veuillez entrer votre nom");
        document.getElementById("lastname").focus(); // Focus
        formOk = false;
        }
    if (city == "" || letterRegex.exec(city) == null || city.length < 3) {
        alert("Veuillez entrer votre ville");
        document.getElementById("city").focus(); // Focus
        formOk = false;
    }
    if (email == "" || emailRegex.exec(email) == null) {
        alert("Veuillez entrer votre email");
        document.getElementById("email").focus(); // Focus
        formOk = false;
    }
    if (adress == "" || adress.length < 7) {
        alert("Veuillez entrer votre adresse");
        document.getElementById("adress").focus(); // Focus
        formOk = false;
    }
    if (postcode == "" || postcode.length != 5 || numberRegex.exec(postcode) == null) {
        alert("Veuillez entrer votre code postal");
        document.getElementById("postcode").focus(); // Focus
        formOk = false;
    }

    console.log(formOk);
    
    if(formOk === true){
        sendForm();
    };
};



// je lance une fonction lorque le formulaire sera validé 

function sendForm() {
    // Get input form
    let contact = {
        firstName: document.getElementById("firstname").value,
        lastName: document.getElementById("lastname").value,
        address: document.getElementById("adress").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
    };


    let products = Array();
    if (localStorage.getItem("cart") !== null) {
        let productTab = JSON.parse(localStorage.getItem("cart"));

        productTab.forEach(product => {
            console.log(product)
            products.push(product.id);
        });
    }

    let contactItems = JSON.stringify({
        contact,
        products
    });
    console.log(contactItems)
    confirmOrder(contactItems);
};



// SEND fetch method post
function confirmOrder(contactItems) {
    fetch (apiUrl + "/api/cameras/order", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: contactItems,
        })
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json);
            localStorage.setItem("orderId", JSON.stringify(json.orderId));
            window.location.href = "order_confirmation.html";
        })
        .catch((error) => alert("Erreur :" + error))
};