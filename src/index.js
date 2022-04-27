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
      createAndPostToys ()
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

    let toy_image_url = element.image
    appendedDiv.innerHTML = `<h2>${element.name}</h2><img src=${toy_image_url} class=toy-avatar/><p>${element.likes} Likes </p><button class=like-btn>Like <3</button>`
  });
}



function createAndPostToys () {
  const formBtn = document.querySelector('form');
  formBtn.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData =  {
      name: e.target.name.value,
      image: e.target.image.value,
    }
    postToys(formData.name, formData.image)
  })
}



function postToys(name, image, likes=0) {
  return fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "applicaiton/json"
    },
    body: JSON.stringify({
      name,
      image,
      likes
    })
  })
  .then( function ( response ) {
    return response.json()
  })
  .then( function ( object ) {
    console.log(object)  
    document.body.innerHTML = object[ "id" ]
  })
  .catch( function ( error ) {
    document.body.innerHTML = error.message
  })
}


