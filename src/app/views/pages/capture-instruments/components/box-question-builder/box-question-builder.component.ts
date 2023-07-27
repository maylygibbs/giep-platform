import { QuestionOption } from './../../../../../core/models/question-option';
import { CommonsService } from './../../../../../core/services/commons.service';
import { SelectOption } from './../../../../../core/models/select-option';
import { Question } from './../../../../../core/models/question';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from './../../../../../../environments/environment';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { ActivatedRoute } from '@angular/router';
import { InstrumentsService } from '../../../../../core/services/instruments.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-box-question-builder',
  templateUrl: './box-question-builder.component.html',
  styleUrls: ['./box-question-builder.component.scss']
})
export class BoxQuestionBuilderComponent extends BaseComponent implements OnInit, OnChanges {

  @Input()
  byCategory: boolean;

  @Input()
  globalsPoints: boolean;

  @Input()
  question: Question;

  @Output()
  onDeleteQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  selectedOption: QuestionOption;

  categories: Array<SelectOption>;

  environment = environment;

  data: any;

  constructor(private commonsService: CommonsService,
    private instrumentsService: InstrumentsService,
    private route: ActivatedRoute,
    protected modalService: NgbModal) {
    super();

  }

  async ngOnInit() {
    //this.inputsType = await this.commonsService.getAllInputsType();
    this.route.data.subscribe((data) => {
      this.data = data;
      
      if(!this.globalsPoints && this.byCategory){
        this.categories = this.data.categories.filter((item:SelectOption)=>item.haveScales)
      }else{
        this.categories = this.data.categories
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.globalsPoints && this.byCategory){
      this.categories = this.data ? this.data.categories.filter((item:SelectOption)=>item.haveScales) : null
    }else{
      this.categories = this.data ?  this.data.categories : null;
    }
  }

  /**
   * Delete question of instrument
   * @param question 
   */
  deleteQuestion(question: Question) {
    this.onDeleteQuestion.emit(question);
  }

  /**
   * Reset options if change input type
   * @param event 
   */
  onChangeInputType(event: any) {
    console.log('tipo pregunta', this.question.inputType.label)
    this.question.options = null;
  }

  /**
   * Add option to question of type selects options
   */
  addOption() {
    if (!this.question.options) {
      this.question.options = new Array<QuestionOption>()
    }
    const option = new QuestionOption();
    const order = this.question.options.length + 1;
    option.nameInputLabel = "optionLabel" + order;
    option.nameInputValue = "optionValue" + order;
    option.nameInputScore = "optionScore" + order;
    if(!this.globalsPoints){
      option.scoreByCharges = this.data.charges.map((item:SelectOption,index:number)=>{
        return {
          id: item.value,
          label: item.label,
          score: 0,
          nameControlScore: 'controlScoreCharge-'+index
        }
      });
    }
    this.question.options.push(option);
  }

  /**
   * Delete option of question
   * @param option 
   */
  async deleteOption(option: QuestionOption) {
    let result: boolean = true;
    if (option.idOption) {
      result = await this.instrumentsService.deleteOption(option.idOption);
    }
    if (result) {
      this.question.options = this.question.options.filter((item) => item.nameInputLabel != option.nameInputLabel);
    }

  }

  /**
   * Confirm and validation question
   * @param form 
   */
  readyQuestion(form: NgForm) {
    if (form.valid) {
      if (this.isValidQuestion(this.question)) {
        this.question.isReady = true;
      }

    }

  }

  /**
   * Valid if question is valid
   * @param question 
   * @returns 
   */
  isValidQuestion(question: Question) {

    if (question.inputType.label == 'select' || question.inputType.label == 'radio' || question.inputType.label == 'checkbox' || question.inputType.label == 'select-multiple') {
      const busquedaLabel = question.options.reduce((acc, option) => {
        acc[option.label] = ++acc[option.label] || 0;
        return acc;
      }, {});

      const duplicadosLabel = question.options.filter((option) => {
        return busquedaLabel[option.label];
      });
      if (duplicadosLabel.length > 0) {
        this.setInputError('Valide las opciones. Existe opciones duplicadas.');
        return false;
      }

      const busquedaValue = question.options.reduce((acc, option) => {
        acc[option.value] = ++acc[option.value] || 0;
        return acc;
      }, {});

      const duplicadosValue = question.options.filter((option) => {
        return busquedaValue[option.value];
      });
      if (duplicadosValue.length > 0) {
        this.setInputError('Valide los valores de las opciones. Existe valores duplicados.');
        return false;
      }
    }
    return true;
  }

  /**
   * Edit question
   */
  questionEdit() {
    this.question.isReady = false;
  }


  setScoreByCharges(form: NgForm){
    if(form.valid){
      this.closeModal();
    }
   
  }

  resetOptionPointsByCharge(option: QuestionOption){
    option.scoreByCharges.forEach((element:any) => {
      element.score = 0;
    });
  }


  /**
 * Open modal for set points
 * @param modalRef 
 */
  openModalSetPoints(modalRef: TemplateRef<any>, option: QuestionOption) {
    this.selectedOption = option;
    this.modalService.open(modalRef, { size: 'xl' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }

  closeModal() {
    this.modalService.dismissAll();
  }


}
