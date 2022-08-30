import { InstrumentsService } from './../../../../../core/services/instruments.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-by-questions',
  templateUrl: './by-questions.component.html',
  styleUrls: ['./by-questions.component.scss']
})
export class ByQuestionsComponent implements OnInit {

  results:any;
  instrumentName:string;

  constructor(private route: ActivatedRoute,
    private instrumentsService: InstrumentsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async(params)=>{
      this.instrumentName = params.name;
      this.results = await this.instrumentsService.getInstrumentResultByQuestions(params.id);
     });
  }

}
