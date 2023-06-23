import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDetail } from '../../../../core/models/event-detail';
import { CalendarService } from '../../../../core/services/calendar.service';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ToastrService } from 'ngx-toastr';
import { AppearanceAccreditation } from '../../../../core/models/appearance-accreditation';

@Component({
  selector: 'app-print-accreditation',
  templateUrl: './print-accreditation.component.html',
  styleUrls: ['./print-accreditation.component.scss']
})
export class PrintAccreditationComponent implements OnInit {

  idEvent
  accreditations: Array<any>;
  eventDetail: EventDetail;
  drop: any;
  config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    maxFilesize: 10,
    ignoreHiddenFiles: false,
    autoProcessQueue: false,
    uploadMultiple: true,
    parallelUploads: 2,
    addRemoveLinks: true,
    dictDefaultMessage: 'Arrastra la imagen de la acreditación o haz click aquí para subirla.',
    dictRemoveFile: 'Eliminar',
    autoReset: 1000,
    errorReset: 2500,
    cancelReset: null,
    acceptedFiles: '.png, .jpg, .jpeg',
    init: () => {
      this.drop = this;
    }
  };

  appearance:AppearanceAccreditation;
  qrColorValue:string;
  qrSizeValue:number;

  requestQrColorValue: NodeJS.Timeout;
  requestQrSizeValue: NodeJS.Timeout;

  quantityCard:string;

  constructor(private route: ActivatedRoute,
    private calendarService: CalendarService,
    private toastrService: ToastrService) {
    this.route.queryParams.subscribe(params => {
      this.idEvent = params['idEvent'];

    });
  }

  async ngOnInit() {
    this.quantityCard = '3';
    this.appearance = new AppearanceAccreditation();
    this.appearance.textColor = '#000000';
    this.appearance.textPosition = 'text-center-center';
    this.appearance.textSize = 19;

    this.appearance.qrColor = '#000000';
    this.appearance.qrPosition = 'qrcode-right-button';
    this.appearance.qrSize = 85;
    this.qrColorValue = '#000000';
    this.qrSizeValue = 85;
    await this.getEventById(this.idEvent);
  
  }

  /**
   * Generate accreditations
   */
  async generateAccreditations(){   
    this.accreditations = this.eventDetail.usersAccredited;
  }

  /**
   * Get event detail by id
   * @param id 
   */
  async getEventById(id: string) {
    this.eventDetail = await this.calendarService.getEventByIdWithAccreditation(id);
    console.log('eventDetail', this.eventDetail)
  }

  printDiv(divID) {
    //Get the HTML of div
    var divElements = document.getElementById(divID).innerHTML;
    //Get the HTML of whole page
    var oldPage = document.body.innerHTML;

    //Reset the page's HTML with div's HTML only
    document.body.innerHTML =
      "<html><head><title></title></head><body> <div class='row'>  <div class='col-md-12'>  <div class='card'> <div class='card-body'>" +
      divElements + "</div></div></div></div></body>";

    //Print Page
    window.print();

    //Restore orignal HTML
    document.body.innerHTML = oldPage;

    this.refresh();

  }

  refresh(): void {
    window.location.reload();
  }

  /**
   * Handle error in upload action
   * @param event 
   */
  onUploadError(event: any): void {
    console.log('onUploadError:', event);
    //this.disableBtnSubmit = true;
    if (event[1] == "You can't upload files of this type.") {
      this.toastrService.error('Documento con extensión no permitida. Sólo se permiten documentos con las siguientes extensiones: docx,.txt, doc, pdf, xls, xlsx, odt, ods, odp, ppt, pptx, png, jpg, jpeg, gif y mp4.')
    }
    if (event[1] == "File is too big (2.87MiB). Max filesize: 2MiB.") {
      this.toastrService.error('El documento es demasiado grande. Tamaño máximo de docuemento: 10MB.')
    }
   }

  /**
* Handle success in upload action
* @param event 
*/
  onUploadSuccess(event: any): void {
    console.log(event)
   }

  /**
 * Handle add file action
 * @param event 
 */
  addFile(event: any) {
    let file: File = event;
    console.log('event:', event);
    console.log('file name:', file.name);
    console.log('file type:', file.type);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result: string = reader.result as string;
        if (result.includes(',')) {
          this.eventDetail.urlImg = result;
        }

      };
      reader.onerror = (error) => {
        console.log(error);
      };
    }
   }

  /**
* Reset zone drag and drop
*/
  resetDropzoneUploads() { 
    this.accreditations = null;
    this.eventDetail.urlImg = null;
    
  }

  onChangeQrColor(event){
    
    if(this.requestQrColorValue){
      clearTimeout(this.requestQrColorValue);
      this.requestQrColorValue = null;
    }
    this.requestQrColorValue = setTimeout(() => {
      this.appearance.qrColor = this.qrColorValue;
    }, 300);
  }


  onChangeQrSize(event){

    if(this.requestQrSizeValue){
      clearTimeout(this.requestQrSizeValue);
      this.requestQrSizeValue = null;
    }
    this.requestQrSizeValue = setTimeout(() => {
      this.appearance.qrSize= this.qrSizeValue;
    }, 300);
  }

}


