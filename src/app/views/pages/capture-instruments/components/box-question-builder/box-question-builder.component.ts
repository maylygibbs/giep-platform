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

  constructor() { }

  ngOnInit(): void {
  }

  addQuestion(){ 
  }

}
