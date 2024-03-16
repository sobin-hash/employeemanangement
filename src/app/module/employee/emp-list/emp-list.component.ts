import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';



@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent  implements OnInit{


  constructor(private admin:AdminService,private toastr:ToastrService){

  }


  empList:any=[]
  d:any=new Date()
  searchKey:any=""

  ngOnInit(): void {

    this.getData()
    
  }
  getData(){
    this.admin.getEmployeeDetails().subscribe((res:any)=>{
      console.log(res)

      this.empList=res.filter((item:any)=>item.id!='1')
      console.log(this.empList)

    })
  }


  onDelete(id:any){
    this.admin.deleteSpecificEmployee(id).subscribe((res)=>{
      this.toastr.success("employee deleted successfully")
      this.getData()
    },
    (err:any)=>{
      this.toastr.error("error")

    })


  }
  exportToPdf(){
    let doc = new jsPDF()
    let head = [['empId','username','email','status']]
    let body  : any = []
    this.empList.forEach((item:any)=>{
      body.push([item.empId,item.username,item.email,item.status])

    })
    doc.setFontSize(16)
    doc.text("all employee list",10, 10)
    autoTable(doc,{
      head,body
    })
    doc.output('dataurlnewwindow')
    doc.save('allemployees.pdf')


  }

  sortByUsername(){
    this.empList.sort((user1:any,user2:any)=>user1.username.localeCompare(user2.username))
  }

  
  sortByUserId(){
    this.empList.sort((user1:any,user2:any)=>user1.empId-user2.empId)
  }



  

}
