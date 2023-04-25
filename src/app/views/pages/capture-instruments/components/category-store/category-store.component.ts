import { InstrumentsService } from './../../../../../core/services/instruments.service';
import { SelectOption } from './../../../../../core/models/select-option';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';

@Component({
  selector: 'app-category-store',
  templateUrl: './category-store.component.html',
  styleUrls: ['./category-store.component.scss']
})
export class CategoryStoreComponent extends BaseComponent  implements OnInit {

  @Input()
  category: SelectOption;

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  categoryStatus:boolean;


  data: any;

  constructor(private instrumentsService: InstrumentsService,
    private route: ActivatedRoute) {
      super();
    this.route.data.subscribe((data) => {
      this.data = data;
    });
  }

  ngOnInit(): void {

    if(!this.category.id){
      this.category.status = new SelectOption('1');
      this.categoryStatus = true;
      this.category.flag = false;

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
   * Process scale and weighing
   * @param event 
   */
  onChangeStatusFlag(event:any){
    if(this.category.flag){
      if(!this.category.id){
        this.category.scales = this.data.charges.map((item:SelectOption,index:number)=>{
          return {
            id: item.value,
            label: item.label,
            scaleNumber: 0,
            nameControlScale: 'controlScaleCharge-'+index
          }
        });
        this.category.weights = this.data.levels.map((item:SelectOption,index:number)=>{
          return {
            id: item.value,
            label: item.label,
            weighingNumber: 0,
            nameControlWeighing: 'controlWeighingLevel-'+index
          }
        });
      }

    }else{
      if(!this.category.id){
        this.category.scales = null;
        this.category.weights = null;
      }

    }
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
