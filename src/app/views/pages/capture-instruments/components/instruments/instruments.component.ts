import { environment } from './../../../../../../environments/environment';
import { Section } from './../../../../../core/models/section';
import { Instrument } from './../../../../../core/models/instrument';
import { PaginationResponse } from './../../../../../core/models/pagination-response';
import { InstrumentsService } from './../../../../../core/services/instruments.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.scss']
})
export class InstrumentsComponent extends BaseComponent implements OnInit {

  step: number = 1;
  instruments: PaginationResponse;

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;


  totalItems: number;
  page: number = 1;
  previousPage: number;
  showPagination: boolean;


  selectedItem: Instrument;
  word: string;

  environment = environment;

  private $eventNavigationEnd: Subscription;

  constructor(private instrumentsService: InstrumentsService,
    private router: Router) {
    super();
  }

  async ngOnInit() {
    this.instruments = await this.instrumentsService.getInstrumentsPagined({ page: environment.paginator.default_page, rowByPage: environment.paginator.row_per_page, word: null });
    this.$eventNavigationEnd = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.step = 1;
      this.loadPage(environment.paginator.default_page);
    });
  }

  async loadPage(pageInfo: any) {
    console.log('pageInfo', pageInfo);
    this.page = pageInfo;
    this.instruments = null;
    this.instruments = await this.instrumentsService.getInstrumentsPagined({ page: this.page, rowByPage: environment.paginator.row_per_page, word: this.word ? this.word : null });
  }

  create() {
    this.selectedItem = new Instrument();
    this.selectedItem.sections = new Array<Section>();
    const section = new Section();
    section.numberSection = 1;
    this.selectedItem.sections.push(section)
    this.next();
  }

  async select(id: number) {
    this.selectedItem = await this.instrumentsService.getInstrumentsByIdForUpdate(id);
    this.next();
  }

  /**
   * clone instrument
   */
  async clone(id: number) {
    await this.instrumentsService.clone(id);
    this.loadPage(this.page);
  }

  /**
 * delete instrument
 */
  async delete(id: number) {
    await this.instrumentsService.deleteInstrument(id);
    this.loadPage(this.page);
  }

  next() {
    this.step++;
  }

  back(item: any) {
    this.selectedItem = item;
    this.step--;
    this.loadPage(this.page);
  }

  search() {
    if (this.word && this.word.length > 0) {
      this.loadPage(environment.paginator.default_page);
    }
  }

  async publishIntrument(instrument: Instrument) {
    await this.instrumentsService.publishInstrument(instrument.id, { publicar: instrument.isPublished ? 1 : 0 });
    this.loadPage(this.page);
  }

  ngOnDestroy() {
    if (this.$eventNavigationEnd) {
      this.$eventNavigationEnd.unsubscribe()
    }
  }

}
