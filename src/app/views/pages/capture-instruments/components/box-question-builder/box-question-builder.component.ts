import { QuestionOption } from './../../../../../core/models/question-option';
import { CommonsService } from './../../../../../core/services/commons.service';
import { SelectOption } from './../../../../../core/models/select-option';
import { Question } from './../../../../../core/models/question';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from './../../../../../../environments/environment';

@Component({
  selector: 'app-box-question-builder',
  templateUrl: './box-question-builder.component.html',
  styleUrls: ['./box-question-builder.component.scss']
})
export class BoxQuestionBuilderComponent implements OnInit {

  @Input()
  question:Question;

  @Output()
  onDeleteQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  inputsType: Array<SelectOption>;

  

  environment = environment;

  constructor(private commonsService: CommonsService) { }

  async ngOnInit() {
    this.inputsType = await this.commonsService.getAllInputsType();
  }

  deleteQuestion(question:Question){
    this.onDeleteQuestion.emit(question);
  }

  addOption(){
    if (!this.question.options) {
      this.question.options = new Array<QuestionOption>()
    }
    const option = new QuestionOption();
    const order = this.question.options.length+1;
    option.nameInputLabel = "optionLabel"+order;
    option.nameInputValue = "optionValue"+order;
    option.nameInputScore = "optionScore"+order;
    this.question.options.push(option);
  }

  deleteOption(option: QuestionOption){
    this.question.options = this.question.options.filter((item)=>item.nameInputLabel != option.nameInputLabel);
  }


  readyQuestion(form: NgForm){
    if(form.valid){
      this.question.isReady = true;
    }
    
  }

  questionEdit(){
    this.question.isReady = false;
  }


}
