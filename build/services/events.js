"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
class EventService {
    constructor() {
        this.url = "http://localhost:3000/events";
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(this.url);
            return yield response.json();
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(`${this.url}/${id}`);
            return yield response.json();
        });
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            let event = {
                name: this.name,
                attractions: this.attractions,
                description: this.description,
                scheduled: this.scheduled,
                number_tickets: this.number_tickets,
                poster: this.poster
            };
            let response = yield fetch(`${this.url}`, {
                method: "POST",
                body: JSON.stringify(event),
                headers: {
                    "Content-type": "application/json"
                }
            });
            return yield response.json();
        });
    }
    exclude(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(`${this.url}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                }
            });
            return yield response.json();
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let event = {
                name: this.name,
                attractions: this.attractions,
                description: this.description,
                scheduled: this.scheduled,
                number_tickets: this.number_tickets,
                poster: this.poster
            };
            let response = yield fetch(`${this.url}/${id}`, {
                method: "PUT",
                body: JSON.stringify(event),
                headers: {
                    "Content-type": "application/json"
                }
            });
            return yield response.json();
        });
    }
    showNextEvents(events) {
        console.log('aqui');
        let proxEvents = document.querySelector("#proxEventos");
        let div = document.createElement("div");
        div.classList.add("container", "d-flex", "justify-content-center", "align-items-center");
        proxEvents.appendChild(div);
        for (var i = 0; i < 3; i++) {
            let event = events[i];
            let article = document.createElement("article");
            let h2 = document.createElement("h2");
            let h4 = document.createElement("h4");
            let p = document.createElement("p");
            let link = document.createElement("button");
            let date = new Date(event.scheduled);
            h2.innerText = event.name + ' - ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            event.attractions.map(atraction => h4.innerText += atraction + ' ');
            p.innerText = event.description;
            link.setAttribute("id", `reserva-${event._id}`);
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
}
exports.EventService = EventService;
module.exports = EventService;
