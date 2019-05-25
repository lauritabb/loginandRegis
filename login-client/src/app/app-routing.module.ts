import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplatelogRegComponent } from './templatelog-reg/templatelog-reg.component';
import { WelcomeComponent } from '../app/welcome/welcome.component';
import { DetailsComponent } from '../app/details/details.component';
import { from } from 'rxjs';

const routes: Routes = [
  // routes to go
  {
    path:'',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path:'login', 
    children: [
      {
        path: '', //localhost:4200/login/
        component:TemplatelogRegComponent
      },
      {
        path:'welcome', //localhost:4200/login/welcome
        component:WelcomeComponent
      },
      {
        // one user id
        path: ':user_id', //localhost:4200/login/4
        component:DetailsComponent
        // resolve:{
        //   //get data before loading component
        // }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
