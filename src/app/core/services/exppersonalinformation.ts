import { PaginationResponse } from '../models/pagination-response';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ExpPersonalInformation } from '../models/exp-personal-information';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as saveAs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExppersonalinformationService extends HttpService {

  
  constructor(protected http: HttpClient,
    private toastrService: ToastrService) {
    super(http);
  }

  /**
   * Check all Answers
   * @param filter 
   * @returns 
   */
  async getUserLoad(): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/tokenpdf/usuarioscargasexpedientes/List'));
    const data = resp.data.map((item: any) => {
      const profession = ExpPersonalInformation.mapFromObjectUserLoad(item);
      return profession;
    });
    return data;
  }


  /**
   * Query project by id
   * @param ci 
   * @returns 
   */
  //async getStaffById(ci:number):Promise<ExpPersonalInformation>{
async getStaffById(data:any){
  let events: Array<any> = new Array<any>();
    const ci = data;
    //let ci1 = 0;
    const resp = await firstValueFrom(this.get(environment.apiUrl,`/staexped/personal/${ci}`));
    const arrayVacio = (resp) => !Array.isArray(resp) || resp.length === 0;
    /* if (arrayVacio.length === 0){
      ci1 = 0;
    }else{
      ci1 = 1;
    } */

    if (resp){
        events = resp.data.map((item: any) => {
          return ExpPersonalInformation.mapFromObject(item);
        })
    return events;
    }
  }


  /**
   * Persists staff data
   * @param data 
   */
  async storeStaff(data:any){
    try {
      if(data.id){
        const id = data.id;
        delete data.id;
        await firstValueFrom(this.put(environment.apiUrl,`/staexped/personal/actualizar/${id}`, data));
        this.toastrService.success('Datos Personales actualizado con exito.');
        
      }else{
        const resp = await firstValueFrom(this.post(environment.apiUrl,'/staexped/personal', data));
        //Object.assign(data, { idproyectoasig: resp.id});
        const jsonData = JSON.stringify(resp.id)
        // localStorage.setItem('idusersproyecadd', jsonData)
        this.toastrService.success('Datos Personales registrado con exito.');
      }
    } catch (error:any) {
      debugger
      console.log(error);
      if (error.status == 409) {
        this.toastrService.error('',error.msg);
      }
      if (error.status != 500) {
        this.toastrService.error('','Ha ocurrido un error. Intente más tarde.');
      }
      
    }
    
  }


   /**
   * Upload document
   * @param formData 
   */
   async reports(id: number): Promise<any> {
    let response: any = null;
    try {
      const resp = await firstValueFrom(this.get(environment.apiUrl, `/tokenpdf/reportes/${id}`));
      console.log(resp);
      this.toastrService.success('Reporte Generado con éxito.');
      response = resp;
    } catch (error: any) {
      console.log(error)
      if (error.status) {
        this.toastrService.error(error.error.error);
      } else {
        this.toastrService.error('Ha ocurrido un error descargando el archivo.');
      }
    } finally {
      return response;
    }
  }

  
  /**
   * Upload user load
   * @param formData 
   */
  async reportsUserLoad(user: string,date_From: string,date_Until: string): Promise<any> {
    let response: any = null;
    try {
      const resp = await firstValueFrom(this.get(environment.apiUrl, `/tokenpdf/reportescargausuario/${user}/${date_From}/${date_Until}`));
      console.log(resp);
      this.toastrService.success('Reporte Generado con éxito.');
      response = resp;
    } catch (error: any) {
      console.log(error)
      if (error.status) {
        this.toastrService.error(error.error.error);
      } else {
        this.toastrService.error('Ha ocurrido un error descargando el archivo.');
      }
    } finally {
      return response;
    }
  }



/**
   * Persists reportsStaff data
   * @param data 
   */
async reportsStaff(data:any): Promise<any> {
  let response: any = null;
  try {
      const resp = await firstValueFrom(this.post(environment.apiUrl,'/tokenpdf/reportesstaff/', data));
      this.toastrService.success('Reporte Generado con éxito.');
      response = resp;
    } catch (error: any) {
      console.log(error)
      if (error.status) {
        this.toastrService.error(error.error.error);
      } else {
        this.toastrService.error('Ha ocurrido un error descargando el archivo.');
      }
    } finally {
      return response;
    }
}


