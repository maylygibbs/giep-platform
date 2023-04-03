import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailAccountService } from '../../../../../core/services/email-account.service';
import { PaginationResponse } from '../../../../../core/models/pagination-response';
import { environment } from './../../../../../../environments/environment';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  mailboxeHeader : PaginationResponse

  mailboxId:number;

  environment = environment;

  constructor(private route: ActivatedRoute,
    private emailAccountService:EmailAccountService) { 
    this.route.queryParams.subscribe(params => {
      this.mailboxId = params['mailboxId'];

  });
  }

  async ngOnInit() {

    /*this.mailboxeHeader = await this.emailAccountService.getMailboxeHeaderByIdPagined({ 
      page: environment.paginator.default_page, 
      rowByPage: environment.paginator.row_per_page, 
      buzonId: this.mailboxId,
      sort: [
        {
          "direction": "desc"
        },
        {
          "by": "date"
        }
      ] })*/
  }

}
