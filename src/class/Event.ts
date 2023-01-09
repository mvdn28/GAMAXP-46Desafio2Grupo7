export class Event{
    public url:string;
    public name:string;
    public attractions:Array<string>;
    public description:string;
    public scheduled:Date;
    public number_tickets:number;
    public poster:string;


    constructor(url:string, name:string, attractions:Array<string>, description:string, scheduled:Date, number_tickets:number,poster:string){
        this.url="https://xp41-soundgarden-api.herokuapp.com/events";
        this.name = name;
        this.attractions=attractions;
        this.description=description;
        this.scheduled=scheduled;
        this.number_tickets=number_tickets;
        this.poster = "link da imagem";
    }
}