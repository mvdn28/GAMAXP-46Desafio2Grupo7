console.log("Events API")

const url = "https://xp41-soundgarden-api.herokuapp.com/events"


//Exibir próximos eventos
const proxEvents = async() => {
    const response = await fetch(url)

    const events = await response.json()

    console.log(events)

    

    let proxEvents = document.querySelector("#proxEventos")
    let div = document.createElement("div")
    div.classList.add("container", "d-flex", "justify-content-center", "align-items-center")
    proxEvents.appendChild(div)
    for (var i = 0 ; i<3; i++){
        let event = events[i]
        console.log(event)

        let article = document.createElement("article")
        let h2 = document.createElement("h2")
        let h4 = document.createElement("h4")
        let p = document.createElement("p")
        let link = document.createElement("a")

        let date = new Date(event.scheduled)
        

        h2.innerText=event.name +' - '+date.getDay() + '/'+ date.getMonth()+'/'+ date.getYear()
        console.log(event.attractions)
        event.attractions.map(atraction => h4.innerText += atraction + ' ')
        p.innerText=event.description
        link.innerText="reservar agora"
        link.setAttribute("herf", `#`)
        
        
        article.classList.add("evento", "card", "p-5", "m-3")
        link.classList.add("btn", "btn-primary")

        div.appendChild(article)
        article.appendChild(h2)
        article.appendChild(h4)
        article.appendChild(p)
        article.appendChild(link)

    }
    let div2 = document.createElement("div")
    let link = document.createElement("a")
    div2.classList.add("container", "text-center")
    link.classList.add("btn", "btn-secondary")
    link.setAttribute("herf", `eventos.html`)
    link.innerText="ver todos os eventos"

    proxEvents.appendChild(div2)
    div2.appendChild(link)

    
}



proxEvents()


