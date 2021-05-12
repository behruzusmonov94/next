//index sahifa

const app = document.getElementById('app')

function render(url, name, price) {
    let html = `
    <div class="card m-2" style="width: 18rem;">
    <img src="${url}" class="card-img-top" alt="">
    <div class="card-body">
        <p class="card-text fs-5 text-center">${name}</p>
        <p class="card-text fs-5 fw-bold text-primary text-center">${price}</p>
    </div>
</div>
    `
    return html
}


db.collection('Products').get().then((snapshot)=>{
    snapshot.forEach((doc)=>{
        let name = doc.data().name
        let price = doc.data().price
        let pathReference = storage.ref(`products/${doc.data().imageUrl}`);

        pathReference.getDownloadURL().then((url)=>{
            app.innerHTML += render(url, name, price)
        })

        


    })
})