import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

  @Input()
  public message:string;

  @Output()
  public onFinish: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(protected modalService: NgbModal) { }

  ngOnInit(): void {
  }

  confirm(){
    this.onFinish.emit(true);
  }

  cancel(){
    this.onFinish.emit(false);
  }

  closeModal(){
    this.modalService.dismissAll();
  } 

}
