const urlEvent = "https://xp41-soundgarden-api.herokuapp.com/events"
const urlBooking= "https://xp41-soundgarden-api.herokuapp.com/bookings"

const title = document.title


//Exibir todos os eventos
const getEvents = async() => {
    const response = await fetch(urlEvent)

    const events = await response.json()
   

    let todosEvents = document.querySelector("#todosEventos")
    events.map((event)=>{
        let article = document.createElement("article")
        let h2 = document.createElement("h2")
        let h4 = document.createElement("h4")
        let p = document.createElement("p")
        let link = document.createElement("button")

        let date = new Date(event.scheduled)
        console.log(date)
        

        h2.innerText=event.name +' - '+date.getDate() + '/'+ (date.getMonth()+1)+'/'+ date.getFullYear()
        event.attractions.map(atraction => h4.innerText += atraction + ' ')
        p.innerText=event.description
        link.setAttribute("id", `reserva-${event._id}`)
        link.setAttribute("data-toggle",`modal`)
        link.setAttribute(`data-target`, `#reservaModal`)
        link.setAttribute(`type`,`button`)
        link.innerText="reservar agora"
        
        
        article.classList.add("evento", "card", "p-5", "m-3")
        link.classList.add("btn", "btn-primary","abrir")

        todosEvents.appendChild(article)
        article.appendChild(h2)
        article.appendChild(h4)
        article.appendChild(p)
        article.appendChild(link)

    })
    
}

const proxEvents = async() => {
    const response = await fetch(urlEvent)

    const events = await response.json()    

    let proxEvents = document.querySelector("#proxEventos")
    let div = document.createElement("div")
    div.classList.add("container", "d-flex", "justify-content-center", "align-items-center")
    proxEvents.appendChild(div)
    for (var i = 0 ; i<3; i++){
        let event = events[i]
        let article = document.createElement("article")
        let h2 = document.createElement("h2")
        let h4 = document.createElement("h4")
        let p = document.createElement("p")
        let link = document.createElement("button")

        let date = new Date(event.scheduled)
        console.log(date)
        

        h2.innerText=event.name +' - '+date.getDate() + '/'+ (date.getMonth()+1)+'/'+ date.getFullYear()
        event.attractions.map(atraction => h4.innerText += atraction + ' ')
        p.innerText=event.description
        link.setAttribute("id", `reserva-${event._id}`)
        link.setAttribute("data-toggle",`modal`)
        link.setAttribute(`data-target`, `#reservaModal`)
        link.setAttribute(`type`,`button`)
        link.innerText="reservar agora"
        link.setAttribute("herf", `#`)
        
        
        article.classList.add("evento", "card", "p-5", "m-3")
        link.classList.add("btn", "btn-primary","abrir")

        div.appendChild(article)
        article.appendChild(h2)
        article.appendChild(h4)
        article.appendChild(p)
        article.appendChild(link)

        let img = document.querySelector(`#car-img-${i}`)
        if(event.poster.includes(`http`)){
            img.setAttribute('src',event.poster)
        }
        let h5 =document.querySelector(`#car-h5-name-${i}`)
        h5.innerText=event.name
        let pCar = document.querySelector(`#car-p-desc-${i}`)
        pCar.innerText=event.description

    }
    let div2 = document.createElement("div")
    let link = document.createElement("a")
    div2.classList.add("container", "text-center")
    link.classList.add("btn", "btn-secondary")
    link.setAttribute("href", `eventos.html`)
    link.innerText="ver todos os eventos"

    proxEvents.appendChild(div2)
    div2.appendChild(link)

    
}

const postBooking = async(event) => {
    const response = await fetch(`${urlBooking}`,{
        method:"POST",
        body:event,
        headers:{
            "Content-type":"application/json"
        }
    })

    const data = await response.json() 
}


if(title==`Sound Garden`){
    const reservar = async()=>{
        await proxEvents()
        const modalRes=document.querySelector(`#reservaModal`)
        const form = document.querySelector(`#modalForm`)
        const dismissBtn=document.getElementsByClassName(`fechar`)
        const submitBtn=document.getElementsByClassName(`enviar`)
        const abrirBtn=document.getElementsByClassName(`abrir`)

        for(btn of dismissBtn){
            btn.addEventListener(`click`, (e)=>{
                modalRes.setAttribute(`style`,`display:none`)
        })}

        for(btn of submitBtn){
            btn.addEventListener(`click`, async(e)=>{
                e.preventDefault()
                                
                let nome = document.querySelector(`#reserva-name`)
                let email = document.querySelector(`#reserva-email`)
                let id=localStorage.getItem(`id`)

                let newReserva = {
                    owner_name:nome.value,
                    owner_email:email.value,
                    number_tickets:1,
                    event_id:id
                }
                newReserva=JSON.stringify(newReserva)
                await postBooking(newReserva)
                nome.value=''
                email.value=''
        })}

        for(btn of abrirBtn){
            btn.addEventListener(`click`, (e)=>{
                const id=e.target.id.slice(8)
                localStorage.setItem(`id`,id)
                modalRes.classList.add(`show`)
                modalRes.setAttribute(`style`,`display:block`)
        })}
    }
    reservar()
}else{
    const reservar = async()=>{
        await getEvents()
        const modalRes=document.querySelector(`#reservaModal`)
        const form = document.querySelector(`#modalForm`)
        const dismissBtn=document.getElementsByClassName(`fechar`)
        const submitBtn=document.getElementsByClassName(`enviar`)
        const abrirBtn=document.getElementsByClassName(`abrir`)

        for(btn of dismissBtn){
            btn.addEventListener(`click`, (e)=>{
                modalRes.setAttribute(`style`,`display:none`)
        })}

        for(btn of submitBtn){
            btn.addEventListener(`click`, async(e)=>{
                e.preventDefault()
                                
                let nome = document.querySelector(`#reserva-name`)
                let email = document.querySelector(`#reserva-email`)
                let id=localStorage.getItem(`id`)

                let newReserva = {
                    owner_name:nome.value,
                    owner_email:email.value,
                    number_tickets:1,
                    event_id:id
                }
                newReserva=JSON.stringify(newReserva)
                await postBooking(newReserva)
                nome.value=''
                email.value=''
        })}

        for(btn of abrirBtn){
            btn.addEventListener(`click`, (e)=>{
                const id=e.target.id.slice(8)
                localStorage.setItem(`id`,id)
                modalRes.classList.add(`show`)
                modalRes.setAttribute(`style`,`display:block`)
        })}
    }
    reservar()
}



