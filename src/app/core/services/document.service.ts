import { PaginationResponse } from '../models/pagination-response';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from '../models/user';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { SelectOption } from '../models/select-option';
import { ToastrService } from 'ngx-toastr';
import { DocumentGiep } from '../models/document';
import { CommonsService } from './commons.service';


@Injectable({
  providedIn: 'root'
})
export class DocumentService extends HttpService {
  
  private documents: BehaviorSubject< Array<any>> = new BehaviorSubject< Array<any>>(null);

  constructor(protected http: HttpClient,
    private authService: AuthService,
    private commonsService: CommonsService,
    private toastrService: ToastrService) { 
    super(http);
  }



/**
 * Check all users, supports pagination and filter
 * @param filter 
 * @returns 
 */
  async getDocumentPaginated(filter:any):Promise<PaginationResponse>{
    const resp = await firstValueFrom(this.post(environment.apiUrl,'/archivo/pagined',filter));
    const paginator = new PaginationResponse(filter.page,filter.rowByPage);
    paginator.count = resp.count;
    paginator.data = resp.data.map((item:any)=>{
      const document = new DocumentGiep();
      document.id = item.id;
      document.title = item.titulo;
      document.sizeStr = this.commonsService.formatBytes(item.tamano);
      document.originalName = item.nombre_original;
      document.isPublic = item.publico == '1' ? true : false;
      document.description = item.descripcion_archivo;
      document.state = new SelectOption(item.idestado, item.nombre_status);
      document.creationDate = item.fecha_actividad_registro;
      document.ext = item.tipo_extensiones;
      document.isBloqued = item.id_limited_bloqueo == 3 ? false : true;
      if(item.bloquedo_por && item.bloquedo_por.length>0){
        document.bloquedBy = new User();
        document.bloquedBy.firstName = item.bloquedo_por[0].nombre_apellido
      }
      document.bloquedBy 
      return document;
    })

    return paginator ;
  }


  /**
   * Upload document
   * @param formData 
   */
  async uploadFile(formData:FormData):Promise<boolean>{
    let response:boolean = false;
    try {
      const resp = await firstValueFrom(this.post(environment.apiUrl,'/archivo/upload/archivo',formData));
      console.log(resp);
      this.toastrService.success(resp.msg);
      response = true;
    } catch (error:any) {
      console.log(error)
      if(error.status==409){
        this.toastrService.error(error.error.msg);
      }else{
        this.toastrService.error('Ha ocurrido un error cargando el archivo.');
      }     
    }finally{
      return response;
    }    
  }

  /**
   * Upload document
   * @param formData 
   */
  async pull(id:string):Promise<any>{
    let response:any = null;
    try {
      debugger
      const resp = await firstValueFrom(this.get(environment.apiUrl,`/archivo/download/file/${id}`));
      console.log(resp);
      this.toastrService.success('Descarga realizada con éxito.');
      response = resp;
    } catch (error:any) {
      console.log(error)
      if(error.status){
        this.toastrService.error(error.error.error);
      }else{
        this.toastrService.error('Ha ocurrido un error descargando el archivo.');
      }     
    }finally{
      return response;
    }    
  }


    /**
   * Upload document
   * @param formData 
   */
     async downloadFileHistorico(id:string):Promise<any>{
      let response:any = null;
      try {
        const resp = await firstValueFrom(this.get(environment.apiUrl,`/archivo/downloadhistorico/file/${id}`));
        console.log(resp);
        this.toastrService.success('Descarga realizada con éxito.');
        response = resp;
      } catch (error:any) {
        console.log(error)
        if(error.status){
          this.toastrService.error(error.error.error);
        }else{
          this.toastrService.error('Ha ocurrido un error descargando el archivo.');
        }     
      }finally{
        return response;
      }    
    }

  /**
   * Query document info by id
   * @param id 
   * @returns 
   */
  async getDocumentById(id:string):Promise<DocumentGiep>{
    let listDoc:Array<DocumentGiep>;
    let doc:DocumentGiep = null;
    try{
      const resp = await firstValueFrom(this.get(environment.apiUrl,`/archivo/${id}`));
      if(resp.count == 1){
        const user = this.authService.currentUser;
        listDoc = resp.data.map((item:any)=>{
          const docOutput = new DocumentGiep();
          docOutput.id = item.id;
          docOutput.title = item.titulo;
          docOutput.sizeStr = this.commonsService.formatBytes(item.tamano);
          docOutput.originalName = item.nombre_original;
          docOutput.isPublic = item.publico == '1' ? true : false;
          docOutput.description = item.descripcion_archivo;
          docOutput.state = new SelectOption(item.idestado, item.nombre_status);
          docOutput.creationDate = item.fecha_actividad_registro;
          docOutput.ext = item.tipo_extensiones;
          if(item.hashtag){
            docOutput.hashtag = JSON.parse(item.hashtag);
          }

          if(item.iduserarchivos){
           docOutput.users = new Array<User>(); 
           const temp = item.iduserarchivos.filter((userItem:any)=> userItem.email!=user.email);
           if(temp.length > 0){
            docOutput.users  = temp.map((userData)=>{
              return parseInt(userData.id);
            })
           }           
          }

          if(item.historico && item.historico.length > 0){
            docOutput.history = item.historico.map((itemHist:any)=>{
              return {
                id: itemHist.id,
                commentary: itemHist.comentario,
                creationDate: itemHist.fecha_creacion_hist,
                action: itemHist.tipo_operaciones,
                uuid: itemHist.nemotecnico,
                email: itemHist.email,
                fullName: itemHist.nombre_apellido
              }
            });
          }


          docOutput.isBloqued = item.id_limited_bloqueo == 3 ? false : true;
          if(item.bloquedo_por && item.bloquedo_por.length>0){
            docOutput.bloquedBy = new User();
            docOutput.bloquedBy.firstName = item.bloquedo_por[0].nombre_apellido
          }

          return docOutput;
         });
        doc = listDoc[0];
      }      
    } catch (error:any) {
      console.log(error)
      if(error.status){
        this.toastrService.error(error.error.error);
      }else{
        this.toastrService.error('Ha ocurrido un error consultando el detalle del documento.');
      }     
    }finally{
      return doc;
    }   
  }


}


