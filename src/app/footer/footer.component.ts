import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  name:String;
  message: String;
  dateYear: number;
  constructor() { }

  ngOnInit(): void {
    this.message = 'Iswar Saran PG College ||  Made By';
    this.name = 'Umang Budhwar';
    this.dateYear = new Date().getFullYear();
  }

}
