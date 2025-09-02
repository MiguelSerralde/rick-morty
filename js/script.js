
const createCard = (character) => {
    console.log("Trying to create")
    
    const card = document.createElement("div")
    card.classList.add ("character-card")        
    const infoDiv = document.createElement("div")
    infoDiv.classList.add("character-info")

    const name = document.createElement("h2")
    name.classList.add("character-name")
    name.textContent = character.name

    const typesDiv = document.createElement("div")
    typesDiv.classList.add("character-types")
    
    
    character.location.forEach((type) => {
        const locationdeSpan = document.createElement("span")
        locationdeSpan.classList.add("character-location" )
        locationdeSpan.textContent = location.name
        typesDiv.appendChild(typeSpan)
    });
    
    /*
    infoDiv.appendChild(name)
    infoDiv.appendChild(typesDiv)

    const imageContainer = document.createElement("div")
    imageContainer.classList.add("character-image-container")

    const image = document.createElement("img")
    image.classList.add("character-image")
    image.src = character.sprites.front_default    
    image.alt = character.name
    
    imageContainer.appendChild(image)

    card.appendChild(infoDiv)
    card.appendChild(imageContainer)

    return card
    */
}

/*With Fetch
document.addEventListener("DOMContentLoaded", () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50?")
    .then((response) => response.json())
    .then((data) => {
        const characterGrid = document.getElementById("character-grid")
        data.results.forEach((character) => {
            fetch(character.url)
            .then((response) => response.json())
            .then((characterData) => {
                const characterCard = createCard(characterData)
                characterGrid.appendChild(characterCard)
            })
        })
    }) 
    .catch((error) => {
        console.log(error)
    })   
})*/

//With Axios
/*document.addEventListener("DOMContentLoaded", () => {
    axios.get("https://pokeapi.co/api/v2/pokemon", {params: {limit:40}})   
    .then((response) => {
        const characterGrid = document.getElementById("character-grid")
        const { data } = response

        data.results.forEach((character) => {
            fetch(character.url)
            .then((response) => response.json())
            .then((characterData) => {
                const characterCard = createCard(characterData)
                characterGrid.appendChild(characterCard)
            })
        })
    }) 
    .catch((error) => {
        console.log(error)
    })   
})*/

const loadCharecter = async() => {
    const characterGrid = document.getElementById("character-grid")
    try {
        const response = await axios.get("https://rickandmortyapi.com/api/character", {params: {limit:40}})                   
        const characters = response.data.results
        characterGrid.innerHTML = ''        

        for (const character of characters) {
            const detailResponse = await axios.get(character.url)            
            const characterCard = createCard(detailResponse.data)
            console.log(detailResponse.data)
            //characterGrid.appendChild(characterCard)
        }
    }
    catch(error){
        console.log(error)
    }
}
document.addEventListener("DOMContentLoaded", () => {
    loadCharecter()
})

const searchPokemon = async () => {
    const pokemonName = document.querySelector('.search-input').value.toLowerCase()
    if (pokemonName){
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            const pokemonGrid = document.getElementById("character-grid")
            pokemonGrid.innerHTML= ''
            const characterCard = createCard(response.data)
            pokemonGrid.appendChild(characterCard)
        } catch(error) {
            console.log("Error al buscar el pokemon: " + pokemonName)
        }
    }
}

document.querySelector(".search-button").addEventListener("click", () => {
    searchPokemon()
})
document.querySelector(".search-input").addEventListener("keypress", function(e)  {
    if (e.key === "Enter"){        
        searchPokemon()
    }
})