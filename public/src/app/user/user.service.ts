import { Injectable } from '@angular/core';
import{ Http, Response } from '@angular/http';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {

  constructor(private _http: Http, private _router: Router) { }

  getProfile(){
    return this._http.get("/profile")
    .map(res => res.json())
  }

  register(user: User){
     return this._http.post("/register", user)
     .map( res => res.json())

  }

  ifLoggedIn(){
    return this._http.get("/profile")
    .map(res => res.json())
  }

  login(username: string, password: string){
    return this._http.post("/login", { username: username, password: password })
    .map( res => res.json())
  }

  logout(){
    return this._http.get("/logout")
    .map( res => res.json())
  }

}
