import { CanActivateFn } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = () => {
  const admin = inject(AdminService) // dependancy injection in function
  const toastr = inject(ToastrService)
  const router = inject(Router)
  if(admin.isLoggedIn()){
    return true
  }else{
    toastr.warning("access denied please login")
    router.navigateByUrl('/')
    return false

  }
};
