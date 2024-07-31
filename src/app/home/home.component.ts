import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  bmp280Flip = false;
  dht22Flip = false;
  esp32Flip = false;

  flipCard(sensor: string) {
    if (sensor === 'bmp280') {
      this.bmp280Flip = !this.bmp280Flip;
    } else if (sensor === 'dht22') {
      this.dht22Flip = !this.dht22Flip;
    } else if (sensor === 'esp32') {
      this.esp32Flip = !this.esp32Flip;
    }
  }
}
