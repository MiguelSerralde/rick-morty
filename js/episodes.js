let page = 1

const createCard = (episode) => {       
    
    const card = document.createElement("div")
    card.classList.add ("episode-card")        
    const infoDiv = document.createElement("div")
    infoDiv.classList.add("episode-info")

    const name = document.createElement("h3")
    name.classList.add("episode-name")
    name.textContent = episode.name    
        
    card.appendChild(name)
    card.appendChild(infoDiv)

    const episodeTemp = document.createElement("h4") 
    episodeTemp.classList.add("episode-info_episode")
    episodeTemp.innerHTML = "<b>Episode: </b>" + episode.episode
    infoDiv.appendChild(episodeTemp)
    
    const dateEpisode = document.createElement("span")
    dateEpisode.classList.add("episode-info_date")
    dateEpisode.innerHTML = "<b>Air date: </b>" + episode.air_date    
    infoDiv.appendChild(dateEpisode)

    return card
    
}

const loadCharecter = async(url) => {
    const episodeGrid = document.getElementById("episodes-grid")    
    try {
        const response = await axios.get(url)                   
        const episodes = response.data.results
        episodeGrid.innerHTML = ''        

        for (const episode of episodes) {
            const detailResponse = await axios.get(episode.url)                     
            const episodeCard = createCard(detailResponse.data)            
            episodeGrid.appendChild(episodeCard)
        }
    }
    catch(error){
        console.log(error)
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const btnPrevius = document.getElementById("btnPrevius").style.display = "none"
    loadCharecter("https://rickandmortyapi.com/api/episode")
})

const searchCharacter = async () => {
    const episodeName = document.querySelector('.search-input').value.toLowerCase()
    const episodeGrid = document.getElementById("episodes-grid")
    if (episodeName){
        document.getElementById("btnNext").style.display = "none"
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/episode/?name=${episodeName}`)
            console.log(`https://rickandmortyapi.com/api/episode/?name=${episodeName}`)
            const characters = response.data.results
            episodeGrid.innerHTML = ""

            for (const character of characters) {
            const detailResponse = await axios.get(character.url)            
            const characterCard = createCard(detailResponse.data)            
            episodeGrid.appendChild(characterCard)
        }
        } catch(error) {
            console.log("Error al buscar el personaje: " + characterName)
        }
    } else {
        loadCharecter("https://rickandmortyapi.com/api/episode/")
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
    } 
    if(page >= 3){       
        document.getElementById("btnNext").style.display = "none"
    }      
    loadCharecter("https://rickandmortyapi.com/api/episode/?page=" + page)        
})

document.getElementById("btnPrevius").addEventListener("click", () => {
    page = page - 1    
    if (page = 1 && document.getElementById("btnNext").style.display == "block"){
        document.getElementById("btnPrevius").style.display = "none"
    }
        if(page = 2){
            document.getElementById("btnNext").style.display = "block"
        }
    
    loadCharecter("https://rickandmortyapi.com/api/episode/?page=" + page)    
})