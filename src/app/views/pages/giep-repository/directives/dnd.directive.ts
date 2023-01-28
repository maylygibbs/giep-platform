import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {

  @Output('onDragOver')
  outputDragOver: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  @HostListener('dragover',['$event'])
  onDragOver(event){
    event.preventDefault();
    event.stopPropagation();
    console.log('dragover', event);
    this.outputDragOver.emit(true);
  }

}
