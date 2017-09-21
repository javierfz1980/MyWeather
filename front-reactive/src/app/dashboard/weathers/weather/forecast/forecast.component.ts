import {Component, Input, OnInit} from '@angular/core';
import {Forecast} from "../../../../commons/models/data/weatherData/forecast";
import {units} from '../../../../commons/pipes/temperature-converter.pipe';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  @Input('forecast')
  forecast: Forecast;

  private unitTo: string = units.celsius;

  constructor() { }

  ngOnInit() {
  }

}
