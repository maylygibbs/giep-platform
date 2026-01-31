import { PaginationResponse } from '../models/pagination-response';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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

  private documents: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);
  environment = environment;

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
  async getDocumentPaginated(filter: any): Promise<PaginationResponse> {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/archivo/pagined', filter));
    const paginator = new PaginationResponse(filter.page, filter.rowByPage);
    paginator.count = resp.count;
    paginator.data = resp.data.map((item: any) => {
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
      if (item.bloquedo_por && item.bloquedo_por.length > 0) {
        document.bloquedBy = new User();
        document.bloquedBy.firstName = item.bloquedo_por[0].nombre_apellido
      }
      document.bloquedBy
      return document;
    })

    return paginator;
  }





  /**
   * Upload document
   * @param formData 
   */
  async uploadFile(formData: FormData): Promise<boolean> {
    let response: boolean = false;
    try {
      const resp = await firstValueFrom(this.post(environment.apiUrl, '/archivo/upload/archivo', formData));
      console.log(resp);
      this.toastrService.success(resp.msg);
      response = true;
    } catch (error: any) {
      console.log(error)
      if (error.status == 409) {
        this.toastrService.error(error.error.msg);
      } else {
        this.toastrService.error('Ha ocurrido un error cargando el archivo.');
      }
    } finally {
      return response;
    }
  }




  /**
   * Upload document
   * @param formData 
   */
  async pull(id: string): Promise<any> {
    let response: any = null;
    try {

      const resp = await firstValueFrom(this.get(environment.apiUrl, `/archivo/download/file/${id}`));
      console.log(resp);
      this.toastrService.success('Descarga realizada con éxito.');
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
  async downloadFileHistorico(id: string): Promise<any> {
    let response: any = null;
    try {
      const resp = await firstValueFrom(this.get(environment.apiUrl, `/archivo/downloadhistorico/file/${id}`));
      console.log(resp);
      this.toastrService.success('Descarga realizada con éxito.');
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
   * Query document info by id
   * @param id 
   * @returns 
   */
  async getDocumentById(id: string): Promise<DocumentGiep> {
    let listDoc: Array<DocumentGiep>;
    let doc: DocumentGiep = null;
    try {
      const resp = await firstValueFrom(this.get(environment.apiUrl, `/archivo/${id}`));
      if (resp.count == 1) {
        const user = this.authService.currentUser;
        listDoc = resp.data.map((item: any) => {
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
          if (item.hashtag) {
            docOutput.hashtag = JSON.parse(item.hashtag);
          }

          if (item.iduserarchivos) {
            docOutput.users = new Array<User>();
            const temp = item.iduserarchivos.filter((userItem: any) => userItem.email != user.email);
            if (temp.length > 0) {
              docOutput.users = temp.map((userData) => {
                return parseInt(userData.id);
              });
              docOutput.usersView = temp.map((userData) => {
                const user = new User();
                user.id = userData.id;
                user.email = userData.email;
                user.firstName = userData.primerNombre;
                user.secondName = userData.segundoNombre;
                user.lastName = userData.primerApellido;
                user.secondLastName = userData.segundoApellido;
                return user;
              })
            }
          }


          if (item.historico && item.historico.length > 0) {
            docOutput.history = item.historico.map((itemHist: any) => {
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
          if (item.bloquedo_por && item.bloquedo_por.length > 0) {
            docOutput.bloquedBy = new User();
            docOutput.bloquedBy.firstName = item.bloquedo_por[0].nombre_apellido
          }

          return docOutput;
        });
        doc = listDoc[0];
      }
    } catch (error: any) {
      console.log(error)
      if (error.status) {
        this.toastrService.error(error.error.error);
      } else {
        this.toastrService.error('Ha ocurrido un error consultando el detalle del documento.');
      }
    } finally {
      return doc;
    }
  }




  /**
   * File unlock process
   * @param id 
   * @returns 
   */
  async documentUnlock(id: string): Promise<any> {
    let response: any = null;
    try {
      const resp = await firstValueFrom(this.put(environment.apiUrl, `/archivo/admindesbloqueoarchivos/${id}`));
      console.log(resp);
      this.toastrService.success('Desbloqueo de archivo realizado con éxito.');
      response = resp;
    } catch (error: any) {
      console.log(error)
      if (error.status) {
        this.toastrService.error(error.error.error);
      } else {
        this.toastrService.error('Ha ocurrido un error desbloqueando el archivo.');
      }
    } finally {
      return response;
    }
  }


  /**
 * File change status process
 * @param id 
 * @returns 
 */
  async documentChangeState(id_archivo: number, id_estado: number, comentarios: string = 'Sin Comentarios'): Promise<any> {
    let response: any = null;
    try {
      const resp = await firstValueFrom(this.put(environment.apiUrl, `/archivo/cambiostatusarchivo`, { id_archivo, id_estado, comentarios }));
      switch (id_estado) {
        case 2:
          this.toastrService.success('El documento a pasado a revisión con éxito.');
          break;
        case 3:
          this.toastrService.success('El documento ha sido aprobado con éxito.');
          break;
        case 5:
          this.toastrService.success('El documento ha sido rechazado con éxito.');
          break;

        default:
          break;
      }
      response = resp;
    } catch (error: any) {
      console.log(error)
      if (error.status) {
        this.toastrService.error(error.error.error);
      } else {
        this.toastrService.error('Ha ocurrido un error cambiando de estado el archivo.');
      }
    } finally {
      return response;
    }
  }

  /**
 * File delete process
 * @param id 
 * @returns 
 */
  async deleteDocument(id_archivo: number, id_estado: number = 4, comentarios: string = 'Sin Comentarios'): Promise<any> {
    let response: any = null;
    try {
      const resp = await firstValueFrom(this.put(environment.apiUrl, `/archivo/cambiostatusarchivo`, { id_archivo, id_estado, comentarios }));
      console.log(resp);
      this.toastrService.success('Camnio de estado del archivo realizado con éxito.');
      response = resp;
    } catch (error: any) {
      console.log(error)
      if (error.status) {
        this.toastrService.error(error.error.error);
      } else {
        this.toastrService.error('Ha ocurrido un error cambiando de estado el archivo.');
      }
    } finally {
      return response;
    }
  }


  /******************************************************************
   * SERVICIOS DOCUMENTOS DIGITALIZADOS
   ******************************************************************
   */


  /**
 * Check all users, supports pagination and filter
 * @param filter 
 * @returns 
 */
  async getDigitalizedDocumentsPaginated(filter: any): Promise<PaginationResponse> {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/archivodigital/pagined', filter));
    const paginator = new PaginationResponse(filter.page, filter.rowByPage);
    paginator.count = resp.count;
    paginator.data = resp.data.map((item: any) => {
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
      document.isBloqued = item.id_limited_bloqueo === 3 ? false : true;
      if (item.bloquedo_por && item.bloquedo_por.length > 0) {
        document.bloquedBy = new User();
        document.bloquedBy.firstName = item.bloquedo_por[0].nombre_apellido
      }
      document.url = this.environment.apiAuth + item.url_alojamiento;
      return document;
    })

    return this.resolveWith(paginator);
  }



  /**
 * Upload digitalized document
 * @param formData 
 */
  async uploadDigitalizedFile(formData: FormData): Promise<boolean> {
    let response: boolean = false;
    try {
      const resp = await firstValueFrom(this.post(environment.apiUrl, '/archivodigital/upload/archivo', formData));
      console.log(resp);
      this.toastrService.success(resp.msg);
      response = true;
    } catch (error: any) {
      console.log(error)
      if (error.status == 409) {
        this.toastrService.error(error.error.msg);
      } else {
        this.toastrService.error('Ha ocurrido un error cargando el archivo.');
      }
    } finally {
      return response;
    }
  }


  /**
 * Query document info by id
 * @param id 
 * @returns 
 */
  async getDigitalizedDocumentById(id: string): Promise<DocumentGiep> {
    let listDoc: Array<DocumentGiep>;
    let doc: DocumentGiep = null;
    try {
      const resp = await firstValueFrom(this.get(environment.apiUrl, `/archivodigital/${id}`));
      if (resp.count == 1) {
        const user = this.authService.currentUser;
        listDoc = resp.data.map((item: any) => {
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
          if (item.hashtag) {
            docOutput.hashtag = JSON.parse(item.hashtag);
          }

          if (item.iduserarchivos) {
            docOutput.users = new Array<User>();
            const temp = item.iduserarchivos.filter((userItem: any) => userItem.email != user.email);
            if (temp.length > 0) {
              docOutput.users = temp.map((userData) => {
                return parseInt(userData.id);
              });
              docOutput.usersView = temp.map((userData) => {
                const user = new User();
                user.id = userData.id;
                user.email = userData.email;
                user.firstName = userData.primerNombre;
                user.secondName = userData.segundoNombre;
                user.lastName = userData.primerApellido;
                user.secondLastName = userData.segundoApellido;
                return user;
              })
            }
          }


          if (item.historico && item.historico.length > 0) {
            docOutput.history = item.historico.map((itemHist: any) => {
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
          if (item.bloquedo_por && item.bloquedo_por.length > 0) {
            docOutput.bloquedBy = new User();
            docOutput.bloquedBy.firstName = item.bloquedo_por[0].nombre_apellido
          }

          return docOutput;
        });
        doc = listDoc[0];
      }
    } catch (error: any) {
      console.log(error)
      if (error.status) {
        this.toastrService.error(error.error.error);
      } else {
        this.toastrService.error('Ha ocurrido un error consultando el detalle del documento.');
      }
    } finally {
      return doc;
    }
  }


  /**
  * Query document info by id
  * @param id 
  * @returns 
  */
  async getDigitalizedDocumentByIdDetalle(id: string): Promise<DocumentGiep> {
    let listDoc: Array<DocumentGiep>;
    let doc: DocumentGiep = null;
    try {

      const resp = await firstValueFrom(this.get(environment.apiUrl, `/controlarchivodigital/listid/${id}`));
      console.log('detalle', resp)
      const user = this.authService.currentUser;
      listDoc = resp.data.map((item: any) => {
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
        if (item.hashtag) {
          docOutput.hashtag = JSON.parse(item.hashtag);
        }
        docOutput.url = this.environment.apiAuth + item.url_alojamiento
        docOutput.folios = item.folios;
        docOutput.numCaja = item.num_dela_caja;
        docOutput.numEstuche = item.num_dela_estuches;
        if(item.fecha_extrema_inicio) {
          docOutput.fechaExtremaInicio = item.fecha_extrema_inicio.date;
        }
        if(item.fecha_extrema_fin) {
          docOutput.fechaExtremaFin = item.fecha_extrema_fin.date;
        }

        //control archivo
        docOutput.asuntos = item.id_control_archivo_digital.Asuntos;
        docOutput.numExpediente = item.id_control_archivo_digital['num_expediente'] || "No aplica";
        docOutput.justificacion = item.id_control_archivo_digital['argumento_justificacion'];
        docOutput.fechaFinConservacion = item.id_control_archivo_digital['fecha_fin_conservac'].date;
        docOutput.tieneArchivoFisico = new SelectOption(item.id_control_archivo_digital['sw_archivo_fisico'], item.id_control_archivo_digital['sw_archivo_fisico'] == 0 ? 'Sí' : 'No');
        docOutput.fechaDocumento = item.id_control_archivo_digital.fecha_documento.date;
        docOutput.almacenType = new SelectOption(item.id_control_archivo_digital.id_tipo_almacen, item.id_control_archivo_digital['nombre_almacen']);

        docOutput.location1 = new SelectOption(item.id_control_archivo_digital['id_ubicacion_1'], item.id_control_archivo_digital['ubicacion_1']);
        docOutput.location2 = new SelectOption(item.id_control_archivo_digital['id_ubicacion_2'], item.id_control_archivo_digital['ubicacion_2']);
        docOutput.location3 = new SelectOption(item.id_control_archivo_digital['id_ubicacion_3'], item.id_control_archivo_digital['ubicacion_3']);

        docOutput.region = new SelectOption(item.id_control_archivo_digital.id_region, item.id_control_archivo_digital.region);

        docOutput.pais = new SelectOption(item.id_control_archivo_digital.id_Pais, item.id_control_archivo_digital.Pais);
        docOutput.estado = new SelectOption(item.id_control_archivo_digital.id_Estado, item.id_control_archivo_digital.Estado);
        docOutput.ciudad = new SelectOption(item.id_control_archivo_digital.id_ciudad, item.id_control_archivo_digital.Ciudad);

        docOutput.serie = new SelectOption(item.id_control_archivo_digital.id_serie, item.id_control_archivo_digital.serie);

        docOutput.subSerie = new SelectOption(item.id_control_archivo_digital.id_subserie, item.id_control_archivo_digital['sub_serie']);

        docOutput.estado = new SelectOption(item.id_control_archivo_digital.id_statustipoestado, item.id_control_archivo_digital['nombre_status']);

        docOutput.cantidadCaja = item.id_control_archivo_digital['cantidad_caja'];

        docOutput.cantidadEstuche = item.id_control_archivo_digital['cantidad_estuche']; //TODO: REVISAR CON BACKEND

        docOutput.usuarioEntrega = item.id_control_archivo_digital['id_usuario_entrega'];  //"Nombres": "Jaime Leonardo", "Apellidos": "Padron Farias",

        docOutput.contenidoCaja = new SelectOption(item.id_control_archivo_digital['id_estuche'], item.id_control_archivo_digital['nombre_estuche']);

        docOutput.nivelUnidad = new SelectOption(item.id_control_archivo_digital['id_padre_estructuraorganizativa'], item.id_control_archivo_digital['padre_estructura_organizativa']);

        docOutput.estructuraOrganizativa = new SelectOption(item.id_control_archivo_digital['id_estructuraorganizativa'], item.id_control_archivo_digital['estructura_organizativa']);

        return docOutput;

      });
      doc = listDoc[0];

      console.log('doc >>>>>>>>>>>>', doc);
    } catch (error: any) {
      console.log(error)
      if (error.status) {
        this.toastrService.error(error.error.error);
      } else {
        this.toastrService.error('Ha ocurrido un error consultando el detalle del documento.');
      }
    } finally {
      return doc;
    }
  }




  /**
   * Retorna lista de valores de estados
   */
  async getStateList(): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/archivodigitalstatus/list'));
    console.log('lista estado', resp)
    if (resp && resp.data) {
      return resp.data.map((item) => {
        return new SelectOption(item.id, item.nombrestatus);
      });
    } else {
      return null;
    }

  }

  /**
  * Retorna lista de valores de direccion almacen
  */
  async getDireccionAlmacenList(): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/archivodigitaldireccionalmacen/list'));
    console.log('DireccionAlmacenList', resp);
    if (resp && resp.data) {
      return resp.data.map((item) => {
        return new SelectOption(item.id, `${item.nombre}: ${item.direccionzona}. Tlf.:${item.telefono}`);
      });
    } else {
      return null;
    }
  }

  /**
  * Retorna lista de valores de tipos de almacen
  */
  async getTipoAlmacenList(id: number): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/archivodigitaltipoalmacen/listid/${id}`));
    console.log('TipoAlmacenList', resp);
    if (resp && resp.data) {
      return resp.data.map((item) => {
        return new SelectOption(item.id, item.nombrealmacen);
      });
    } else {
      return null;
    }

  }

  /**
   * Retorna listado de ubicacion
   */
  async getUbicacionList(): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/archivodigitalubicacion/list'));
    console.log('UbicacionList', resp);
    if (resp && resp.data) {
      return resp.data.map((item) => {
        return new SelectOption(item.id, item.descripcion);
      });
    } else {
      return null;
    }
  }

  /**
 * Retorna listado de Nivel Unidad
 */
  async getNivelUnidadList(): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/archivodigitalestructuraorganizativa/list'));
    console.log('NivelUnidadList', resp);
    if (resp && resp.data) {
      return resp.data.map((item) => {
        return new SelectOption(item.id, item.nivelunidad);
      });
    } else {
      return null;
    }
  }

  /**
 * Retorna listado de Estructura Organizativa
 */
  async getEstructuraOrganizativaList(nivelUnidadId): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/estructuraorganizativa/listid/${nivelUnidadId}`));
    console.log('EstructuraOrganizativaList', resp)
    if (resp && resp.data) {
      return resp.data.map((item) => {
        return new SelectOption(item.id, item.estructuraorganizativa);
      });
    } else {
      return null;
    }
  }

  /**
   * Retorna listado de Regiones
   */
  async getRegionList(): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/archivodigitalregion/list'));
    console.log('RegionList', resp);
    if (resp && resp.data) {
      return resp.data.map((item) => {
        return new SelectOption(item.id, item.descregion);
      });
    } else {
      return null;
    }
  }


  /**
   * Retorna listado de Paises
   */
  async getPaisList(): Promise<any> {
    return this.resolveWith([new SelectOption('1', 'Venezuela')]);
  }

  /**
   * Retorna lista de estados
   * @param paisId 
   */
  async getEstadosList(paisId): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/estado/pais/${paisId}`));
    console.log('EstadosList', resp);
    if (resp) {
      return resp.map((item) => {
        return new SelectOption(item.id, item.nombre);
      });
    } else {
      return null;
    }

  }

  /**
 * Retorna lista de estados
 * @param estadoId 
 */
  async getCiudadList(estadoId): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/ciudad/estado/${estadoId}`));
    console.log('CiudadList', resp);
    if (resp) {
      return resp.map((item) => {
        return new SelectOption(item.id, item.nombre);
      });
    } else {
      return null;
    }

  }

  /**
   * Retorna listado de gerencias
   */
  async getGerenciasList(): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/archivodigitalestructuraorganizativa/list'));
    console.log('GerenciasList', resp);
    if (resp && resp.data) {
      return resp.data.map((item) => {
        return new SelectOption(item.id, item.estructuraorganizativa);
      });
    } else {
      return null;
    }
  }

  /**
 * Retorna listado de si/no del campo tiene archivo digital
 */
  async getTieneArchivoDigitalList(): Promise<any> {
    return this.resolveWith([new SelectOption('0', 'Sí'), new SelectOption('1', 'No')]);
  }

  /**
 * Retorna listado de contenido caja
 */
  async getContenidoCajaList(): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/archivodigitalcontenidocaja/list'));
    console.log('ContenidoCajaList', resp);
    if (resp && resp.data) {
      return resp.data.map((item) => {
        return new SelectOption(item.id, item.nombreestuche);
      });
    } else {
      return null;
    }
  }

  /**
* Retorna listado de serie
*/
  async getSerieList(): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/archivodigitalserie/list'));
    console.log('serieList', resp);
    if (resp && resp.data) {
      return resp.data.map((item) => {
        return new SelectOption(item.id, item.nombre);
      });
    } else {
      return null;
    }
  }


  /**
* Retorna listado de serie
*/
  async getSubSerieList(serieId: any): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/archivodigitalsubserie/listid/${serieId}`));
    console.log('serieList', resp);
    if (resp && resp.data) {
      return resp.data.map((item) => {
        return new SelectOption(item.id, item.nombre_subserie);
      });
    } else {
      return null;
    }
  }

  /**
   * Estado conservacion list
   * @returns 
   */
  async getEstadoConservacionList(): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/archivodigital/estadoconservacionmaterial/list`));
    console.log('EstadoConservacionList', resp);
    if (resp && resp.data) {
      return resp.data.map((item) => {
        return new SelectOption(item.id, item.nombreconservacion);
      });
    } else {
      return null;
    }
  }

  /**
   * Tipo material list
   * @returns 
   */
  async getTipoMaterialList(): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/archivodigital/materialrecibido/list`));
    console.log('TipoMaterialList', resp);
    if (resp && resp.data) {
      return resp.data.map((item) => {
        return new SelectOption(item.id, item.nombrematerial);
      });
    } else {
      return null;
    }
  }


  /**
* Retorna listado de si/no del campo expediente documental
*/
  async getExpendienteDocumentalList(): Promise<any> {
    return this.resolveWith([new SelectOption('1', 'Sí'), new SelectOption('0', 'No')]);
  }


    /**
* Retorna listado de si/no del campo tiene fechas extremas
*/
async getTieneFechasExtremaslList(): Promise<any> {
  return this.resolveWith([new SelectOption('1', 'Sí'), new SelectOption('0', 'No')]);
}


  async getBinaryDoc(url): Promise<any> {
    return await firstValueFrom(this.http.get(url, {
      responseType: 'blob', // importante para obtener el binario
      headers: new HttpHeaders({
        'Content-Type': 'application/pdf', // opcional, puedes omitirlo        
      }),
    }));
  }





}


