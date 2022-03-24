
// base url for api
const url = "http://localhost:3000/ramens"



//DOM Selectors

const menu = document.querySelector("#ramen-menu")
const ramenDetail = document.getElementById('ramen-detail')
const rating = document.getElementById('rating-display')
const comment = document.getElementById('comment-display')
const newRamenForm = document.getElementById('new-ramen')

//Listeners

newRamenForm.addEventListener('submit', handleAddRamen)
// made a variable that stored the element and then made an event listener to listen for the submit function handleAddRamen


//fetchers
const getAllRamens = () => {
fetch(url) 
.then(resp => resp.json())
.then(renderAllRamens)  //((arrRamenObj) => renderAllRamens(arrRamenObj)) : this is the same ^
    // renderAllRamens is passed the array obj from json
}


//render functions
const renderAllRamens = (ramensArr) => {
    ramensArr.forEach(renderOneMenu)
    //iterates over each element in array
}

const renderOneMenu = (ramenObj) => {
// takes an a ramen object    
    //console.log(ramenObj)
    const img = document.createElement('img')
// creating the image tag 
    img.addEventListener('click', () => renderDetail(ramenObj))
// putting the event in renderOneMenu function so it renders at the same time, passing it a funciton built outside the scope with the same ramenObj argument    
    img.src = ramenObj.image
// taking the src from the image key in the passed in ramen obj
    menu.appendChild(img)
// adding the tag to the #ramen-menu div with menu const created above    

}

const renderDetail = (ramenObj) => {
// the function being passed to the event listener in renderOneMenu that will show the #ramen-details when clicked    
    //console.log(ramenObj)
    ramenDetail.innerHTML = `
    <img class="detail-image" src="${ramenObj.image}" alt="${ramenObj.name}" />
    <h2 class="name">${ramenObj.name}</h2>
    <h3 class="restaurant">${ramenObj.restaurant}</h3>
    `
// getting the innerHTML from the #ramen-detail which was assigned the ramenDetail const. Interpolating values from ramenObj parameter which is being passed in the array from JSON  
    rating.innerText = ramenObj.rating
    comment.innerText = ramenObj.comment
// using the elements grabbed and assigned to variables and changing the innerText to the contents from the array.keys
}


//event handlers
function handleAddRamen(e) {
    e.preventDefault()
    //prevent form default behavior
    console.log(e.target.restaurant)
    // the e.target is a reference to the object onto which the event was dispatched. then value accesses the value of that 
    const name = e.target.name.value
    const restaurant = e.target.restaurant.value
    const image = e.target.image.value
    const rating = e.target.rating.value
    const comment = e.target['new-comment'].value
// need to render this info, can use the renderOneMenu function already built to do this. just need an object to pass as an argument
    const newRamen = {
        name,
        restaurant,
        image,
        rating,
        comment

// if the key and value in an object are the same you only need to type it once. the keys in the object will line up with the variables built above
    }
    renderOneMenu(newRamen)
    // invoking the function to render a menu item created earlier and passing in the created object
}



// inititializers
getAllRamens()