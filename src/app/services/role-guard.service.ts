import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService  implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router,
    private cookieService: CookieService
    ) { }
    
    user_role = decode(this.cookieService.get('token')).id.user_role
    canActivate(route: ActivatedRouteSnapshot): boolean {
      if ( this.user_role) {
        return true;
      } else {
    this.router.navigateByUrl('/login');
    return false;
  }
  

    // return route.data.allowedRoles.includes(decodeToken['role']);
  }
}
