import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  base_url = "https://project-server-c2jw.onrender.com"

  constructor(private http:HttpClient) { 

  }

  getAdminDetails(){
    
    return this.http.get(`${this.base_url}/employees/1`)

  }
  
  addEmployeeDetails(data:any){
    
    return this.http.post(`${this.base_url}/employees`,data)
  }

  updateEmployeeDetails(id:any,data:any){
    
    return this.http.put(`${this.base_url}/employees/${id}`,data)
  }

  getEmployeeDetails(){
    
    return this.http.get(`${this.base_url}/employees`)

  }

  getSpecificEmployeeDetails(id:any){
    
    return this.http.get(`${this.base_url}/employees/${id}`)

  }

  deleteSpecificEmployee(id:any){
    
    return this.http.delete(`${this.base_url}/employees/${id}`)

  }

  getAdmin(){
    
    return this.http.get(`${this.base_url}/employees/1`)

  }
  updateAdmin(data:any){
    return this.http.put(`${this.base_url}/employees/1`,data)
    

  }

  isLoggedIn(){
    return !!sessionStorage.getItem("admindetails")
    //to get boolean value we use !!
  }



}
