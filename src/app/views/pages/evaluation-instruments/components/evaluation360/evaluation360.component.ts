import { Component, OnInit, ViewChild } from '@angular/core';
import { EvaluationInstrumentsService } from '../../../../../core/services/evaluation-instruments.service';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Instrument } from '../../../../../core/models/evaluation-instrument';
import { NgForm } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { Question } from '../../../../../core/models/question';
import { ToastrService } from 'ngx-toastr';
import { TemporaryStorageService } from '../../../../../core/services/temporary-storage.service';

@Component({
  selector: 'app-evaluation360',
  templateUrl: './evaluation360.component.html',
  styleUrls: ['./evaluation360.component.scss']
})
export class Evaluation360Component extends BaseComponent implements OnInit {

  @ViewChild('evaluationForm',{static: false}) evaluationForm: NgForm;

  id: number;
  evaluation: Instrument;
  show: boolean = false;
  sectionActive: number = 0;
  environment = environment;
  submitted: boolean = false;
  formsaved:any;

  constructor(
    private evaluationInstrumentsService: EvaluationInstrumentsService,
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
    this.evaluation = await this.evaluationInstrumentsService.getInstrumentsById(this.id);    
    this.formsaved = this.temporaryStorageService.get(`evaluation${this.evaluation.id}`);  
    
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

  back(item: any) {
    this.router.navigate([`/evaluation-instruments/evaluations/`]);
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
    const currentSection = this.evaluation.sections[this.sectionActive];
    const users = currentSection.users;
    let isValid = true;
    if(users){
      users.forEach((user)=>{
        const question = user.questions.find((question)=> !question.valueResp || question.valueResp == "")
        if(question){
          isValid = false
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
      console.log('evaluation',Instrument.mapForPostResponse(this.evaluation))
      await this.evaluationInstrumentsService.storeUsersEvaluationResponse(Instrument.mapForPostResponse(this.evaluation));
      setTimeout(() => {
        this,this.temporaryStorageService.remove(`evaluation${this.evaluation.id}`);
        this.back(null);
        this.submitted = false;
      }, 500);
    } 
  }


}
