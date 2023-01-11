"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
class Booking {
    constructor(url, owner_name, owner_email, number_tickets, event_id) {
        this.url = "http://localhost:3000/bookings";
        this.owner_name = owner_name;
        this.owner_email = owner_email;
        this.number_tickets = number_tickets;
        this.event_id = event_id;
    }
}
exports.Booking = Booking;
