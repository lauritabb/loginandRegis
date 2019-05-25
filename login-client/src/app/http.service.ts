import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
// import { ConsoleReporter } from 'jasmine';
import { Users } from './users'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // baseURL = 'https://localhost:8000/api/login-client/';
  baseURL = 'http://localhost:8000'

  constructor(private _http: HttpClient) { 
    // this.getUsers();
  }

  // this one => get all users
  getUsers(): Observable<Users[]>{
    return this._http.get<Users[]>(this.baseURL);
    // tempObs.subscribe(data => console.log("got it", data));
  }
  
  //get one user, specific user id, capture from url
  getOneUser(user_id): Observable<Users>{
    return this._http.get<Users>(this.baseURL + '/'+user_id);
    // it can also be done like this:
    // return this._http.get<Users>(`${this.baseURL}/${user_id}`)
  }


  createUser(userData:object){
   return this._http.post(this.baseURL+'/'+'create/',userData);
  }

  loginUser(loginData:object): void{
    let obs = this._http.post<UserData>(`${this.baseURL}/login/`, loginData);
    obs.subscribe(
      (data) => {
        console.log('data:', data)
        localStorage.setItem('user', data.id);
      },
      (errors) => {
        console.log(errors);
      }
    )
  }

  logoutUser(): void {
    localStorage.clear();
  }

}
interface UserData {
  name: string;
  id: string;
}