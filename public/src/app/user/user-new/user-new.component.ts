import { Component, OnInit } from '@angular/core';
import { User } from './../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {
  newUser = new User();


  constructor(
    private _userService: UserService,
    private _router: Router,
    private _flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  register = function (user: User){
    this._userService.register(user)
    .subscribe(data => {
      if (data.success) {
        this._router.navigate(['login'])
      } else {
        this._flashMessage.show("All fields required", {cssClass: 'alert=danger'})
        this._router.navigate(['register'])
      }
    })
}
}
