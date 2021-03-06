const coffeeShopsList = document.querySelector('#cafe-list');
const form  = document.querySelector('#add-cafe-form');


//  render cafe takes in the document that we want to render to the page by creating an element
function renderCafe(doc) {
    //  create new li elements and store in variables
    let li = document.createElement('li');
    let name = document.createElement('span');
    let location = document.createElement('span');
    let cross = document.createElement('div');

    // applies setAttribute and textContent to the values from the data to the variables
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    location.textContent = doc.data().location;
    cross.textContent = 'x';

    // The appendChild() method here appends a span node as the last child of the li node
    li.appendChild(name);
    li.appendChild(location);
    li.appendChild(cross);

    // Appends <li> to <ul> 
    coffeeShopsList.appendChild(li);

    //  Deleting data
    cross.addEventListener('click', (e) => {
        // Using the stopPropagation so it doesn't bubble
        e.stopPropagation();
        // Assigning the id variable to the the e.target which is the cross, Then get the parent element of that which is the li, then getting a data-attribute from that 
        let id = e.target.parentElement.getAttribute('data-id');
        // using .doc() method to retreive a single item and the id variable to query firestore and delete it using delete method
        db.collection('coffeeShops').doc(id).delete();
    });
}

// Retreive data from the collection, get a snapshot of it
// db.collection('coffeeShops').where('name', '==', '3FE').get().then((snapshot) => {
// db.collection('coffeeShops').where('location', '==', 'Dublin 2').orderBy('name') .get().then((snapshot) => {

// // db.collection('coffeeShops') .get().then((snapshot) => {
//     // Loop through the array of items
//     snapshot.docs.forEach(doc => {
//         // console.log(doc.data());
//         // console.log(doc.data().name);
//         // For each item call this function and pass in 
//         renderCafe(doc);
//     })
// }) 

//  Saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    //  The add method takes in an object parameter
    db.collection('coffeeShops').add({
        name: form.name.value,
        location: form.location.value
    });
    //  This is clearing the form values after adding coffee shop
    form.name.value = '';
    form.location.value = '';
})

// Real-time listener
db.collection('coffeeShops').orderBy('location').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        // console.log(change.doc.data());
        if(change.type == 'added') {
            renderCafe(change.doc)
        } else if(change.type == 'removed') {
            let li = coffeeShopsList.querySelector('[data-id=' + change.doc.id + ']');
            console.log(li);
            coffeeShopsList.removeChild(li)
        }
    });
})

//  Updating data
// db.collection('coffeeShops').doc('F4bHQSVZ83pT2d0VYfNy').update({
//     name: '3fe'
// })