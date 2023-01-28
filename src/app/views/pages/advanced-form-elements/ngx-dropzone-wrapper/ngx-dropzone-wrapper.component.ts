import { Component, OnInit, ViewChild } from '@angular/core';

import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-ngx-dropzone-wrapper',
  templateUrl: './ngx-dropzone-wrapper.component.html',
  styleUrls: ['./ngx-dropzone-wrapper.component.scss']
})
export class NgxDropzoneWrapperComponent implements OnInit {

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 2,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  fileContent:string|ArrayBuffer;

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  constructor() { }

  ngOnInit(): void {
  }

  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  onUploadSuccess(event: any): void {
    let file: File = event[0]
    console.log('onUploadSuccess:', event);
    console.log('onUploadSuccess:', file.name);
    console.log('onUploadSuccess:', file.type);
    if(file.name === 'ORIG_HEAD' && !file.type){
      let fileReader: FileReader = new FileReader();
      let self = this;
      fileReader.onloadend = function(x) {
        self.fileContent = fileReader.result;
        console.log('onUploadSuccess:', self.fileContent);
      }
      fileReader.readAsText(file);
    }else{
      const dataFile = {file: file.name};
      if(this.fileContent){
        Object.assign(dataFile,{orig_head:this.fileContent})
      }
      console.log('onUploadSuccess:', dataFile);
    }

    

  }

  resetDropzoneUploads(): void {
    if (this.directiveRef) {
      this.directiveRef.reset();
    }
  }

}
