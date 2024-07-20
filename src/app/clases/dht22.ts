export class Dht22 {
    _id: string;
    temperature: number;
    humidity: number;
    timestamp: string;
    constructor(_id:string, temperature: number, humidity: number, timestamp: string) {
        this._id = _id;
        this.temperature = temperature;
        this.humidity = humidity;
        this.timestamp = timestamp;
    }
}
