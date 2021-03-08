const coffeeShopsList = document.querySelector('#cafe-list');

//  render cafe takes in the document that we want to render to the page by creating an element
function renderCafe(doc) {
    //  create new li elements and store in variables
    let li = document.createElement('li');
    let name = document.createElement('span');
    let location = document.createElement('span');

    // applies setAttribute and textContent to the values from the data to the variables
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    location.textContent = doc.data().location;

    // The appendChild() method here appends a span node as the last child of the li node
    li.appendChild(name);
    li.appendChild(location);

    // Appends <li> to <ul> 
    coffeeShopsList.appendChild(li);

}

// Retreive data from the collection, get a snapshot of it
db.collection('coffeeShops').get().then((snapshot) => {
    // Loop through the array of items
    snapshot.docs.forEach(doc => {
        // console.log(doc.data());
        console.log(doc.data().name);
        // For each item call this function and pass in 
        renderCafe(doc);
    })
}) 

console.log("Testing test Branch");