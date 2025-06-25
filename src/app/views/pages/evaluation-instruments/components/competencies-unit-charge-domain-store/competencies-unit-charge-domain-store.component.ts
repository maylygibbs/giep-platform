import { Evaluation360InstrumentsService } from './../../../../../core/services/evaluation360-instruments.service';
import { SelectOption } from './../../../../../core/models/select-option';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { CompetencyUnit } from './../../../../../core/models/competency-unit';
import { ChargeDomainLevelPriority } from './../../../../../core/models/charge-domainlevel-priority';
import { DocumentService } from './../../../../../core/services/document.service';

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

  // Niveles dinámicos de estructura organizativa
  estructuraNiveles: Array<{ idSeleccionado: any, opciones: SelectOption[] }> = [];

  constructor(private evaluationService: Evaluation360InstrumentsService,
    private documentService: DocumentService,
    private route: ActivatedRoute) {
      super();
    this.route.data.subscribe((data) => {
      this.data = data;
    });
  }

  ngOnInit(): void {
    if(!this.competencyUnit.id){
      // Inicializar el array de cargos con sus dominios y prioridades
      this.competencyUnit = new CompetencyUnit();
      this.competencyUnit.chargesDomainLevelPriority = this.data.charges.map(charge => {
        const chargeDomainLevelPriority = new ChargeDomainLevelPriority();
        chargeDomainLevelPriority.charge = charge;
        chargeDomainLevelPriority.domainLevel = null;
        chargeDomainLevelPriority.priority = null;
        return chargeDomainLevelPriority;
      });
    } else {
      // Si es edición y tiene niveles predefinidos, cargarlos
      if (this.competencyUnit.niveles && this.competencyUnit.niveles.length > 0) {
        this.cargarNivelesPredefinidos();
      }
    }
  }

  /**
   * Carga los niveles predefinidos en el array estructuraNiveles
   */
  private async cargarNivelesPredefinidos() {
    // Limpiar niveles existentes
    this.estructuraNiveles = [];

    // Cargar cada nivel predefinido
    for (let i = 0; i < this.competencyUnit.niveles.length; i++) {
      const nivel = this.competencyUnit.niveles[i];
      let nivelSeleccionado;
      if(this.competencyUnit.niveles[i+1]){
        nivelSeleccionado = this.competencyUnit.niveles[i+1];
      }
      console.log(`nivel ${i} >>>>>>>>`, nivel);
      // Si no es el último nivel, obtener las opciones para el siguiente nivel
      if ( i < this.competencyUnit.niveles.length - 1) {
        console.log('Llamada de getEstructuraOrganizativaList');
        const opciones = await this.documentService.getEstructuraOrganizativaList(nivel.id);
        this.estructuraNiveles.push({
          idSeleccionado: +nivelSeleccionado.value,
          opciones: opciones || []
        });
      } else {
        // Para el último nivel, solo agregar el ID seleccionado
        debugger
        if(nivelSeleccionado){
          this.estructuraNiveles.push({
            idSeleccionado: +nivelSeleccionado.value,
            opciones: []
          });
        }else{
          const opciones = await this.documentService.getEstructuraOrganizativaList(nivel.id);
          this.estructuraNiveles.push({
            idSeleccionado: nivel.id,
            opciones: opciones || []
          });
        }
      }
      console.log(`estructuraNiveles ${i} >>>>>>>>`, this.estructuraNiveles);
    }
  }

  compareWith(item1: any, item2: any): boolean {
    return item1 && item2 && item1.id === item2.id;
  }

  /**
   * Evento change de Unidad (primer select)
   */
  async onUnidadChange(id: any, nivel: number) {
    // Eliminar niveles hijos si existen
    this.estructuraNiveles = this.estructuraNiveles.slice(0, nivel);
    const listado = await this.documentService.getEstructuraOrganizativaList(id);
    if (listado && listado.length > 0) {
      this.estructuraNiveles.push({ idSeleccionado: id, opciones: listado });
    }
  }

  /**
   * Evento change de cualquier select recursivo
   */
  async onEstructuraChange(id: number, nivel: number) {
    // Eliminar niveles hijos si existen
    this.estructuraNiveles = this.estructuraNiveles.slice(0, nivel + 1);
    const listado = await this.documentService.getEstructuraOrganizativaList(id);
    if (listado && listado.length > 0) {
      this.estructuraNiveles.push({ idSeleccionado: id, opciones: listado });
    }
  }

  async onSubmit(form:NgForm){
    if(form.valid){
      console.log('competencyUnit >>>>>>>>', this.competencyUnit);
      await this.evaluationService.storeCompetencyUnit(this.competencyUnit, this.estructuraNiveles);
      this.back();
    }
  }

  back(){
    this.onBack.emit(null);
  }
} 