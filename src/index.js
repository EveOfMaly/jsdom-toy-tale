let addToy = false;
let allToyObjects = []

document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
  clickLike()

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
   
    let toy_image_url = element.image

    let h2 = document.createElement('h2')
    h2.innerText = element.name 

    let img = document.createElement('img')
    img.setAttribute('src', element.image)
    img.setAttribute('class', "toy-avatar")

    let p = document.createElement('p')
    p.innerText = `${element.likes} likes`

    let btn = document.createElement('button')
    btn.setAttribute('class', 'like-btn')
    btn.setAttribute('id', element.id)
    btn.innerText = "like"

    btn.addEventListener("click", (e) => {
      Likes(e)
      console.log(e.target)
    });

    let divCard = document.createElement("div")
    divCard.setAttribute('class', 'card')
    divCard.append(h2, img, p, btn)
    toyCollection.append(divCard)
   
  });
}



function createAndPostToys () {
  const formBtn = document.querySelector('form');
  formBtn.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData =  {
      name: e.target.name.value,
      image: e.target.image.value
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
      image 
      
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


function Likes(e) {
  e.preventDefault()

  let currentLikes = parseInt(e.target.previousElementSibling.innerText)
  let updatedLikes = currentLikes + 1 


  return fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "applicaiton/json"
    },
    body: JSON.stringify({
      "likes": updatedLikes 
    })
  })
  .then( function ( response ) {
    return response.json()
  })
  .then( function ( like_object ) {
    console.log(like_object)  
    e.target.previousElementSibling.innerText = `${updatedLikes} likes`;
  })
  .catch( function ( error ) {
    document.body.innerHTML = error.message
  })

}


