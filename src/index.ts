import { EventService } from "./services/events.js"
import { BookingService } from "./services/bookings.js";

const eventService = new EventService();
const bookingService = new BookingService();
const events =await eventService.getAll();
eventService.showNextEvents(events)
eventService.todosOsEventos(events)

//let urlSearchParams = new URLSearchParams(window.location.search)
//let postId = urlSearchParams.get(`id`)