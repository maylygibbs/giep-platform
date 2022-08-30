import { InstrumentsService } from './../../../../../core/services/instruments.service';
import { SelectOption } from './../../../../../core/models/select-option';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category-store',
  templateUrl: './category-store.component.html',
  styleUrls: ['./category-store.component.scss']
})
export class CategoryStoreComponent  implements OnInit {

  @Input()
  category: SelectOption;

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  constructor(private instrumentsService: InstrumentsService) {}

  ngOnInit(): void {
  }

  async onSubmit(form:NgForm){
    if(form.valid){
      await this.instrumentsService.storeCategory(this.category);
      this.back();
    }

  }

  back(){
    this.onBack.emit(null);
  }

}
