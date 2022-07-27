import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

  @Output()
  public onChangePage: EventEmitter<number>= new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }


  pageChanged(page:any){    
    this.onChangePage.emit(page);
  }

}
