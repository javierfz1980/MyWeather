import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/services/auth.service";
import {DashboardService} from "./services/dashboard.service";

@Component({
  selector: 'app-boards',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dashbiardTitle: string = "title";

  constructor(private authService: AuthService, private dashboardService: DashboardService) { }

  ngOnInit() {
  }

  getTitle(): string{
    if (this.authService.isAuthorized()) {
      return this.authService.user.dashboards[0].name;
    }
  }

}
