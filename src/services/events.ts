import { getAll } from "../methods/getAll"
import { getOne } from "../methods/getOne";
import { create } from "../methods/create";
import { exclude } from "../methods/exclude";
import { update } from "../methods/update";
import { Event } from "../class/Event";

export class EventService extends Event implements getAll, getOne, create, exclude, update{

    async getAll(): Promise<void> {
        let response = await fetch(this.url)
        return await response.json()
    }
    async getOne(id:string): Promise<void> {
        let response = await fetch(`${this.url}/${id}`);
        return await response.json();
    }
    async create(): Promise<void> {
        let event = {
            name :this.name,
            attractions:this.attractions,
            description:this.description,
            scheduled:this.scheduled,
            number_tickets:this.number_tickets,
            poster:this.poster
        }
        let response = await fetch(`${this.url}`,{
            method:"POST",
            body:JSON.stringify(event),
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
    async update(id: string): Promise<void> {
        let event = {
            name :this.name,
            attractions:this.attractions,
            description:this.description,
            scheduled:this.scheduled,
            number_tickets:this.number_tickets,
            poster:this.poster
        }
        let response = await fetch(`${this.url}/${id}`,{
            method:"PUT",
            body:JSON.stringify(event),
            headers:{
                "Content-type":"application/json"
            }
        })
    
        return await response.json()
    }
}