const urlEvent = "https://xp41-soundgarden-api.herokuapp.com/events"
const urlBooking= "https://xp41-soundgarden-api.herokuapp.com/bookings"


const urlSearchParams = new URLSearchParams(window.location.search)
const postId = urlSearchParams.get(`id`)
const funcId = urlSearchParams.get(`func`)
const path = window.location.pathname


//GET all elements
const getEvents = async() => {
    const response = await fetch(urlEvent)

    const events = await response.json()
    console.log(events)    

    let tabelaEvents = document.querySelector("#tabela-eventos")
    
    events.map((event,index)=> {

        let tr = document.createElement("tr")
        let th = document.createElement("th")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")
        let link1 = document.createElement("a")
        let link2 = document.createElement("a")
        let link3 = document.createElement("a")

        

        th.setAttribute("scope", `row`)
        th.innerText=index+1

        let date = new Date(event.scheduled)
        td1.innerText=date.getDate() + '/'+ (date.getMonth()+1)+'/'+ date.getFullYear()+' '+date.getHours()+`:`+date.getMinutes()
        td2.innerText=event.name
        event.attractions.map(atraction => td3.innerText += atraction + ' ')
        
        link1.classList.add("btn","btn-dark","abrir")
        link1.setAttribute("id", `reserva-${event._id}`)
        link1.setAttribute("data-toggle",`modal`)
        link1.setAttribute(`data-target`, `#reservaModal`)
        link1.setAttribute(`href`,`/reservas.html?id=${event._id}&func=res`)
        link1.setAttribute(`type`,`button`)
        link1.innerText="ver reservas"
        link2.classList.add("btn","btn-secondary")
        link2.setAttribute("href", `/editar-evento.html?id=${event._id}&func=edit`)
        link2.innerText="editar"
        link3.classList.add("btn","btn-danger")
        link3.setAttribute("id", `${event._id}`)
        link3.setAttribute("href", `/excluir-evento.html?id=${event._id}&func=delete`)
        link3.innerText="excluir"

        tr.appendChild(th)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
               
        td4.appendChild(link1)
        td4.appendChild(link2)
        td4.appendChild(link3)
        
        tr.appendChild(td4)

        tabelaEvents.appendChild(tr)

    })


}

const getBooking = async(eventId) => {
    const response = await fetch(`${urlBooking}/event/${eventId}`)

    const bookings = await response.json()

    let header = document.querySelector(`#reserva`)
    header.innerText=`Gerenciamento de reservas - ${bookings[0].event.name}`
    let tabelaEvents = document.querySelector("#tabela-reservas")
    
    bookings.map((book,index)=> {

        let tr = document.createElement("tr")
        let th = document.createElement("th")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")
        let link3 = document.createElement("a")

        

        th.setAttribute("scope", `row`)
        th.innerText=index+1

        td1.innerText=book.owner_name
        td2.innerText=book.owner_email
        td3.innerText=book.number_tickets
        
        link3.classList.add("btn","btn-danger")
        link3.setAttribute("id", `${book._id}`)
        link3.setAttribute("onclick", `deleteBooking(this.id)`)
        link3.innerText="excluir"

        tr.appendChild(th)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
               
        td4.appendChild(link3)
        
        tr.appendChild(td4)

        tabelaEvents.appendChild(tr)

    })


}

const getEvent = async(id) => {
    const response = await fetch(`${urlEvent}/${id}`);
    const event = await response.json();
    return await event
}

const editEvent = async(event,id) => {
    const response = await fetch(`${urlEvent}/${id}`,{
        method:"PUT",
        body:event,
        headers:{
            "Content-type":"application/json"
        }
    })

    const data = await response.json()
}

const deleteEvent = async(id) => {
    const response = await fetch(`${urlEvent}/${id}`,{
        method:"DELETE",
        headers:{
            "Content-type":"application/json"
        }
    })
}

const postEvent = async(event) => {
    const response = await fetch(`${urlEvent}`,{
        method:"POST",
        body:event,
        headers:{
            "Content-type":"application/json"
        }
    })

    const data = await response.json()  
}

const deleteBooking = async(id) => {
    const tr = document.getElementById(`${id}`).parentNode.parentNode
    tr.remove()
    const response = await fetch(`${urlBooking}/${id}`,{
        method:"DELETE",
        headers:{
            "Content-type":"application/json"
        }
    })
}




