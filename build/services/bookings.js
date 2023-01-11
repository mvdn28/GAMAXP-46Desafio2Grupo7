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
exports.BookingService = void 0;
const Booking_1 = require("../class/Booking");
class BookingService extends Booking_1.Booking {
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
    getOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(`${this.url}/event/${id}`);
            return yield response.json();
        });
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            let booking = {
                owner_name: this.owner_name,
                owner_email: this.owner_email,
                number_tickets: 1,
                event_id: localStorage.getItem(`id`)
            };
            let response = yield fetch(`${this.url}`, {
                method: "POST",
                body: JSON.stringify(booking),
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
            let booking = {
                owner_name: this.owner_name,
                owner_email: this.owner_email,
                number_tickets: 1,
                event_id: localStorage.getItem(`id`)
            };
            let response = yield fetch(`${this.url}/${id}`, {
                method: "PUT",
                body: JSON.stringify(booking),
                headers: {
                    "Content-type": "application/json"
                }
            });
            return yield response.json();
        });
    }
}
exports.BookingService = BookingService;
module.exports = BookingService;
