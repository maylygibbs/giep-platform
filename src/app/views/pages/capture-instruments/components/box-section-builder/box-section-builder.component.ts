import { Section } from './../../../../../core/models/section';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from './../../../../../core/models/question';

@Component({
  selector: 'app-box-section-builder',
  templateUrl: './box-section-builder.component.html',
  styleUrls: ['./box-section-builder.component.scss']
})
export class BoxSectionBuilderComponent implements OnInit {

  @Input()
  section: Section;

  @Input()
  byCategory:boolean;

  @Output()
  onDeleteSection: EventEmitter<Section> = new EventEmitter<Section>();

  constructor() { }

  ngOnInit(): void {
  }


  deleteSection(section:Section){
    this.onDeleteSection.emit(section);
  }

  addQuestion(){ 
    const question = new Question();
    
    if (!this.section.questions) {
      this.section.questions = new Array<Question>();
    }
    question.order = this.section.questions.length + 1;
    question.isReady = false;
    this.section.questions.push(question);    
  }

  deleteQuestion(question:Question){
    this.section.questions = this.section.questions.filter((item)=>item.order != question.order);
    if(this.section.questions && this.section.questions.length >0){
      this.section.questions.forEach((questionItem:Question, index:number)=>{
        questionItem.order = index + 1;
      });
    }
  }

}
