import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../services/dashboard.service";
import {Weather} from "../../shared/models/data/weather";
import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'app-weathers',
  templateUrl: './weathers.component.html',
  styleUrls: ['./weathers.component.css']
})
export class LocationsComponent implements OnInit {

  constructor(private authService: AuthService, private dashboardService: DashboardService) { }

  ngOnInit() {
  }

  getWeathers(): Weather[]{
    if(this.authService.isAuthorized()) {
      return this.dashboardService.getWeathersFromCurrentDashboard();
    }
  }
}
