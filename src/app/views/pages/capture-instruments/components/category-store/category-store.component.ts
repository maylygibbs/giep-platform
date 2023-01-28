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

  categoryStatus:boolean;

  constructor(private instrumentsService: InstrumentsService) {}

  ngOnInit(): void {

    if(!this.category.id){
      this.category.status = new SelectOption('1');
      this.categoryStatus = true;
    }else{
      this.categoryStatus = this.category.status.value == '1'? true: false;
    }
  }



  /**
   * Handle event change status
   * @param event 
   */
   onChangeStatus(event:any){
    this.category.status = this.categoryStatus == true ? new SelectOption('1') : new SelectOption('2');
  }

    /**
   * Submit form rol
   * @param form 
   */
  async onSubmit(form:NgForm){
    if(form.valid){
      await this.instrumentsService.storeCategory(this.category);
      this.back();
    }
  }

  /**
   * Return to back page
   */
  back(){
    this.onBack.emit(null);
  }

}
