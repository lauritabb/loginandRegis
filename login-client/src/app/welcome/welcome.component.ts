import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'; 


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  person = localStorage.getItem('user');
  namePerson = localStorage.getItem('name');
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    console.log(this.namePerson);
  }
  

}
