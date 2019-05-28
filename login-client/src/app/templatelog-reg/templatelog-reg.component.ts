import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { NgForm } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { Users } from '../users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-templatelog-reg',
  templateUrl: './templatelog-reg.component.html',
  styleUrls: ['./templatelog-reg.component.css']
})
export class TemplatelogRegComponent implements OnInit {
  newUser : Users = new Users();
  //get from database
  thisUser: object =[];

  // registerForm: object ={
  //   first_name:'',
  //   last_name:'',
  //   email:'',
  //   password:'',
  // }

  loginData: object ={
    email:'',
    password:'',
  }

  constructor(private httpService:HttpService, private router:Router) { }

  ngOnInit() {
    // if (!localStorage.getItem('user')){return }
    this.httpService.getUsers().subscribe(data =>{
    this.thisUser= data;
    },
    error =>{
      console.log(error);
    })

  }
  onSubmit(event:Event, form: NgForm){
    event.preventDefault();
    console.log('form was submitted', form)
    console.log('new user: ', this.newUser)
    //set new task to become value
    this.httpService.createUser(this.newUser).subscribe(userCreated =>{
      console.log(userCreated) 
      localStorage.setItem('user', userCreated.id);
      localStorage.setItem('name', userCreated.first_name);
      this.router.navigateByUrl('/login/welcome')
    },
    error => {
      console.log(error);
    })
    this.newUser = new Users();
    form.reset();
  }

  onLogin(event:Event, form: NgForm){
    event.preventDefault();
    this.httpService.loginUser(this.loginData)
  }
  
}
