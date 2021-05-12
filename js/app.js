//add product

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


    addProductForm.reset()



})