if(!postId && path.includes(`/admin.html`)){
    getEvents()
}else if(path.includes(`/cadastro-evento.html`)) {
    const cadastrar = async() => {
        const eventForm = document.querySelector(`#novo-evento-form`)
        const nome = document.querySelector(`#nome`)
        const atracoes = document.querySelector(`#atracoes`)
        const descricao = document.querySelector(`#descricao`)
        const data = document.querySelector(`#data`)
        const lotacao = document.querySelector(`#lotacao`)

        eventForm.addEventListener(`submit`,async(e)=>{
            e.preventDefault()
        
            let date = data.value
            const dateValues = date.length>10?
                date.split(' ')[0]:
                date
            const timeValues = date.length>10?
                date.split(' ')[1]:
                '22:00'
        
            const [month, day, year] = dateValues.split('/');
            const [hours, minutes] = timeValues.split(':');
            const dateScheduled = new Date(year, month - 1, day, hours, minutes);
            let newEvent = {
                name:nome.value,
                attractions:[atracoes.value],
                description:descricao.value,
                scheduled: dateScheduled,
                number_tickets:lotacao.value,
                poster:"link da imagem"
            }
        
            newEvent = JSON.stringify(newEvent)
        
            await postEvent(newEvent)
        
            const main = document.getElementsByTagName("main")[0]
            const div = main.getElementsByTagName("div")[1]
        
            const newDiv = document.createElement("div")
            newDiv.classList.add("alert", "alert-success")
            newDiv.setAttribute("role","alert")
            newDiv.innerText=`Sucesso ao criar evento`
        
            div.insertBefore(newDiv,div.firstChild)
            nome.value=''
            atracoes.value=''
            descricao.value=''
            data.value='00/00/00 00:00'
            lotacao.value=''
        
            setTimeout(() => {
                newDiv.remove()
                
            },5000)
            
        })
    }
    cadastrar()
}else if (postId && funcId===`res`){
    getBooking(postId)
}else if (postId && funcId===`edit`){
    const edit = async() => {
        const event = await getEvent(postId)


        const eventForm = document.querySelector("#edit-event")

        const nome = document.querySelector(`#nome`)
        const banner =document.querySelector(`#banner`)
        const atracoes = document.querySelector(`#atracoes`)
        const descricao = document.querySelector(`#descricao`)
        const data = document.querySelector(`#data`)
        const lotacao = document.querySelector(`#lotacao`)

        nome.value=event.name
        banner.value = event.poster
        event.attractions.map(atraction => atracoes.value += atraction + ', ')
        descricao.value=event.description
        let date = new Date(event.scheduled)
        data.value=date.getDate() + '/'+ (date.getMonth()+1)+'/'+ date.getFullYear()+' '+date.getHours()+`:`+date.getMinutes()
        lotacao.value=event.number_tickets

        eventForm.addEventListener(`submit`,async(e)=>{
            e.preventDefault()

            let date = data.value

            const dateValues = date.length>10?
                date.split(' ')[0]:
                date
            const timeValues = date.length>10?
                date.split(' ')[1]:
                '22:00'

            const [month, day, year] = dateValues.split('/');
            const [hours, minutes] = timeValues.split(':');
            const dateScheduled = new Date(year, month - 1, day, hours, minutes);

            let editedEvent = {
                name:nome.value,
                attractions:[atracoes.value],
                description:descricao.value,
                scheduled: dateScheduled,
                number_tickets:lotacao.value,
                poster:banner.value
            }
        
            editedEvent = JSON.stringify(editedEvent)
        
            await editEvent(editedEvent,postId)

            const main = document.getElementsByTagName("main")[0]
            const div = main.getElementsByTagName("div")[1]

            const newDiv = document.createElement("div")
            newDiv.classList.add("alert", "alert-success")
            newDiv.setAttribute("role","alert")
            newDiv.innerText=`Sucesso ao editar evento`

            div.insertBefore(newDiv,div.firstChild)
            nome.value=''
            atracoes.value=''
            descricao.value=''
            banner.value=''
            data.value='00/00/00 00:00'
            lotacao.value=''

            setTimeout(() => {
                newDiv.remove()
                
            },5000)
        })
    }
    edit()
}else if (postId && funcId===`delete`){
    const del = async() => {
        const event = await getEvent(postId)
    
        const eventForm = document.querySelector("#delete-event")
    
        const nome = document.querySelector(`#nome`)
        const banner =document.querySelector(`#banner`)
        const atracoes = document.querySelector(`#atracoes`)
        const descricao = document.querySelector(`#descricao`)
        const data = document.querySelector(`#data`)
        const lotacao = document.querySelector(`#lotacao`)
    
        nome.value=event.name
        banner.value = event.poster
        event.attractions.map(atraction => atracoes.value += atraction + ', ')
        descricao.value=event.description
        let date = new Date(event.scheduled)
        data.value=date.getDate() + '/'+ (date.getMonth()+1)+'/'+ date.getFullYear()+' '+date.getHours()+`:`+date.getMinutes()
        lotacao.value=event.number_tickets
    
        eventForm.addEventListener(`submit`,async(e)=>{
            e.preventDefault()
    
            let date = data.value
    
            const dateValues = date.length>10?
                date.split(' ')[0]:
                date
            const timeValues = date.length>10?
                date.split(' ')[1]:
                '22:00'
    
            const [month, day, year] = dateValues.split('/');
            const [hours, minutes] = timeValues.split(':');
            const dateScheduled = new Date(year, month - 1, day, hours, minutes);
    
            let editedEvent = {
                name:nome.value,
                attractions:[atracoes.value],
                description:descricao.value,
                scheduled: dateScheduled,
                number_tickets:lotacao.value,
                poster:banner.value
            }
        
            editedEvent = JSON.stringify(editedEvent)
        
            await deleteEvent(postId)
    
            const main = document.getElementsByTagName("main")[0]
            const div = main.getElementsByTagName("div")[1]
    
            const newDiv = document.createElement("div")
            newDiv.classList.add("alert", "alert-success")
            newDiv.setAttribute("role","alert")
            newDiv.innerText=`Sucesso ao deletar o evento`
    
            div.insertBefore(newDiv,div.firstChild)
            nome.value=''
            atracoes.value=''
            descricao.value=''
            banner.value=''
            data.value='00/00/00 00:00'
            lotacao.value=''
    
            setTimeout(() => {
                newDiv.remove()
                
            },5000)
        })
        }
        del()
}


