import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

  private dashbiardTitle: string = "title";

  constructor() { }

  ngOnInit() {
  }

}
