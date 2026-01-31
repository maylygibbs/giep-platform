import { Component, OnInit } from '@angular/core';
import { Instrument } from '../../../../../core/models/evaluation-instrument';
import { User } from '../../../../../core/models/user';
import { ToastrService } from 'ngx-toastr';
import { TemporaryStorageService } from '../../../../../core/services/temporary-storage.service';
import { Evaluation360InstrumentsService } from '../../../../../core/services/evaluation360-instruments.service';
import { ActivatedRoute,NavigationEnd, Router } from '@angular/router';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-users-to-evaluate',
  templateUrl: './users-to-evaluate.component.html',
  styleUrls: ['./users-to-evaluate.component.scss']
})
export class UsersToEvaluateComponent extends BaseComponent implements OnInit {


  id: number;
  evaluation: Instrument;
  userSelected: User;
  evaluationSelected: Instrument;
  step: number = 1;
  private $eventNavigationEnd: Subscription;


  constructor(private evaluationInstrumentsService: Evaluation360InstrumentsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private temporaryStorageService: TemporaryStorageService) {
    super();
    this.route.paramMap
    this.route.params.subscribe((params) => {
      console.log('params', params);
      this.id = +params.id;
    });
  }

  async ngOnInit() {    
    this.evaluation = await this.evaluationInstrumentsService.getInstrumentsById(this.id);
    console.log('evaluation', this.evaluation);
    this.$eventNavigationEnd = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
  ).subscribe(() => {
    this.step = 1;
 
  });
  }

  nextStep() {
    this.step++;
  }

  backStep() {
    this.step--;
  }

  back(item: any) {
    this.router.navigate([`/evaluation-instruments-360/evaluations360/`]);
  }

  /**
   * 
   * @param user User to evaluate
   * Link the user to the evaluation instrument and go to the next step
   */
 async evaluateUser(user: any) {
    this.userSelected = user;
    this.evaluationSelected = this.evaluation;
    const data = { userId: this.userSelected.id, instrumentoId: this.evaluationSelected.id };
    const resp = await this.evaluationInstrumentsService.linkUserToInstrument(data);
    console.log('resp', resp);
    if (resp && resp.id) {
      const sections = await this.evaluationInstrumentsService.getInstrumentSections(+this.userSelected.id, +this.evaluationSelected.id);
      this.evaluationSelected.users?.forEach((u) => {
        if (+u.id === +this.userSelected.id) {
          u.sections = sections;
        }
      });
      this.userSelected.sections = sections;
      console.log('sections', sections);
      this.nextStep();
    }
  }

}
