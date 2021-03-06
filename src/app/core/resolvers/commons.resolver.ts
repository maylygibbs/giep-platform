import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CommonsService } from '../services/commons.service';

@Injectable({
  providedIn: 'root'
})
export class CommonsListDependencesResolver implements Resolve<any> {
  constructor(private commonsService: CommonsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.commonsService.getAlldependences();
  }
}

@Injectable({
  providedIn: 'root'
})
export class CommonsListPositionsResolver implements Resolve<any> {
  constructor(private commonsService: CommonsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.commonsService.getAllPositions();
  }
}

@Injectable({
  providedIn: 'root'
})
export class CommonsListRolesResolver implements Resolve<any> {
  constructor(private commonsService: CommonsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.commonsService.getAllRoles();
  }
}
