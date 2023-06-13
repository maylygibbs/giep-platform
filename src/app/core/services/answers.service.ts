import { PaginationResponse } from '../models/pagination-response';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Answers } from '../models/answers';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AnswersService extends HttpService {

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
  async getAnswers(): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/staexped/tiposrespuestas/List'));
    const data = resp.data.map((item: any) => {
      const answers = Answers.mapFromObject(item);
      return answers;
    });
    return data;
  }
}