/**
   * Upload document
   * @param formData 
   */
async reportsExcel(reports: string): Promise<any> {
  let response: any = null;
  try {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/tokenpdf/reportesdetallesexcel/${reports}`));
    console.log(resp);
    this.toastrService.success('Reporte Generado con éxito.');
    response = resp;
  } catch (error: any) {
    console.log(error)
    if (error.status) {
      this.toastrService.error(error.error.error);
    } else {
      this.toastrService.error('Ha ocurrido un error descargando el archivo.');
    }
  } finally {
    return response;
  }
}


 /** 
   * Mass Personal informationr upload from an excel file
   * 
  */
 async reportsExcelPersonalinformation(formData: FormData) {
  try {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/upload/datospersonales', formData));
    if (resp && resp.UsuariosNoProcesados && resp.UsuariosNoProcesados.length == 0) {
      this.toastrService.success('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos personales con éxito.`)
    } else {
      this.toastrService.warning('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos personales con éxito. datos personales sin procesar ${resp.UsuariosNoProcesados.length}`);
      const blobTxt = new Blob([this.buildContentTxt(resp)], { type: 'text/plain' });
      saveAs(blobTxt, 'usuarios_no_procesados.txt');
    }
  } catch (error: any) {
    if (error.status == 409)
      this.toastrService.error('', error.error.error);
  }

}

/** 
   * Mass Academic studies upload from an excel file
   * 
  */
