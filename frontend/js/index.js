// Lien avec API

async function getCameras() {
    return await fetch(apiUrl + "/api/cameras")
        .then((httpBodyResponse) => httpBodyResponse.json())
        .then((cameras) => cameras)
        .catch((error) => alert("Erreur :" + error))
};


async function cameras() {

    const cameras = await getCameras();

    for (var camera of cameras) {

        const template = document.getElementById("camera");

        cameraList = document.querySelector("cameraList");
        const clone = document.importNode(template.content, true);


        clone.getElementById("cameraImage").src = camera.imageUrl;
        clone.getElementById("cameraName").textContent = camera.name;
        clone.getElementById("cameraPrice").textContent = camera.price / 100 + " euros";
        clone.getElementById("cameraDescription").textContent = camera.description;
        clone.getElementById("cameraLink").href = "products.html?id=" + camera._id;

        document.getElementById("cameraList").appendChild(clone);

    }
};

cameras();