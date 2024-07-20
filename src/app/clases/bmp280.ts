export class Bmp280 {
    constructor(_id= '', temperature= 0, pressure= 0, altitude= 0, timestamp= '') {
        this._id = _id;
        this.temperature = temperature;
        this.pressure = pressure;
        this.altitude = altitude;
        this.timestamp = timestamp;
    }
    _id: string;
    temperature: number;
    pressure: number;
    altitude: number;
    timestamp: string;
}
