import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private toastr:ToastrService,
    private http:AdminService,
    private r:Router
    
    ) {

  }

  email:string = ""
  password:string = ""


  login(){
    if (this.email && this.password){
      this.http.getAdminDetails().subscribe((res:any)=>{
        if(res.email === this.email &&  res.password === this.password){

            this.toastr.success("login successful!!")
            const adminUser = JSON.stringify(res)
            sessionStorage.setItem("admindetails",adminUser)
            this.r.navigateByUrl('/home')

            
        }else{
          this.toastr.error("invalid email and password")
        }
        
      })
      
    }else{
      this.toastr.error("login failed!!..")
    }
  }

}
