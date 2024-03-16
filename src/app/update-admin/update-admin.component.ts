import { Component, EventEmitter } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Output } from '@angular/core';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {

  profilePicture:string="https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?rs=1&pid=ImgDetMain"
  adminStatus:boolean=false;
  adminData:any={}
  @Output() adminChangeEvent :any = new EventEmitter()


  constructor(private admin:AdminService, private toastr:ToastrService){}


  ngOnInit() {
    this.getAdminDetails()
    
  }

 
  
  
  updateAdmin(){
    this.adminStatus=true

  }
  getAdminDetails(){
    this.admin.getAdmin().subscribe((res:any)=>{
      this.adminData = res
      console.log(this.adminData,"admindetails")
      if(this.adminData.profileImage){
        this.profilePicture=this.adminData.profileImage
      }
    })
   
  }

  getFile(event:any){
    const file = event.target.files[0]
    console.log(file)
    let fr =new FileReader()
    fr.readAsDataURL(file)
    fr.onload=(event:any)=>{
      console.log(event)
      this.profilePicture=event.target.result
      this.adminData.profileImage=event.target.result
    }
  }

  handleUpdateAdmin(){
    this.admin.updateAdmin(this.adminData).subscribe((res)=>{
      this.toastr.success("Admin updated successfully")
      this.adminStatus=false
      sessionStorage.setItem("admindetails",JSON.stringify(this.adminData))
      this.adminChangeEvent.emit(this.adminData.username)
    },
    (err:any)=>{
      this.toastr.error("admin update failed")

    })

  }
  onCancel(){
    this.adminStatus=false
  }

}
