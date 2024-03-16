import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'employee', loadChildren: () => import('./module/employee/employee.module').then(m => m.EmployeeModule),canActivate:[authGuard]},

  
  {path:'',component:LoginComponent},

  {path:'home',component:HomeComponent ,canActivate:[authGuard]},


  {path:'**',redirectTo:''}

];



@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }