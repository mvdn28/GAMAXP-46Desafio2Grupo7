"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    constructor(url, name, attractions, description, scheduled, number_tickets, poster) {
        this.name = name;
        this.attractions = attractions;
        this.description = description;
        this.scheduled = scheduled;
        this.number_tickets = number_tickets;
        this.poster = "link da imagem";
    }
}
exports.Event = Event;
