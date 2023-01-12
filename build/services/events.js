import { BookingService } from "./bookings.js";
export class EventService {
    constructor() {
        this.url = "http://localhost:3000/events";
    }
    async getAll() {
        let response = await fetch(this.url);
        return await response.json();
    }
    async getOne(id) {
        let response = await fetch(`${this.url}/${id}`);
        return await response.json();
    }
    async create(event) {
        let response = await fetch(`${this.url}`, {
            method: "POST",
            body: JSON.stringify(event),
            headers: {
                "Content-type": "application/json"
            }
        });
        return await response.json();
    }
    async exclude(id) {
        let response = await fetch(`${this.url}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        });
        return await response.json();
    }
    async update(id, event) {
        let response = await fetch(`${this.url}/${id}`, {
            method: "PUT",
            body: JSON.stringify(event),
            headers: {
                "Content-type": "application/json"
            }
        });
        return await response.json();
    }
    showModalBooking(index) {
        console.log(index);
        const modalRes = document.querySelector(`#reservaModal`);
        const dismissBtn = document.getElementsByClassName(`fechar`)[index];
        console.log(dismissBtn);
        const submitBtn = document.getElementsByClassName(`enviar`)[index];
        const abrirBtn = document.getElementsByClassName(`abrir`)[index];
        dismissBtn.addEventListener(`click`, (e) => {
            modalRes.setAttribute(`style`, `display:none`);
        });
        submitBtn.addEventListener(`click`, async (e) => {
            console.log('oi');
            e.preventDefault();
            let nome = document.querySelector(`#reserva-name`);
            let email = document.querySelector(`#reserva-email`);
            let id = parseFloat(localStorage.getItem(`id`));
            let newReserva = {
                owner_name: nome.value,
                owner_email: email.value,
                number_tickets: 1,
                event_id: id
            };
            let serviceBooking = new BookingService;
            serviceBooking.create(newReserva);
            const formDiv = document.getElementById("modal-corpo");
            const form = formDiv.getElementsByTagName("form")[0];
            const newDiv = document.createElement("div");
            newDiv.classList.add("alert", "alert-success");
            newDiv.setAttribute("role", "alert");
            newDiv.innerText = `Sucesso ao criar reserva`;
            form.insertBefore(newDiv, form.firstChild);
            nome.value = '';
            email.value = '';
            setTimeout(() => {
                newDiv.remove();
            }, 5000);
        });
        abrirBtn.addEventListener(`click`, (e) => {
            const id = abrirBtn.id.slice(8);
            localStorage.setItem(`id`, id);
            modalRes.classList.add(`show`);
            modalRes.setAttribute(`style`, `display:block`);
        });
    }
    async showNextEvents(events) {
        let proxEvents = document.querySelector("#proxEventos");
        let div = document.createElement("div");
        div.classList.add("container", "d-flex", "justify-content-center", "align-items-center");
        proxEvents.appendChild(div);
        for (var i = 0; i < 3 || i < events.length; i++) {
            console.log(i);
            let event = events[i];
            let article = document.createElement("article");
            let h2 = document.createElement("h2");
            let h4 = document.createElement("h4");
            let p = document.createElement("p");
            let link = document.createElement("button");
            let date = new Date(event.scheduled);
            h2.innerText = event.name + ' - ' + (date.getDate() + 1) + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            event.attractions.map(atraction => h4.innerText += atraction + ' ');
            p.innerText = event.description;
            link.setAttribute("id", `reserva-${event.id}`);
            link.setAttribute("data-toggle", `modal`);
            link.setAttribute(`data-target`, `#reservaModal`);
            link.setAttribute(`type`, `button`);
            link.innerText = "reservar agora";
            link.setAttribute("herf", `#`);
            article.classList.add("evento", "card", "p-5", "m-3");
            link.classList.add("btn", "btn-primary", "abrir");
            div.appendChild(article);
            article.appendChild(h2);
            article.appendChild(h4);
            article.appendChild(p);
            article.appendChild(link);
            let img = document.querySelector(`#car-img-${i}`);
            if (event.poster.includes(`http`)) {
                img.setAttribute('src', event.poster);
            }
            let h5 = document.querySelector(`#car-h5-name-${i}`);
            h5.innerText = event.name;
            let pCar = document.querySelector(`#car-p-desc-${i}`);
            pCar.innerText = event.description;
            this.showModalBooking(i);
        }
        let div2 = document.createElement("div");
        let link = document.createElement("a");
        div2.classList.add("container", "text-center");
        link.classList.add("btn", "btn-secondary");
        link.setAttribute("href", `eventos.html`);
        link.innerText = "ver todos os eventos";
        proxEvents.appendChild(div2);
        div2.appendChild(link);
    }
    async todosOsEventos(events) {
        let todosEvents = document.querySelector("#todosEventos");
        events.map((event, index) => {
            console.log(index);
            let article = document.createElement("article");
            let h2 = document.createElement("h2");
            let h4 = document.createElement("h4");
            let p = document.createElement("p");
            let link = document.createElement("button");
            let date = new Date(event.scheduled);
            h2.innerText = event.name + ' - ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            event.attractions.map(atraction => h4.innerText += atraction + ' ');
            p.innerText = event.description;
            link.setAttribute("id", `reserva-${event.id}`);
            link.setAttribute("data-toggle", `modal`);
            link.setAttribute(`data-target`, `#reservaModal`);
            link.setAttribute(`type`, `button`);
            link.innerText = "reservar agora";
            article.classList.add("evento", "card", "p-5", "m-3");
            link.classList.add("btn", "btn-primary", "abrir");
            todosEvents.appendChild(article);
            article.appendChild(h2);
            article.appendChild(h4);
            article.appendChild(p);
            article.appendChild(link);
            this.showModalBooking(index);
        });
    }
}
