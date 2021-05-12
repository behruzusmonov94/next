//test auth
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        //add product

        const userH = document.getElementById('userH')

        userH.textContent = user.email

        const addProductForm = document.getElementById('addProductForm')


        const photoUploader = document.getElementById('photo')
        const uploader = document.getElementById('uploader')



        photoUploader.addEventListener('change', (e) => {

            var file = e.target.files[0];

            var output = document.getElementById('output');
            output.src = URL.createObjectURL(file);
            output.onload = function () {
                URL.revokeObjectURL(output.src) // free memory
            }



        })



        addProductForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let name = addProductForm.name.value.trim();
            let price = addProductForm.price.value.trim();
            let file = addProductForm.photo.files[0];


            if (!name == "" && !price == "" && !photo == "") {

                let now = Date.now()

                db.collection('Products').doc().set({
                    name: name,
                    price: price,
                    imageUrl: now
                }).then(() => {
                    console.log('success');


                    //upload image

                    var storageRef = firebase.storage().ref('products/' + now);

                    var task = storageRef.put(file)

                    task.on('state_changed',
                        function progress(snapshot) {
                            var precentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            uploader.value = precentage;
                        },
                        function error(err) {
                            console.log(err);
                        },
                        function complete() {
                            console.log('success');
                            var output = document.getElementById('output');
                            output.src = "";
                            addProductForm.reset()
                            document.querySelector('.productAddedMessage').style.display = "block"
                            uploader.value = "0"
                        }
                    )

                }).catch(() => {
                    console.log('error');
                })





            } else {
                let errorName = document.getElementById('errorName')
                errorName.textContent = 'Type product name'
                errorName.style = 'color: red; display: block;'
                let errorPrice = document.getElementById('errorPrice')
                errorPrice.textContent = 'Type product Price'
                errorPrice.style = 'color: red; display: block;'
                let errorPhoto = document.getElementById('errorPhoto')
                errorPhoto.textContent = 'Select product photo'
                errorPhoto.style = 'color: red; display: block;'
            }






        })





        const productList = document.getElementById('productList');




        db.collection('Products').orderBy('name').get().then((snapshot) => {
            snapshot.forEach((doc)=>{
                let name = doc.data().name;
                let price = doc.data().price;
                productList.innerHTML += `
                <li class="list-group-item d-flex justify-content-between" data-id="${doc.id}">
                <div>
                    <span>${name} - </span>
                    <span class="badge bg-primary">${price}</span>
                </div>

                <button class="btn btn-danger btn-sm" onclick="remove(this)">Delete</button>
                </li>`
            })
        })



        


        // // read data

        // db.collection('Products').onSnapshot((snapshot) => {
        //     let changes = snapshot.docChanges();
        //     changes.forEach(change => {
        //         let name = change.doc.data().name;
        //         let price = change.doc.data().price;
        //         productList.innerHTML += `
        // <li class="list-group-item d-flex justify-content-between" data-id="${change.doc.id}">
        // <div>
        //     <span>${name} - </span>
        //     <span class="badge bg-primary">${price}</span>
        // </div>
        
        // <button class="btn btn-danger btn-sm" onclick="remove(this)">Delete</button>
        // </li>`
        //     })
        // })





        //dark mode

        const darkMode = document.getElementById('darkMode')
        const html = document.querySelector('html')

        darkMode.addEventListener('click', (e) => {
            html.classList.toggle('dark-mode')
            if (e.target.classList.contains('fa-moon')) {
                e.target.classList.remove('fa-moon')
                e.target.classList.add('fa-sun')
            } else {
                e.target.classList.remove('fa-sun')
                e.target.classList.add('fa-moon')
            }

        })

        

        //signout
        const signOut = document.getElementById('signOut')
        signOut.addEventListener('click', ()=>{
            auth.signOut()
        })

    } else {
        // User is signed out
        console.log('user signed out');
        location.href = 'auth.html'
    }
});


//delete data
function remove(e) {
    const dataID = e.parentElement.getAttribute('data-id')

    var conf = confirm('Rostan ham o\'chirmoqchimisiz?')
    
    if(conf){
        db.collection('Products').doc(dataID).delete().then(()=>{
            e.parentElement.remove()
        }).catch((err)=>{
            console.log(err);
        })
    }
    

  

}