async reportsExcelAcademicstudies(formData: FormData) {
  try {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/upload/estudiosacademicos', formData));
    if (resp && resp.UsuariosNoProcesados && resp.UsuariosNoProcesados.length == 0) {
      this.toastrService.success('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos estudios academicos con éxito.`)
    } else {
      this.toastrService.warning('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos estudios academicos con éxito. datos estudios academicos sin procesar ${resp.UsuariosNoProcesados.length}`);
      const blobTxt = new Blob([this.buildContentTxt(resp)], { type: 'text/plain' });
      saveAs(blobTxt, 'usuarios_no_procesados.txt');
    }
  } catch (error: any) {
    if (error.status == 409)
      this.toastrService.error('', error.error.error);
  }

}

/** 
   * Mass Specialties in Areas upload from an excel file
   * 
  */
async reportsExcelSpecialtiesinAreas(formData: FormData) {
  try {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/upload/especialidadesareas', formData));
    if (resp && resp.UsuariosNoProcesados && resp.UsuariosNoProcesados.length == 0) {
      this.toastrService.success('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos especialidades áreas con éxito.`)
    } else {
      this.toastrService.warning('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos especialidades áreas con éxito. datos especialidades áreas sin procesar ${resp.UsuariosNoProcesados.length}`);
      const blobTxt = new Blob([this.buildContentTxt(resp)], { type: 'text/plain' });
      saveAs(blobTxt, 'usuarios_no_procesados.txt');
    }
  } catch (error: any) {
    if (error.status == 409)
      this.toastrService.error('', error.error.error);
  }

}


/** 
   * Mass Income Documents upload from an excel file
   * 
  */
async reportsExcelincomeDocuments(formData: FormData) {
  try {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/upload/documentosingresos', formData));
    if (resp && resp.UsuariosNoProcesados && resp.UsuariosNoProcesados.length == 0) {
      this.toastrService.success('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos documentos ingresos con éxito.`)
    } else {
      this.toastrService.warning('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos documentos ingresos con éxito. datos documentos ingresos sin procesar ${resp.UsuariosNoProcesados.length}`);
      const blobTxt = new Blob([this.buildContentTxt(resp)], { type: 'text/plain' });
      saveAs(blobTxt, 'usuarios_no_procesados.txt');
    }
  } catch (error: any) {
    if (error.status == 409)
      this.toastrService.error('', error.error.error);
  }

}

/** 
   * Mass various controls upload from an excel file
   * 
  */
async reportsExcelVariousControls(formData: FormData) {
  try {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/upload/controlesvarios', formData));
    if (resp && resp.UsuariosNoProcesados && resp.UsuariosNoProcesados.length == 0) {
      this.toastrService.success('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos controles varios con éxito.`)
    } else {
      this.toastrService.warning('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos controles varios con éxito. datos controles varios sin procesar ${resp.UsuariosNoProcesados.length}`);
      const blobTxt = new Blob([this.buildContentTxt(resp)], { type: 'text/plain' });
      saveAs(blobTxt, 'usuarios_no_procesados.txt');
    }
  } catch (error: any) {
    if (error.status == 409)
      this.toastrService.error('', error.error.error);
  }

}

/** 
   * Mass Transfer Movements upload from an excel file
   * 
  */
async reportsExcelTransferMovements(formData: FormData) {
  try {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/upload/historicosmovimientostransferencias', formData));
    if (resp && resp.UsuariosNoProcesados && resp.UsuariosNoProcesados.length == 0) {
      this.toastrService.success('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos movimientos transferencias con éxito.`)
    } else {
      this.toastrService.warning('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos movimientos transferencias con éxito. datos movimientos transferencias sin procesar ${resp.UsuariosNoProcesados.length}`);
      const blobTxt = new Blob([this.buildContentTxt(resp)], { type: 'text/plain' });
      saveAs(blobTxt, 'usuarios_no_procesados.txt');
    }
  } catch (error: any) {
    if (error.status == 409)
      this.toastrService.error('', error.error.error);
  }

}

/** 
   * Mass Movements Promotion upload from an excel file
   * 
  */
async reportsExcelMovementsPromotion(formData: FormData) {
  try {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/upload/histmovpromocion', formData));
    if (resp && resp.UsuariosNoProcesados && resp.UsuariosNoProcesados.length == 0) {
      this.toastrService.success('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos movimientos promoción con éxito.`)
    } else {
      this.toastrService.warning('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos movimientos promoción con éxito. datos movimientos promoción sin procesar ${resp.UsuariosNoProcesados.length}`);
      const blobTxt = new Blob([this.buildContentTxt(resp)], { type: 'text/plain' });
      saveAs(blobTxt, 'usuarios_no_procesados.txt');
    }
  } catch (error: any) {
    if (error.status == 409)
      this.toastrService.error('', error.error.error);
  }

}


/** 
   * Mass Movements Holidays upload from an excel file
   * 
  */
async reportsExcelMovementsHolidays(formData: FormData) {
  try {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/upload/vacaciones', formData));
    if (resp && resp.UsuariosNoProcesados && resp.UsuariosNoProcesados.length == 0) {
      this.toastrService.success('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos vacaciones con éxito.`)
    } else {
      this.toastrService.warning('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos vacaciones con éxito. datos vacaciones sin procesar ${resp.UsuariosNoProcesados.length}`);
      const blobTxt = new Blob([this.buildContentTxt(resp)], { type: 'text/plain' });
      saveAs(blobTxt, 'usuarios_no_procesados.txt');
    }
  } catch (error: any) {
    if (error.status == 409)
      this.toastrService.error('', error.error.error);
  }

}


/** 
   * Mass Movements Permits upload from an excel file
   * 
  */
async reportsExcelMovementsPermits(formData: FormData) {
  try {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/upload/permisos', formData));
    if (resp && resp.UsuariosNoProcesados && resp.UsuariosNoProcesados.length == 0) {
      this.toastrService.success('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos permisos con éxito.`)
    } else {
      this.toastrService.warning('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos permisos con éxito. datos permisos sin procesar ${resp.UsuariosNoProcesados.length}`);
      const blobTxt = new Blob([this.buildContentTxt(resp)], { type: 'text/plain' });
      saveAs(blobTxt, 'usuarios_no_procesados.txt');
    }
  } catch (error: any) {
    if (error.status == 409)
      this.toastrService.error('', error.error.error);
  }

}

/** 
   * Mass Movements Rests upload from an excel file
   * 
  */
async reportsExcelMovementsRests(formData: FormData) {
  try {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/upload/reposo', formData));
    if (resp && resp.UsuariosNoProcesados && resp.UsuariosNoProcesados.length == 0) {
      this.toastrService.success('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos reposo con éxito.`)
    } else {
      this.toastrService.warning('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos reposo con éxito. datos reposo sin procesar ${resp.UsuariosNoProcesados.length}`);
      const blobTxt = new Blob([this.buildContentTxt(resp)], { type: 'text/plain' });
      saveAs(blobTxt, 'usuarios_no_procesados.txt');
    }
  } catch (error: any) {
    if (error.status == 409)
      this.toastrService.error('', error.error.error);
  }

}


/** 
   * Mass Escrow upload from an excel file
   * 
  */
async reportsExcelEscrow(formData: FormData) {
  try {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/upload/fideicomisos', formData));
    if (resp && resp.UsuariosNoProcesados && resp.UsuariosNoProcesados.length == 0) {
      this.toastrService.success('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos fideicomisos con éxito.`)
    } else {
      this.toastrService.warning('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos fideicomisos con éxito. datos fideicomisos sin procesar ${resp.UsuariosNoProcesados.length}`);
      const blobTxt = new Blob([this.buildContentTxt(resp)], { type: 'text/plain' });
      saveAs(blobTxt, 'usuarios_no_procesados.txt');
    }
  } catch (error: any) {
    if (error.status == 409)
      this.toastrService.error('', error.error.error);
  }

}


/** 
   * Mass Occupational Health Safety upload from an excel file
   * 
  */
async reportsExcelOccupationalHealthSafety(formData: FormData) {
  try {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/upload/seguridadsaludlaboral', formData));
    if (resp && resp.UsuariosNoProcesados && resp.UsuariosNoProcesados.length == 0) {
      this.toastrService.success('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos seguridad salud laboral con éxito.`)
    } else {
      this.toastrService.warning('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos seguridad salud laboral con éxito. datos seguridad salud laboral sin procesar ${resp.UsuariosNoProcesados.length}`);
      const blobTxt = new Blob([this.buildContentTxt(resp)], { type: 'text/plain' });
      saveAs(blobTxt, 'usuarios_no_procesados.txt');
    }
  } catch (error: any) {
    if (error.status == 409)
      this.toastrService.error('', error.error.error);
  }

}



/** 
   * Mass Occupational Health Safety upload from an excel file
   * 
  */
async reportsExcelOthers(formData: FormData) {
  try {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/upload/otros', formData));
    if (resp && resp.UsuariosNoProcesados && resp.UsuariosNoProcesados.length == 0) {
      this.toastrService.success('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos otros con éxito.`)
    } else {
      this.toastrService.warning('', `Han sido registrados ${resp.CantidadRegistrosProcesados} datos otros con éxito. datos otros sin procesar ${resp.UsuariosNoProcesados.length}`);
      const blobTxt = new Blob([this.buildContentTxt(resp)], { type: 'text/plain' });
      saveAs(blobTxt, 'usuarios_no_procesados.txt');
    }
  } catch (error: any) {
    if (error.status == 409)
      this.toastrService.error('', error.error.error);
  }

}







 /**
   * Build content errors of users
   * @param resp 
   */
 buildContentTxt(resp: any): string {
  let content = 'Aviso: El archivo excel debe cumplir con lo siguiente:\n\n\r';
  content = content + '1) No debe contener filas vacias.\n\r';
  content = content + '2) primernombre, primerapellido, cedula, cargo, correoelectronico y sexo son obligatorios.\n\r';
  content = content + '3) primernombre, primerapellido, cedula, cargo y sexo no debe contener caracteres especiales.\n\r';
  content = content + '4) cedula debe contener solo números.\n\r';
  content = content + '5) cedula no debe estar registrada en el sistema.\n\r';
  content = content + '6) correoelectronico debe contener un correo válido.\n\r';
  content = content + '6) correoelectronico no debe estar registrado en el sistema.\n\r';
  content = content + '7) sexo solo debe indicar dos valores (f o m).\n\n\n\r';
  content = content + 'Usuarios no procesados:\n\n\n\n\r';
  resp.UsuariosNoProcesados.forEach((item: any) => {
    content = content + item.Nombre + '\n\r';
    content = content + item.email + '\n\r';
    content = content + 'Error(s):\n\r';
    let err = '';
    item.errores.forEach((error: any) => {
      err = err + error.message + '\n\r';
    });
    content = content + err + '\n\n\r';
  });
  return content;
}


}