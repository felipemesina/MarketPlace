import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  user: any = {};
  isLoggedIn = false;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.logout()
  }

  login() {
    this.isLoggedIn = true;
    this._userService.login(this.user.username, this.user.password)
    .subscribe( data => {
      if(data.success) {
        this._router.navigate(['profile'])
      } else {
        this._flashMessage.show(data.msg)
        this._router.navigate(['login'])
      }
    }
  )
  }

  logout(){
    this.isLoggedIn = false;
    this._userService.logout();
  }

}
