import { InstrumentsService } from './../../../../../core/services/instruments.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-by-counter',
  templateUrl: './by-counter.component.html',
  styleUrls: ['./by-counter.component.scss']
})
export class ByCounterComponent implements OnInit {

  results:any;
  instrumentName:string;

  constructor(private route: ActivatedRoute,
    private instrumentsService: InstrumentsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async(params)=>{
      this.instrumentName = params.name;
      this.results = await this.instrumentsService.getIntrumentResultByCounter(params.id);
     });
  }

}
