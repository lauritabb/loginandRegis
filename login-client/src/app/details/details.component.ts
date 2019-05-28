import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Users } from '../users';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  users : Users[];

  constructor(private httpService:HttpService) { }

  ngOnInit() {
    this.httpService.getUsers().subscribe(data=>{
      console.log("details components, getting all users", data)
      this.users=data;
    })
  }

}
