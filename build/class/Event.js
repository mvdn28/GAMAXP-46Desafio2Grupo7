export class Event {
    constructor(url, id, name, attractions, description, scheduled, number_tickets, poster) {
        this.id = id;
        this.name = name;
        this.attractions = attractions;
        this.description = description;
        this.scheduled = scheduled;
        this.number_tickets = number_tickets;
        this.poster = "link da imagem";
    }
}
