import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GetInfoUserResolver implements Resolve<any> {
  constructor(private userService: UserService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.userService.getInfoUser();
  }
}
