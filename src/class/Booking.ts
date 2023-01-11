import { Event } from "./Event";
export class Booking{
    public url:string;
    public owner_name:string;
    public owner_email:string;
    public number_tickets:number;
    public event_id:string;


    constructor(url:string, owner_name:string, owner_email:string,number_tickets:number,event_id:string){
        this.url="http://localhost:3000/bookings";
        this.owner_name = owner_name;
        this.owner_email=owner_email;
        this.number_tickets=number_tickets;
        this.event_id = event_id;
    }
}