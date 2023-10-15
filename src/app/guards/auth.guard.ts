import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const token = await this.getToken();
    
    if (token) {
      console.log('token', token);
      // User is authenticated, allow access to the route.
      //this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
      return true;
      
    } else {
      // User is not authenticated, redirect to a login page or any other route.
      this.router.navigateByUrl('/auth/login', { replaceUrl: true });
      return false;
      
    }
  }

  async getToken(): Promise<string | null> {
    const token = await Preferences.get({ key: 'token' });
    return token.value;
  }
}
