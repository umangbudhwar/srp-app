import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loadingVisible:boolean = true;
  constructor() { }

  ngOnInit(): void {
    this.loadingVisible =false;
  }

}
