import { Component, OnInit } from '@angular/core';
import { EvaluationInstrumentsService } from '../../../../../core/services/evaluation-instruments.service';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Instrument } from 'src/app/core/models/evaluation-instrument';
import { NgForm } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { Question } from '../../../../../core/models/question';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent extends BaseComponent implements OnInit {

  id: number;
  evaluation: Instrument;
  show: boolean = false;
  sectionActive: number = 0;
  environment = environment;
  submitted: boolean = false;

  constructor(
    private evaluationInstrumentsService: EvaluationInstrumentsService,
    private route: ActivatedRoute,
    private router: Router
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
  }

  /**
 * Prepare init answere
 */
  initAnswerEvaluation() {
    this.show = true;
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
  nextSection() {
    this.sectionActive++;
  }

  /**
   * Go to back section
   */
  backSection() {
    this.sectionActive--;
  }

  /**
 * stores user responses
 * @param form 
 */
  async onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('form',form.value)
      console.log('evaluation',this.evaluation)
    } else {

    }
  }

}
