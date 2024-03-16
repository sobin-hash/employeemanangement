import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { OnInit } from '@angular/core';
import { userSchema } from '../model/userSchema';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-editemp',
  templateUrl: './editemp.component.html',
  styleUrls: ['./editemp.component.css']
})
export class EditempComponent implements OnInit {
  id:string=""
  user:userSchema={}

  constructor(private aroute:ActivatedRoute,private admin:AdminService,private router:Router,private toastr:ToastrService){
    this.aroute.params.subscribe((res:any)=>{
      console.log(res)
      this.id=res.id
      console.log(this.id)
    })

  }

  ngOnInit() {
    this.admin.getSpecificEmployeeDetails(this.id).subscribe((res:any)=>{
      console.log(res,"object")
      this.user.empId=res.empId
      this.user.username=res.username
      this.user.email=res.email
      this.user.status=res.status
      console.log(this.user)

    })
    
  }

  onUpdateEmployee(){
    const {empId,username,email,status}=this.user
    if(empId && username && email&& status){
      this.admin.updateEmployeeDetails(this.id,this.user).subscribe((res:any)=>{
        console.log(res,"editresponse")
        this.toastr.success("update success")
        this.router.navigateByUrl("/emloyee")
      },
      (err:any)=>{
        this.toastr.info("updation failed")
      }
      )
    }else{
      this.toastr.info("enter valid values")
    }
    }

  

}
