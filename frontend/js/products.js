// Récuperer ID 

const urlParam = new URLSearchParams(window.location.search);
const idName = urlParam.get("id");

// Lien avec API 
async function getCameraData() {
    return await fetch(apiUrl + "/api/cameras/" + idName)
        .then((httpBodyResponse) => httpBodyResponse.json())
        .then((camera) => camera)
        .catch((error) => alert("Erreur :" + error))
};

async function camera() {
    let camera = await getCameraData();
    console.log(camera);

    // Hydrate content
    document.getElementById("cameraImage").src = camera.imageUrl;
    document.getElementById("cameraName").textContent = camera.name;
    document.getElementById("cameraPrice").textContent = camera.price / 100 + " euros";
    document.getElementById("cameraDescription").textContent = camera.description;

    // Display lenses in select 
    numberLenses = camera.lenses;

    for (let i = 0; i < numberLenses.length; i++) {
        select = document.querySelector("cameraForm");

        // Get and Clone template

        const template = document.getElementById("cameraSelect");
        const clone = document.importNode(template.content, true);

        // Hydrate element clone

        clone.getElementById("cameraOption").textContent = camera.lenses[i];

        // Display element
        document.getElementById("cameraForm").appendChild(clone);
    };


    // Click button=> add to Cart

    let btnCart = document.getElementById("addToCart");

    btnCart.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("click ok")

        // Create table for localStorage

        let myCamera = {
            id: camera._id,
            name: camera.name,
            imageUrl: camera.imageUrl,
            description: camera.description,
            price: camera.price,
        };

        let tabCameras = myCamera;
        console.log(myCamera);
        // Transform table in JSON

        tabCameras = JSON.stringify(myCamera);


        localStorage.setItem("cart", tabCameras);


    });


};

// appel function camera
camera();