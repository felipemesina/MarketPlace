import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserNewComponent } from './user/user-new/user-new.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserService } from './user/user.service';
import { ProductComponent } from './product/product.component';
import { ProductService } from './product/product.service';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthGuard } from './guards/authguard';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserNewComponent,
    UserLoginComponent,
    ProductComponent,
    ProductCreateComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule
  ],
  providers: [UserService, ProductService, FlashMessagesService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
