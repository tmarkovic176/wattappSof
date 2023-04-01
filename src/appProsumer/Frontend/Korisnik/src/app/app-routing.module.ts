import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { PocetnaComponent } from './components/Pocetna/Pocetna.component';
import { ResetPassword } from './models/reset-password';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    //canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'pocetna', component: PocetnaComponent },
  {path:'resetpassword' ,component:ResetpasswordComponent},
  {path: 'userInfo', component: UserInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
