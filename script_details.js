// Global variables area:

// Contenitore dei risultati:
const resultsBox = document.getElementById("results-area");
// Input post name:
const postName = document.getElementById("post-name");
// Input post description:
const postDesc = document.getElementById("post-description");
// Input post brand:
const postBrand = document.getElementById("post-brand");
// Input post ImageURL:
const postImg = document.getElementById("post-imageURL");
// Input post price:
const postPrice = document.getElementById("post-price");
// Alert per dati incompleti:
const inputAlert = document.getElementById("alert-msg");
// Alert per update completa:
const editedAlert = document.getElementById("update-msg");
// Alert per update completa:
const deleteAlert = document.getElementById("delete-msg");
// Endpoint:
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";

const paramObj = new URLSearchParams(window.location.search); // Oggetto con i vari query params
const myPostId = paramObj.get("pid"); // Id del post attivo...
// console.log(myPostId);

// Esegui al caricamento della pagina:
// window.onload = showPost();

// // Recupera i dati del singolo post ed inseriscili nei rispettivi input
// async function showPost() {
//     try {
//         const res = await fetch(apiUrl + myPostId, {headers:{Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ4YTdkZDk0MTVjZTAwMTkzNDYzMjkiLCJpYXQiOjE3MDg2OTc1NjUsImV4cCI6MTcwOTkwNzE2NX0.pilbwHWWeopRLyXzfkdOHt1jGqU2CzcCKn1Gpn_qyLQ'}});
//         const json = await res.json();
    
//         postName.value = json.name;
//         postDesc.value = json.description;
//         postBrand.value = json.brand;
//         postImg.value = json.imageURL;
//         postPrice.value = json.price ? json.price : "0";
//     } catch(err) {
//         console.log(err);
//     }
// }

// Invoca la funzione getPosts al caricamento della pagina:
window.onload = getPosts();

// Ottieni tutti i posts dall'endpoint
async function getPosts() {
    resultsBox.innerHTML = "";
    try {
        const res = await fetch(apiUrl + myPostId, {headers:{Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ4YTdkZDk0MTVjZTAwMTkzNDYzMjkiLCJpYXQiOjE3MDg2OTc1NjUsImV4cCI6MTcwOTkwNzE2NX0.pilbwHWWeopRLyXzfkdOHt1jGqU2CzcCKn1Gpn_qyLQ'}});


        const post = await res.json(); // Qui avrò un array di oggetti (posts..)
        console.log(post);
        postName.value = post.name;
        postDesc.value = post.description;
        postBrand.value = post.brand;
        postImg.value = post.imageURL;
        postPrice.value = post.price ? post.price : "0";
        createPostTemplate(post);
        // json.forEach((post) => {
        //     createPostTemplate(post);
        // });
        // console.log(json);
    } catch (error) {
        console.log(error);
    }
}

// Crea il template HTML relativo al singolo post (riga di tabella...)
function createPostTemplate({ _id, name, description, brand, imageURL, price }) {

    // Istruzioni per costruire il template tramite JS:
    let tableRow = document.createElement("tr");

    let rowName = document.createElement("th");
    rowName.innerText = name;
    // console.log(rowName.innerText);
    let rowDesc = document.createElement("td");
    rowDesc.innerText = description;
    // console.log(rowDesc.innerText);
    let rowBrand = document.createElement("th");
    rowBrand.innerText = brand;
    // console.log(row.innerText);

    let rowImageURL = document.createElement("td");
    rowImageURL.innerText = imageURL;
    // console.log(rowImageURL);
    // let rowImageURl = document.createElement("img");
    // rowImageURL.href = rowImageURl.innerText;
    
    // document.body.appendChild(rowImageURl);

    let rowPrice = document.createElement("td");
    rowPrice.innerText = price;
    let rowOps = document.createElement("td");



    // Tasto di modifica:
    let editBtn = document.createElement("a");
    editBtn.classList.add("btn", "btn-primary", "btn-sm");
    editBtn.href = `detail.html?pid=${_id}`;
    editBtn.target = "_blank";
    let editImg = document.createElement("i");
    editImg.classList.add("fa-solid", "fa-pencil");
    let editText = document.createElement("span");
    editText.classList.add("ms-1");
    editText.innerText = "Edit";

    editBtn.appendChild(editImg);
    editBtn.appendChild(editText);

    // Tasto di cancellazione:
    let delBtn = document.createElement("a");
    delBtn.classList.add("btn", "btn-danger", "btn-sm", "ms-1");
    delBtn.addEventListener("click", () => {
        deletePost(_id);
    });
    let delImg = document.createElement("i");
    delImg.classList.add("fa-solid", "fa-trash");
    let delText = document.createElement("span");
    delText.classList.add("ms-1");
    delText.innerText = "Delete";

    delBtn.appendChild(delImg);
    delBtn.appendChild(delText);

    // rowOps.appendChild(editBtn);
    rowOps.appendChild(delBtn);

    tableRow.appendChild(rowName);
    tableRow.appendChild(rowDesc);
    tableRow.appendChild(rowBrand);
    tableRow.appendChild(rowImageURL);
    tableRow.appendChild(rowPrice);
    tableRow.appendChild(rowOps);

    resultsBox.appendChild(tableRow);
}

// Funzione per editare il post attivo nella pagina detail.html
async function editPost() {
    // Validation per la casistica di utente che svuota tutti gli input...
    if(postName.value && postDesc.value && postBrand.value && postImg.value && postPrice.value) {
        try {
            // Recuperare i dati attivi degli input ed inserirli nell'oggetto Payload
            let myPayload = { "name": postName.value, "description": postDesc.value, "brand": postBrand.value, "imageURL": post.imageURL.value, "price": postPrice.value };
            console.log(postName, postDesc, postBrand, postImg, postPrice);
            const res = await fetch(apiUrl + myPostId, { "method": "PUT", "body": JSON.stringify(myPayload), "headers": { "Content-Type": "application/json" }});
            // Avviso temporaneo di avvenuta modifica
            editedAlert.classList.toggle("d-none");
            setTimeout(() => {
                editedAlert.classList.toggle("d-none");
            }, 5000);
        } catch(err) {
            console.log(err);
        }
    } else {
        // Avviso temporaneo di validation fallita
        inputAlert.classList.toggle("d-none");
        setTimeout(() => {
            inputAlert.classList.toggle("d-none");
        }, 5000);
    }
}

// Funzione per cancellare un post di id=pid
async function deletePost(pid) {
    const res = await fetch(apiUrl + pid, { "method": "DELETE" });
    // console.log(`Cancellazione del post ${pid} eseguita con successo!`);
    // Avviso temporaneo di avvenuta cancellazione
    deleteAlert.classList.toggle("d-none");
    setTimeout(() => {
        deleteAlert.classList.toggle("d-none");
    }, 5000);
    getPosts();
}