import {Component, Input, OnInit} from '@angular/core';
import {Forecast} from "../../../../commons/models/data/weatherData/forecast";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  @Input('forecast') forecast: Forecast;

  constructor() { }

  ngOnInit() {
  }

}
