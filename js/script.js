let page = 1

const createCard = (character) => {   
       
    const card = document.createElement("div")
    card.classList.add ("character-card")        
    const infoDiv = document.createElement("div")
    infoDiv.classList.add("character-info")

    const name = document.createElement("h2")
    name.classList.add("character-name")
    name.textContent = character.name

    const locationDiv = document.createElement("div")
    locationDiv.classList.add("character-location")
    
    const locationSpan = document.createElement("span")
    locationSpan.classList.add("character-location" )    
    locationSpan.innerHTML = "<b>Location:</b> " + character.location.name
    locationDiv.appendChild(locationSpan)
    
    const species = document.createElement("span")
    species.classList.add("character-species")
    species.innerHTML = "<b>Species:</b> " + character.species

    const statusCharacter = document.createElement("div")
    statusCharacter.classList.add("character-status")
    const statusCharacterSpan = document.createElement("span")
    statusCharacterSpan.classList = ("character-status", character.status)
    statusCharacterSpan.innerHTML = "<b>Status:</b> " + character.status
    
    infoDiv.appendChild(name)
    infoDiv.appendChild(locationDiv)
    locationDiv.appendChild(species)
    locationDiv.appendChild(statusCharacter)
    statusCharacter.appendChild(statusCharacterSpan)

    const imageContainer = document.createElement("div")
    imageContainer.classList.add("character-image-container")

    const image = document.createElement("img")
    image.classList.add("character-image")
    image.src = character.image
    image.alt = character.name
    
    imageContainer.appendChild(image)

    card.appendChild(infoDiv)
    card.appendChild(imageContainer)
    
    return card
    
}

const loadCharecter = async(url) => {
    const characterGrid = document.getElementById("character-grid")
    try {
        const response = await axios.get(url)                   
        const characters = response.data.results
        characterGrid.innerHTML = ''        

        for (const character of characters) {
            const detailResponse = await axios.get(character.url)                     
            const characterCard = createCard(detailResponse.data)            
            characterGrid.appendChild(characterCard)
        }
    }
    catch(error){
        console.log(error)
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const btnPrevius = document.getElementById("btnPrevius").style.display = "none"
    loadCharecter("https://rickandmortyapi.com/api/character/")
})

const searchCharacter = async () => {
    const characterName = document.querySelector('.search-input').value.toLowerCase()
    const characterGrid = document.getElementById("character-grid")
    if (characterName){
        document.getElementById("btnNext").style.display = "none"
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${characterName}`)
            console.log(`https://rickandmortyapi.com/api/character/?name=${characterName}`)
            const characters = response.data.results
            characterGrid.innerHTML = ""

            for (const character of characters) {
            const detailResponse = await axios.get(character.url)            
            const characterCard = createCard(detailResponse.data)            
            characterGrid.appendChild(characterCard)
        }
        } catch(error) {
            console.log("Error al buscar el personaje: " + characterName)
        }
    } else {
        loadCharecter("https://rickandmortyapi.com/api/character/")
        document.getElementById("btnNext").style.display = "block"
    }
}

document.querySelector(".search-button").addEventListener("click", () => {    
    searchCharacter()
})

document.querySelector(".search-input").addEventListener("keypress", function(e)  {
    if (e.key === "Enter"){        
        searchCharacter()
    } 
})

document.getElementById("btnNext").addEventListener("click", () => {
    page = page + 1
    if ( page > 1) {
        document.getElementById("btnPrevius").style.display = "block"
    } else {
        if(page = 42){
            document.getElementById("btnNext").style.display = "none"
        }
    }    
    loadCharecter("https://rickandmortyapi.com/api/character/?page=" + page)    
    console.log("https://rickandmortyapi.com/api/character/?page=" + page)
})

document.getElementById("btnPrevius").addEventListener("click", () => {
    page = page - 1
    if (page = 1){
        document.getElementById("btnPrevius").style.display = "none"
    }else {
        if(page = 41){
            document.getElementById("btnNext").style.display = "block"
        }
    }
    loadCharecter("https://rickandmortyapi.com/api/character/?page=" + page)    
})