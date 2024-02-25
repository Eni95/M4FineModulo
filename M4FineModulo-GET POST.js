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

// Alert per dato cancellato:
const deleteAlert = document.getElementById("delete-msg");

// Endpoint:
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";

// Invoca la funzione getPosts al caricamento della pagina:
window.onload = getPosts();

// Ottieni tutti i posts dall'endpoint
async function getPosts() {
    resultsBox.innerHTML = "";
    try {
        const res = await fetch(apiUrl, {headers:{Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ4YTdkZDk0MTVjZTAwMTkzNDYzMjkiLCJpYXQiOjE3MDg2OTc1NjUsImV4cCI6MTcwOTkwNzE2NX0.pilbwHWWeopRLyXzfkdOHt1jGqU2CzcCKn1Gpn_qyLQ'}});
        const json = await res.json(); // Qui avrò un array di oggetti (posts..)
        json.forEach((post) => {
            createPostTemplate(post);
        });
        // console.log(json);
    } catch (error) {
        console.log(error);
    }
}

// Crea il template HTML relativo al singolo post (riga di tabella...)
function createPostTemplate({ _id, name, description, brand, imageURL, price }) {
    // Template tipo:
    // --------------
    // <tr>
    //     <th>Name</th>
    //     <td>Description</td>
    //     <td>Price</td>
    //     <td>
    //         <a class="btn btn-primary btn-sm">
    //             <i class="fa-solid fa-pencil" aria-hidden="true"></i>
    //             <span class="ms-1">Edit</span>
    //         </a>
    //         <a class="btn btn-danger btn-sm ms-1">
    //             <i class="fa-solid fa-trash" aria-hidden="true"></i>
    //             <span class="ms-1">Delete</span>
    //         </a>
    //     </td>
    // </tr>

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
    console.log(rowImageURL);
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

    rowOps.appendChild(editBtn);
    rowOps.appendChild(delBtn);

    tableRow.appendChild(rowName);
    tableRow.appendChild(rowDesc);
    tableRow.appendChild(rowBrand);
    tableRow.appendChild(rowImageURL);
    tableRow.appendChild(rowPrice);
    tableRow.appendChild(rowOps);

    resultsBox.appendChild(tableRow);
}

// Funzione per creare un nuovo post
async function createPost() {
    // Verifica di validazione:
    if(postName.value && postDesc.value && postBrand.value && post.imageURL.value && postPrice.value) {
        // Acquisisco i valori degli input per la creazione del post:
        let newPost = { "name": postName.value, "description": postDesc.value, "brand": postBrand.value, "imageURL": post.imageURL.value,"price": postPrice.value, "time": new Date() };
    
        try {
            const res = await fetch('https://striveschool-api.herokuapp.com/api/product', { method: "POST", body: JSON.stringify(newPost), headers: { "Content-type": "application/json;charset=UTF-8"}}); 
            getPosts();
        } catch(error) {
            console.log(error);
        }
    } else {
        // Avviso temporaneo di validation fallita
        inputAlert.classList.toggle("d-none");
        // console.log("Devi inserire tutti e 3 i campi obbligatori!");
        setTimeout(() => {
            inputAlert.classList.toggle("d-none");
        }, 5000);
    }
}
