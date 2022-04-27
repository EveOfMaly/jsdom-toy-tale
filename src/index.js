let addToy = false;
let allToyObjects = []

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});



function fetchToys() {
  return fetch("http://localhost:3000/toys")
  .then(response => response.json()) 
  .then(alltoysjson => {
    allToyObjects = alltoysjson
    renderToys(allToyObjects)})
}

function renderToys(toysObject) {
  const toyCollection = document.querySelector("#toy-collection");
  
  toysObject.forEach(element => {
    let createNewDiv = document.createElement("div")
    let appendedDiv = toyCollection.appendChild(createNewDiv);
    appendedDiv.className = "card"

    debugger

    let toy_image_url = element.image
    appendedDiv.innerHTML = `<h2>${element.name}</h2><img src=${toy_image_url} class=toy-avatar/><p>${element.likes} Likes </p><button class=like-btn>Like <3</button>`
  });
}





// function postToys() {
//   return fetch("http://localhost:3000/toys", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "applicaiton/json"
//     },
//     body: JSON.stringify({
//       toyName,
//       toyImageUrl
//     })
//   })
//   .then( function ( response ) {
//     return response.json()
//   })
//   .then( function ( object ) {
//     console.log(object)  
//     document.body.innerHTML = object[ "id" ]
//   })
//   .catch( function ( error ) {
//     document.body.innerHTML = error.message
//   })
// }


