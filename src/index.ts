import { EventService } from "./services/events"

const eventService = new EventService();
const events = eventService.getAll();
eventService.showNextEvents(events)


//let urlSearchParams = new URLSearchParams(window.location.search)
//let postId = urlSearchParams.get(`id`)