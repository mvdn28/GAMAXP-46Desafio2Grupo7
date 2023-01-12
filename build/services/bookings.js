export class BookingService {
    constructor() {
        this.url = "http://localhost:3000/bookings";
    }
    async getAll() {
        let response = await fetch(this.url);
        return await response.json();
    }
    async getOne(id) {
        let response = await fetch(`${this.url}/${id}`);
        return await response.json();
    }
    async getOneById(id) {
        let response = await fetch(`${this.url}/event/${id}`);
        return await response.json();
    }
    async create(booking) {
        let response = await fetch(`${this.url}`, {
            method: "POST",
            body: JSON.stringify(booking),
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
    async update(id, booking) {
        let response = await fetch(`${this.url}/${id}`, {
            method: "PUT",
            body: JSON.stringify(booking),
            headers: {
                "Content-type": "application/json"
            }
        });
        return await response.json();
    }
}
