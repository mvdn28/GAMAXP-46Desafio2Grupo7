"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("./services/events");
const eventService = new events_1.EventService();
const events = eventService.getAll();
eventService.showNextEvents(events);
//let urlSearchParams = new URLSearchParams(window.location.search)
//let postId = urlSearchParams.get(`id`)
