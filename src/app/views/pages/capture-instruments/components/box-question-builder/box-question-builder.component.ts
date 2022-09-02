import { CommonsService } from './../../../../../core/services/commons.service';
import { SelectOption } from './../../../../../core/models/select-option';
import { Question } from './../../../../../core/models/question';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-box-question-builder',
  templateUrl: './box-question-builder.component.html',
  styleUrls: ['./box-question-builder.component.scss']
})
export class BoxQuestionBuilderComponent implements OnInit {

  @Input()
  question:Question;

  inputsType: Array<SelectOption>;

  constructor(private commonsService: CommonsService) { }

  async ngOnInit() {
    this.inputsType = await this.commonsService.getAllInputsType();
  }

  deleteQuestion(question:Question){
    
  }


  addOption(){
    if (!this.question.options) {
      this.question.options = new Array<SelectOption>()
    }
    this.question.options.push(new SelectOption());
  }

  deleteOption(){}


}
