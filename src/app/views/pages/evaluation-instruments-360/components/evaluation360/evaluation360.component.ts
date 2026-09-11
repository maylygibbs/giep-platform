import { Component, OnInit, ViewChild, Input } from '@angular/core';
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

interface Evaluation360Draft {
  sectionActive: number;
  objetivos: Objetivo[];
  answers: { [questionId: string]: any };
}

@Component({
  selector: 'app-evaluation360',
  templateUrl: './evaluation360.component.html',
  styleUrls: ['./evaluation360.component.scss']
})
export class Evaluation360Component extends BaseComponent implements OnInit {

  @Input() user: User;
  @Input() evaluation: Instrument;

  @ViewChild('evaluationForm',{static: false}) evaluationForm: NgForm;

  id: number;
  

  show: boolean = false;
  sectionActive: number = 0;
  environment = environment;
  submitted: boolean = false;
  formsaved: Evaluation360Draft | null = null;
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

  /** Clave localStorage: instrumento + usuario evaluado */
  private getDraftKey(): string {
    return `evaluation360_${this.evaluation?.id}_${this.user?.id}`;
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
    
    this.formsaved = await this.temporaryStorageService.get(this.getDraftKey());
    console.log('this.formsaved', this.formsaved);
  }

  /**
 * Prepare init answere
 */
  initAnswerEvaluation() {
    this.show = true;
    if (this.formsaved) {
      // Esperar a que el form exista en el DOM
      setTimeout(() => this.restoreDraft(this.formsaved), 0);
    }
  }

  private restoreDraft(draft: Evaluation360Draft) {
    if (!draft) {
      return;
    }
    if (draft.objetivos && draft.objetivos.length > 0) {
      this.objetivos = draft.objetivos.map((o) => ({
        descripcion: o.descripcion || '',
        peso: o.peso != null ? Number(o.peso) : null,
        rango: o.rango != null ? Number(o.rango) : null,
      }));
    }
    if (draft.answers && this.user?.sections) {
      this.user.sections.forEach((section) => {
        if (!section?.questions) {
          return;
        }
        section.questions.forEach((question: Question) => {
          const key = String(question.id);
          if (draft.answers[key] !== undefined) {
            question.valueResp = draft.answers[key];
          }
        });
      });
    }
    if (draft.sectionActive != null && draft.sectionActive >= 0) {
      this.sectionActive = draft.sectionActive;
    }
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
    this.autoSave();
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
    if (!this.user?.sections) {
      return;
    }
    const already = this.user.sections.some((s: any) => s.id === 'objetivos-section');
    if (already) {
      return;
    }
    const objetivosSection = {
      id: 'objetivos-section',
      name: 'Evaluación de Objetivos',
      numberSection: this.user.sections.length + 1
    };
    
    (this.user.sections as any).push(objetivosSection);
  }

  /**
   * Eliminar objetivo
   */
  removeObjetivo(index: number) {
    this.objetivos.splice(index, 1);
    this.autoSave();
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
      this.autoSave();
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
    this.autoSave();
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


  /** Guarda borrador parcial en localStorage (instrumento + usuario evaluado). */
  autoSave(_form?: NgForm) {
    if (!this.evaluation?.id || !this.user?.id) {
      return;
    }
    const answers: { [questionId: string]: any } = {};
    (this.user.sections || []).forEach((section) => {
      if (!section?.questions) {
        return;
      }
      section.questions.forEach((question: Question) => {
        if (question.valueResp !== undefined && question.valueResp !== null && question.valueResp !== '') {
          answers[String(question.id)] = question.valueResp;
        }
      });
    });
    const draft: Evaluation360Draft = {
      sectionActive: this.sectionActive,
      objetivos: this.objetivos,
      answers,
    };
    this.temporaryStorageService.set(this.getDraftKey(), draft);
  }

  /**
 * stores user responses
 * @param form 
 */
  async onSubmit(form: NgForm) {
    if (!form.valid || !this.validateSection()) {
      form.form.markAllAsTouched();
      this.toastrService.error('Complete las preguntas obligatorias antes de guardar.');
      return;
    }

    this.submitted = true;

    // TODO ODIS: reactivar cuando se implemente el envío de objetivos
    // if (this.objetivos && this.objetivos.length > 0) {
    //   Object.assign(this.user, { objetivos: this.objetivos });
    // }

    const payload = Instrument.mapForPostResponseByUser(this.user, +this.evaluation.id);
    const ok = await this.evaluationInstrumentsService.storeUsersEvaluationResponse(payload);

    if (ok) {
      this.temporaryStorageService.remove(this.getDraftKey());
      // Limpia clave legacy si existía
      this.temporaryStorageService.remove(`evaluation${this.evaluation.id}`);
      this.back(this.evaluation.id);
    }
    this.submitted = false;
  }


}
