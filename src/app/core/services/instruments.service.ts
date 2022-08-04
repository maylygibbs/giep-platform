import { UserService } from './user.service';
import { environment } from './../../../environments/environment';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Instrument } from '../models/instrument';
import { Question } from '../models/question';
import { SelectOption } from '../models/select-option';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class InstrumentsService extends HttpService{

  constructor(protected http: HttpClient,
    private toastrService: ToastrService,
    private userService: UserService) { 
    super(http);
  }

/**
 * get pending instruments to answer
 * @param id 
 * @returns 
 */
  async getInstrumentsById(id:number):Promise<any>{
    const resp = await firstValueFrom(this.get(environment.apiUrl,`/encuesta/instrumentocaptura/${id}`));
    const instrument = new Instrument();
    instrument.id = resp.data[0].id;
    instrument.name = resp.data[0].nombre;
    instrument.description = resp.data[0].description;
    instrument.questions = resp.data[0].pregunta.map((item:any)=>{
        const question = new Question();
        question.id = item.id;
        question.label = item.pregunta;
        question.nameImput = 'question-'+item.idInput.Descripcion+'-'+item.id;
        question.order = item.orden;
        question.inputType = new SelectOption(item.idInput.id, item.idInput.Descripcion);
        question.className = item.class;
        question.required = item.obligatorio == 1 ? true : false;
        question.score = item.puntos;
        question.options = item.opciones.map((itemOption:any)=>{
          const option = new SelectOption(itemOption.id, itemOption.Name);
          return option;
        });
        return question;
    });
    return instrument;
  }

  /**
   * stores user responses
   * @param data 
   */
  async storeInstrumetsResponse(data:any){    
    try {
      const resp = await firstValueFrom(this.post(environment.apiUrl,'/encuesta/respuesta',data));
      await this.userService.getInfoUser();
      this.toastrService.success('Sus respuestas se han registrado con exito.');
    } catch (error) {
      this.toastrService.error('','Ha ocurrido un error. Intente más tarde.');
    }
  }

  /**
   * 
   * @param id 
   */
  async getInstrumentResult(id:number){
    const resp = await firstValueFrom(this.get(environment.apiUrl,'/encuesta/respuesta'));
  }


}
