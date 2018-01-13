import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserNewComponent } from './user/user-new/user-new.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component'

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'register', component: UserNewComponent },
  { path: 'login', component:  UserLoginComponent},
  { path: 'create_post', component:  ProductCreateComponent},
  { path: 'products',  component: ProductComponent },
  { path: 'profile', component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
