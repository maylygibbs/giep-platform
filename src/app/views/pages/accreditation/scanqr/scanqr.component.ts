import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-scanqr',
  templateUrl: './scanqr.component.html',
  styleUrls: ['./scanqr.component.scss']
})
export class ScanqrComponent implements OnInit {
  
  enableCamera:boolean = false;
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/ ];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  scanCompleteHandler(event){
    console.log('Reder qr data', event)
    if(event){
      console.log(event)
      console.log(event.text)
      const data = JSON.parse(event.text);
      this.router.navigate(['/accreditations/detail'],{state:{infoQR:data}})
    }
  }

}
