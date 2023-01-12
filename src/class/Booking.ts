import { Event } from "./Event";
export class Booking{
    public owner_name:string;
    public owner_email:string;
    public number_tickets:number;
    public event_id:number;


    constructor(owner_name:string, owner_email:string,number_tickets:number,event_id:number){
        this.owner_name = owner_name;
        this.owner_email=owner_email;
        this.number_tickets=number_tickets;
        this.event_id = event_id;
    }
}