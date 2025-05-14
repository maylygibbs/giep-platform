import { Evaluation360InstrumentsService } from './../../../../../core/services/evaluation360-instruments.service';
import { CompetencyUnit } from './../../../../../core/models/competency-unit';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';

@Component({
  selector: 'app-competencies-unit-charge-domain-store',
  templateUrl: './competencies-unit-charge-domain-store.component.html',
  styleUrls: ['./competencies-unit-charge-domain-store.component.scss']
})
export class CompetenciesUnitChargeDomainStoreComponent extends BaseComponent implements OnInit {

  @Input()
  competencyUnit: CompetencyUnit;

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  data: any;

  constructor(private evaluationService: Evaluation360InstrumentsService,
    private route: ActivatedRoute) {
      super();
    this.route.data.subscribe((data) => {
      this.data = data;
    });
  }

  ngOnInit(): void {
    if(!this.competencyUnit.id){
      // Inicializar valores por defecto si es necesario
    }
  }

  compareWith(item1: any, item2: any): boolean {
    return item1 && item2 && item1.id === item2.id;
  }

  async onSubmit(form:NgForm){
    if(form.valid){
      await this.evaluationService.storeCompetencyUnit(this.competencyUnit);
      this.back();
    }
  }

  back(){
    this.onBack.emit(null);
  }
} 