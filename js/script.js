const createCard = (character) => {
    const card = document.createElement("div")
    card.classList.add ("char-chard")    
    console.log(character)
    const infoDiv = document.createElement("div")
    infoDiv.classList.add("character-info")

    const name = document.createElement("h2")
    name.classList.add("character-name")
    name.textContent = character.name

    const typesDiv = document.createElement("div")
    typesDiv.classList.add("character-types")

    character.types.forEach((type) => {
        const typeSpan = document.createElement("span")
        typeSpan.classList.add("character-type", type.type.name)
        typeSpan.textContent = type.type.name
        typesDiv.appendChild(typeSpan)
    });

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
}

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
})