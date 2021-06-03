const commandId = localStorage.getItem("orderId");
if(commandId === null){
    window.location.href = "index.html";
};

function addConfirmOrder(){
    const totalPrice = localStorage.getItem("totalOrder");
    document.getElementById("cameraPrice").textContent = totalPrice / 100 + "euros";

    const commandId = localStorage.getItem("orderId");
    document.getElementById("commandId").textContent = commandId;

};

function removeItems(){
    let buttonHome = document.getElementById("btnHome")
    buttonHome.addEventListener("click", function(){
        localStorage.removeItem("cart");
        localStorage.removeItem("totalOrder");
        localStorage.removeItem("orderId");
        window.location.href = "index.html";
    })
};



// call functions
addConfirmOrder();
removeItems();