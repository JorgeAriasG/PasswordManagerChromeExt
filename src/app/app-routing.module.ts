import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PasswordListComponent } from './components/password-list/password-list.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CreatePasswordComponent } from './components/create-password/create-password.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'password-list', component: PasswordListComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'create-password', component: CreatePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withComponentInputBinding())
  ]
})
export class AppRoutingModule { }
