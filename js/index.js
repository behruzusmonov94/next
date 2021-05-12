//index sahifa

const app = document.getElementById('app')

function render(url, name, price) {
    let html = `
    

    <div class="box card">
        <img src="${url}">
        <div class="card-body">
            <p class="card-text fs-6 text-center fw-bold">${name}</p>
            <p class="card-text fs-6 fw-bold text-primary text-center">${formatter.format(price)}</p>
            <a href="https://t.me/erankaa" class="btn btn-outline-primary btn-sm">Batafsil</a>
        </div>
    </div>

    `
    return html
}

// Create our number formatter.
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'UZS',
    maximumFractionDigits: 0,
    
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  

//exchange dollar to uzs
const exDollar = 10520;





db.collection('Products').get().then((snapshot)=>{
    snapshot.forEach((doc)=>{
        let name = doc.data().name
        let price = doc.data().price
        let pathReference = storage.ref(`products/${doc.data().imageUrl}`);

        

        pathReference.getDownloadURL().then((url)=>{
            app.innerHTML += render(url, name, price*exDollar)
        })

    })
})



