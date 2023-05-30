import { PaginationResponse } from '../models/pagination-response';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Otherscategoric } from '../models/otherscategoric';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class OtherscategoricService extends HttpService {

  private instruments: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);

  constructor(protected http: HttpClient,
    private toastrService: ToastrService) {
    super(http);

  }


  /**
   * Check all Answers
   * @param filter 
   * @returns 
   */
  async getOthers(): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/staexped/categoriasotros/List'));
    const data = resp.data.map((item: any) => {
      const profession = Otherscategoric.mapFromObject(item);
      return profession;
    });
    return data;
  }
}