export class Bmp280 {
    _id: string;
    temperature: number;
    pressure: number;
    altitude: number;
    timestamp: string;
    constructor(_id:string, temperature: number, pressure: number, altitude: number, timestamp: string) {
        this._id = _id;
        this.temperature = temperature;
        this.pressure = pressure;
        this.altitude = altitude;
        this.timestamp = timestamp;
    }
}
