import { Section } from './../../../../../core/models/section';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from './../../../../../core/models/question';
import { EvaluationInstrumentsService } from '../../../../../core/services/evaluation-instruments.service';
import { Evaluation360InstrumentsService } from '../../../../../core/services/evaluation360-instruments.service';

@Component({
  selector: 'app-box-section-builder',
  templateUrl: './box-section-builder.component.html',
  styleUrls: ['./box-section-builder.component.scss']
})
export class BoxSectionBuilderComponent implements OnInit {

  @Input()
  section: Section;

  @Input()
  byCategory: boolean;

  @Input()
  globalsPoints: boolean;

  @Output()
  onDeleteSection: EventEmitter<Section> = new EventEmitter<Section>();

  constructor(private evaluationInstrumentsService: EvaluationInstrumentsService,
  private evaluationInstrumentsService360: Evaluation360InstrumentsService, //Eliminar, mientras para pruebas
  ) { }

  ngOnInit(): void {
  }


  deleteSection(section: Section) {
    this.onDeleteSection.emit(section);
  }

  addQuestion() {
    const question = new Question();

    if (!this.section.questions) {
      this.section.questions = new Array<Question>();
    }
    question.order = this.section.questions.length + 1;
    question.isReady = false;
    this.section.questions.push(question);
  }

  async deleteQuestion(question: Question) {
    let result: boolean=true;
    if(question.id){
      result = await this.evaluationInstrumentsService360.deleteQuestion(question.id);
    }
    if (result) {
      this.section.questions = this.section.questions.filter((item) => item.order != question.order);

      if (this.section.questions && this.section.questions.length > 0) {
        this.section.questions.forEach((questionItem: Question, index: number) => {
          questionItem.order = index + 1;
        });
      }

    }
  }

}
