import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/services/auth.service";

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

  private dashbiardTitle: string = "title";

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  getTitle(): string{
    if (this.authService.isAuthorized()) {
      return this.authService.user.dashboards[0].name;
    }
  }

}
