import { getAll } from "../methods/getAll"
import { getOne } from "../methods/getOne";
import { create } from "../methods/create";
import { exclude } from "../methods/exclude";
import { update } from "../methods/update";
import { Event } from "../class/Event";

export class EventService implements getAll, getOne, create, exclude, update{
    private url = "http://localhost:3000/events"

    async getAll(): Promise<Event[]> {
        let response = await fetch(this.url)
        return await response.json()
    }
    async getOne(id:string): Promise<void> {
        let response = await fetch(`${this.url}/${id}`);
        return await response.json();
    }
    async create(): Promise<void> {
        let event = {
            name :this.name,
            attractions:this.attractions,
            description:this.description,
            scheduled:this.scheduled,
            number_tickets:this.number_tickets,
            poster:this.poster
        }
        let response = await fetch(`${this.url}`,{
            method:"POST",
            body:JSON.stringify(event),
            headers:{
                "Content-type":"application/json"
            }
        })
    
        return await response.json() 
    }
    async exclude(id:string): Promise<void>{
        let response = await fetch(`${this.url}/${id}`,{
            method:"DELETE",
            headers:{
                "Content-type":"application/json"
            }
        })
        return await response.json()
    }
    async update(id: string): Promise<void> {
        let event = {
            name :this.name,
            attractions:this.attractions,
            description:this.description,
            scheduled:this.scheduled,
            number_tickets:this.number_tickets,
            poster:this.poster
        }
        let response = await fetch(`${this.url}/${id}`,{
            method:"PUT",
            body:JSON.stringify(event),
            headers:{
                "Content-type":"application/json"
            }
        })
    
        return await response.json()
    }

    showNextEvents(events: Promise<Event[]>): void{
        console.log('aqui')
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
}

module.exports = EventService