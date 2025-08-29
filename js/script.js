const createCard = (character) => {
    const card = document.createElement("div")
    card.classList.add ("char-chard")
    
    const infoDiv = document.createElement("div")
    infoDiv.classList.add("character-info")

    const name = document.createElement("h2")
    name.classList.add("character-name")
    name.textContent = character.name

    const typesDiv = document.createElement("div")
    typesDiv.classList.add("character-types")

    character.types.forEach((types) => {
        const typeSpan = document.createElement("span")
        typeSpan.classList.add("character-type", type.type.name)
        typeSpan.textContent = type.type.name
        typesDiv.appendeChild(typeSpan)
    });

    infoDiv.appendeChild(name)
    infoDiv.appendeChild(typesDiv)

    const imageContainer = document.createElement("div")
    imageContainer.classList.add("character-image-container")

    const image = document.createElement("img")
    image.classList.add("character-image")
    image.scr = character.spites.fron.default
    image.alt = character.name

    imageContainer.appendChild(image)

    card.appendChild(infoDiv)
    card.appendChild(imageContainer)

    return card
}

document.addEventListener("DOMContentLoaded", () => {
    fetch("https://rickandmortyapi.com/api/character")
    .then((response) => response.json())
    .then((data) => {
        const characterGrid = document.getElementById("characyer-grid")
        data.results.forEach((response) => {
            fetch(character.url)
            .then((response) => response.json())
            .then((data) => {
                const characterData = createCard(characterData)
                characterGrid.appendChild(characterData)
            })
        })
    }) 
    .catch((error) => {
        console.log(error)
    })   
})