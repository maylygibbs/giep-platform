import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-box-util-views',
  templateUrl: './box-util-views.component.html',
  styleUrls: ['./box-util-views.component.scss']
})
export class BoxUtilViewsComponent implements OnInit {

  @Output('onChangeView')
  onChangeView: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  changeView(change:boolean){
    this.onChangeView.emit(change);
  }

}
