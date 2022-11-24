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

@Injectable({
  providedIn: 'root'
})
export class CommonsListCountriesResolver implements Resolve<any> {
  constructor(private commonsService: CommonsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.commonsService.getAllCountries();
  }
}


@Injectable({
  providedIn: 'root'
})
export class CommonsListStatusResolver implements Resolve<any> {
  constructor(private commonsService: CommonsService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.commonsService.getAllStatus();
  }
}


@Injectable({
  providedIn: 'root'
})
export class CommonsListSocialNetworkResolver implements Resolve<any> {
  constructor(private commonsService: CommonsService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.commonsService.getAllSocialNetwork();
  }
}

@Injectable({
  providedIn: 'root'
})
export class CommonsListInputTypeResolver implements Resolve<any> {
  constructor(private commonsService: CommonsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.commonsService.getAllInputsType();
  }
}


@Injectable({
  providedIn: 'root'
})
export class CommonsListCategoyTypeResolver implements Resolve<any> {
  constructor(private commonsService: CommonsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.commonsService.getAllCategories();
  }
}


@Injectable({
  providedIn: 'root'
})
export class CommonsListUnitsTypeResolver implements Resolve<any> {
  constructor(private commonsService: CommonsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.commonsService.getAllUnitsType();
  }
}


@Injectable({
  providedIn: 'root'
})
export class CommonsListColorsCalendarResolver implements Resolve<any> {
  constructor(private commonsService: CommonsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.commonsService.getAllColorSticker();
  }
}

@Injectable({
  providedIn: 'root'
})
export class CommonsListUsersEmailsResolver implements Resolve<any> {
  constructor(private commonsService: CommonsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.commonsService.getAllUsersEmails();
  }
}

@Injectable({
  providedIn: 'root'
})
export class CommonsListInstrumentsResolver implements Resolve<any> {
  constructor(private commonsService: CommonsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.commonsService.getAllInstruments();
  }
}







