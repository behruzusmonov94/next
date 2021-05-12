//index sahifa

const app = document.getElementById('app')

function render(url, name, price) {
    let html = `
    

    <div class="box card">
        <img src="${url}">
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



//dark mode

const darkMode = document.getElementById('darkMode')
const html = document.querySelector('html')

darkMode.addEventListener('click', (e) => {
    html.classList.toggle('dark-mode')
    if(e.target.classList.contains('fa-moon')){
        e.target.classList.remove('fa-moon')
        e.target.classList.add('fa-sun')
    }else{
        e.target.classList.remove('fa-sun')
        e.target.classList.add('fa-moon')
    }
    
})

