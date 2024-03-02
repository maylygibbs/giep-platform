import { PaginationResponse } from './../models/pagination-response';
import { AuthService } from './auth.service';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Company } from '../models/company';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class CompanyService extends HttpService {

  private instruments: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);

  constructor(protected http: HttpClient,
    private toastrService: ToastrService) {
    super(http);
  }


  /**
   * Check all companys
   * @param filter 
   * @returns 
   */
  async getCompanies(): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/empresa/List'));
    const data = resp.data.map((item: any) => {
      const company = Company.mapFromObject(item);
      return company;
    });
    return data;
  }

}


