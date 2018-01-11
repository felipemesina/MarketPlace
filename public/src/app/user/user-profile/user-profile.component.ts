import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user = {};
  currentUser: User;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _http: Http
  ){}

  ngOnInit() {
    this._userService.getProfile()
    .subscribe( profile => {
      this.user = profile.user
    },
    err => {
      console.log(err);
    })
  }


 logout(){
   this._userService.logout()
   .subscribe( data => {
     if (data.success) {
       this._router.navigate(['login'])
    }
})
}
}
