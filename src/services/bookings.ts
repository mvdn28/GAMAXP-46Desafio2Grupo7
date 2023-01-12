import { getAll } from "../methods/getAll"
import { getOne } from "../methods/getOne";
import { create } from "../methods/create";
import { exclude } from "../methods/exclude";
import { update } from "../methods/update";
import { Booking } from "../class/Booking";

export class BookingService implements getAll, getOne, create, exclude, update{
    private url = "http://localhost:3000/bookings"

    async getAll(): Promise<void> {
        let response = await fetch(this.url)
        return await response.json()
    }
    async getOne(id:string): Promise<void> {
        let response = await fetch(`${this.url}/${id}`);
        return await response.json();
    }
    async getOneById(id:string): Promise<void> {
        let response = await fetch(`${this.url}/event/${id}`);
        return await response.json();
    }
    async create(booking:Booking): Promise<void> {
        let response = await fetch(`${this.url}`,{
            method:"POST",
            body:JSON.stringify(booking),
            headers:{
                "Content-type":"application/json"
            }
        })
    
        return await response.json() 
    }
    async exclude(id:string): Promise<void>{
        let response = await fetch(`${this.url}/${id}`,{
            method:"DELETE",
            headers:{
                "Content-type":"application/json"
            }
        })
        return await response.json()
    }
    async update(id: string, booking:Booking): Promise<void> {
        let response = await fetch(`${this.url}/${id}`,{
            method:"PUT",
            body:JSON.stringify(booking),
            headers:{
                "Content-type":"application/json"
            }
        })
    
        return await response.json()
    }
}