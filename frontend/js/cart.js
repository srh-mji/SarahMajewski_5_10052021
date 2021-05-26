// GET objects in cart
let cart = localStorage.getItem('cart');

cart = JSON.parse(cart);

console.log(cart);

// Display cameras
for (let camera of cart) {

    // Get parent element

    cameraList = document.querySelector("cameraListCart");

    // Get and Clone template

    const template = document.getElementById("camera");
    const clone = document.importNode(template.content, true);

    // Hydrate element clone

    clone.getElementById("cameraName").textContent = camera.name;
    clone.getElementById("cameraPrice").textContent = camera.price / 100 + " €";

    // Display element
    document.getElementById("cameraListCart").appendChild(clone);

}
// TotalPrice




// Form