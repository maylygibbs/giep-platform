import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { EvaluationInstrumentsService } from '../../../../../core/services/evaluation-instruments.service';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Instrument } from '../../../../../core/models/evaluation-instrument';
import { User } from '../../../../../core/models/user';
import { NgForm } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { Question } from '../../../../../core/models/question';
import { ToastrService } from 'ngx-toastr';
import { TemporaryStorageService } from '../../../../../core/services/temporary-storage.service';
import { Evaluation360InstrumentsService } from '../../../../../core/services/evaluation360-instruments.service';

interface Objetivo {
  descripcion: string;
  peso: number | null;
  rango: number | null;
}

@Component({
  selector: 'app-evaluation360',
  templateUrl: './evaluation360.component.html',
  styleUrls: ['./evaluation360.component.scss']
})
export class Evaluation360Component extends BaseComponent implements OnInit {

  @Input() user: User;
  @Input()evaluation: Instrument;

  @ViewChild('evaluationForm',{static: false}) evaluationForm: NgForm;

  id: number;
  

  show: boolean = false;
  sectionActive: number = 0;
  environment = environment;
  submitted: boolean = false;
  formsaved:any;
  objetivos: Objetivo[] = [];

  constructor(
    private evaluationInstrumentsService: Evaluation360InstrumentsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private temporaryStorageService: TemporaryStorageService
  ) {
    super();
    this.route.paramMap
    this.route.params.subscribe((params) => {
      console.log('params', params);
      this.id = +params.id;
    })
  }


  async ngOnInit() {
    // Si no tenemos el usuario como input, lo obtenemos del almacenamiento temporal
    if (!this.user) {
      this.user = await this.temporaryStorageService.get('selectedUser');
    }
    
    // Si no tenemos la evaluación como input, la obtenemos del almacenamiento temporal
    if (!this.evaluation) {
      this.evaluation = await this.temporaryStorageService.get('evaluationData');
    }
    
    console.log('evaluation', this.evaluation);
    console.log('user', this.user);
    
    // Inicializar con un objetivo por defecto
    if (this.objetivos.length === 0) {
      this.addObjetivo();
    }
    
    // Agregar la sección de objetivos al usuario
    this.addObjetivosSection();
    
    this.formsaved = this.temporaryStorageService.get(`evaluation${this.evaluation.id}`);
    console.log('this.formsaved',this.formsaved)
  }

  /**
 * Prepare init answere
 */
  initAnswerEvaluation() {
    this.show = true;    
    if(this.formsaved){
      this.pathFormValue(this.formsaved);
    }
  }

  pathFormValue(formsaved:any){
    console.log('evaluationForm', this.evaluationForm);
    Object.entries(formsaved).forEach(([key, value]) => {
      this.evaluationForm.controls[key].setValue(value);
    });
  }

  back(id: any) {
    this.router.navigate([`/evaluation-instruments-360/users_to_evaluate/${id}`]);    
  }

  onChangeCheckbox(event: any, question: Question, optionId: string) {
    console.log(event)
    if (!question.valueResp) {
      question.valueResp = [];
    }
    if (event.target.checked) {
      question.valueResp.push(optionId);
    } else {
      question.valueResp = question.valueResp.filter((item) => item != optionId);
    }
  }

  /**
   * Agregar nuevo objetivo
   */
  addObjetivo() {
    this.objetivos.push({
      descripcion: '',
      peso: null,
      rango: null
    } as Objetivo);
  }

  /**
   * Agregar sección de objetivos al usuario
   */
  addObjetivosSection() {
    // Crear la sección de objetivos (solo datos principales)
    const objetivosSection = {
      id: 'objetivos-section',
      name: 'Evaluación de Objetivos',
      numberSection: this.user.sections.length + 1
    };
    
    // Agregar la sección al usuario
    (this.user.sections as any).push(objetivosSection);
  }

  /**
   * Eliminar objetivo
   */
  removeObjetivo(index: number) {
    this.objetivos.splice(index, 1);
  }

  /**
   * Validar sección de objetivos
   */
  validateObjetivos(): boolean {
    if (this.objetivos.length === 0) {
      return false;
    }
    
    return this.objetivos.every(objetivo => 
      objetivo.descripcion && 
      objetivo.descripcion.trim() !== '' && 
      objetivo.peso !== null && 
      objetivo.peso >= 0 && 
      objetivo.peso <= 100 && 
      objetivo.rango !== null
    );
  }

  /**
   * Go to next section
   */
  nextSection(form: NgForm) {
    console.log('evaluation 2', this.evaluation)
    if(this.validateSection()){
      this.evaluationForm.form.markAsUntouched()
      this.sectionActive++;
    }else{
      this.evaluationForm.form.markAllAsTouched();
      this.toastrService.error('Debe responder las preguntas que son obligatorias antes de pasar a la siguiente Sección!')
    }
   }

  /**
   * Go to back section
   */
  backSection() {
    this.sectionActive--;
  }

  validateSection():boolean{
    const currentSection = this.user.sections[this.sectionActive];
    
    // Si estamos en la sección de objetivos
    if (currentSection.id === 'objetivos-section') {
      return this.validateObjetivos();
    }
    
    // Validación para secciones normales
    const questions = currentSection.questions;
    let isValid = true;
    
    if(questions){
      questions.forEach((question)=>{
        if(question.required && (!question.valueResp || question.valueResp == "" || question.valueResp.length === 0)){
          isValid = false;
          return;
        }
      })
    }
    return isValid;
  }


  autoSave(form: NgForm){
    this.temporaryStorageService.set(`evaluation${this.evaluation.id}`, form.value);
  }

  /**
 * stores user responses
 * @param form 
 */
  async onSubmit(form: NgForm) {
    if (form.valid) {
      this.submitted = true;
      
      // Agregar los objetivos al usuario antes de enviar
      if (this.objetivos && this.objetivos.length > 0) {
        // Usar una propiedad dinámica para evitar errores de tipos
        Object.assign(this.user, { objetivos: this.objetivos });
      }
      
      console.log('evaluation de usuarios', Instrument.mapForPostResponseByUser(this.user, +this.evaluation.id))
      //await this.evaluationInstrumentsService.storeUsersEvaluationResponse(Instrument.mapForPostResponse(this.evaluation));
      setTimeout(() => {
        this.temporaryStorageService.remove(`evaluation${this.evaluation.id}`);
        this.back(this.evaluation.id);
        this.submitted = false;
      }, 500);
    } 
  }


}
