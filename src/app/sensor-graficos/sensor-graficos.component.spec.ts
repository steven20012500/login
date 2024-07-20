import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorGraficosComponent } from './sensor-graficos.component';

describe('SensorGraficosComponent', () => {
  let component: SensorGraficosComponent;
  let fixture: ComponentFixture<SensorGraficosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorGraficosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorGraficosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
