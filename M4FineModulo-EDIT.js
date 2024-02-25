// Endpoint:
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";

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