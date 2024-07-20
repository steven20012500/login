export class Dht22 {
    constructor(_id= '', temperature= 0, humidity= 0, timestamp= '') {
        this._id = _id;
        this.temperature = temperature;
        this.humidity = humidity;
        this.timestamp = timestamp;
    }
    _id: string;
    temperature: number;
    humidity: number;
    timestamp: string;
}
