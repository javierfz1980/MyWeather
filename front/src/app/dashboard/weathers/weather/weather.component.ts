import {Component, Input, OnInit} from '@angular/core';
import {Weather} from "../../../shared/models/data/weather";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {DashboardService} from "../../services/dashboard.service";

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

  @Input() weather: Weather;
  @Input() id: number;
  private stateOver: string = 'mouseOut';

  constructor(private dashboardService: DashboardService) { }

  removeWeather(): void{
    this.dashboardService.removeWeather(this.weather);
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
