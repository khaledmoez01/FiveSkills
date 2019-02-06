import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate():  boolean {
    console.log('*** kmg AuthGuardService not implemented yet ***');
    return true;
  }
}
