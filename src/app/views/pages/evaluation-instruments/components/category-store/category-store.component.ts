import { Evaluation360InstrumentsService } from './../../../../../core/services/evaluation360-instruments.service';
import { SelectOption } from './../../../../../core/models/select-option';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';

@Component({
  selector: 'app-evaluation-category-store',
  templateUrl: './category-store.component.html',
  styleUrls: ['./category-store.component.scss']
})
export class EvaluationCategoryStoreComponent extends BaseComponent implements OnInit {

  @Input()
  category: SelectOption;

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  categoryStatus:boolean;

  data: any;

  typeOptions = [
    { value: 'Cardinal', label: 'Cardinal' },
    { value: 'Digital', label: 'Digital' },
    { value: 'Técnica', label: 'Técnica' }
  ];

  constructor(private evaluationService: Evaluation360InstrumentsService,
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
      this.category.type = null;
      this.category.description = '';
    }else{
      this.categoryStatus = this.category.status.value == '1'? true: false;
    }
  }

  onChangeStatus(event:any){
    this.category.status = this.categoryStatus == true ? new SelectOption('1') : new SelectOption('2');
  }

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

  async onSubmit(form:NgForm){
    if(form.valid){
      await this.evaluationService.storeCategory(this.category);
      this.back();
    }
  }

  back(){
    this.onBack.emit(null);
  }
} 