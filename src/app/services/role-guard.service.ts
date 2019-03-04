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

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let user = decode(this.cookieService.get('token'))
    console.log('*** kmg RoleGuardService not implemented yet - route.data.expectedRole ***');
    console.log(route.data.allowedRoles);
    return true;

    // return route.data.allowedRoles.includes(decodeToken['role']);
  }
}
