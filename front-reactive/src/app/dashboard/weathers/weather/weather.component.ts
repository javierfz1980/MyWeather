import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Weather} from "../../../commons/models/data/weather";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {units} from '../../../commons/pipes/temperature-converter.pipe';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  animations: [
    trigger('weatherContainer', [
      state('mouseOver', style({
        transform: 'scale(1.02,1.02)'
      })),
      state('mouseOut', style({
        transform: 'scale(1,1)'
      })),
      transition('mouseOver => mouseOut', animate('100ms ease-out')),
      transition('mouseOut => mouseOver', animate('100ms ease-in'))/*,
      transition('* => void', [
        animate(1000, style({
          opacity: 0
        }))
      ])*/
    ])
  ]
})
export class WeatherComponent implements OnInit {

  @Input()
  weather: Weather;

  @Input()
  id: number;

  @Output()
  removeWeatherEvent: EventEmitter<string> = new EventEmitter<string>();

  private unitTo: string = units.celsius;
  private stateOver: string = 'mouseOut';

  constructor() { }

  removeWeather(): void{
    //this.dashboardService.removeWeather(this.weather);
    this.removeWeatherEvent.emit(this.weather.id);
  }

  ngOnInit() {
  }

  onMouseOver() {
    this.stateOver = 'mouseOver';
  }

  onMouseOut() {
    this.stateOver = 'mouseOut';
  }

}
