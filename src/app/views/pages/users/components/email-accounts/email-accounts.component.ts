import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmailAccount } from '../../../../../core/models/email-account';
import { environment } from '../../../../../../environments/environment';
import { PaginationResponse } from '../../../../../core/models/pagination-response';
import { EmailAccountService } from '../../../../../core/services/email-account.service';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-email-accounts',
  templateUrl: './email-accounts.component.html',
  styleUrls: ['./email-accounts.component.scss']
})
export class EmailAccountsComponent extends BaseComponent implements OnInit {


  step: number = 1;
  accounts: PaginationResponse;

  loadingIndicator = true;

  selectedItem: EmailAccount;
  word: string;

  totalItems: number;
  page: number = 1;
  previousPage: number;
  showPagination: boolean;
  action: string;

  environment = environment;

  accountsRequest: NodeJS.Timeout;

  constructor(private emailAccountService: EmailAccountService,
    protected modalService: NgbModal,) {
    super();
  }

  async ngOnInit() {
    this.accounts = await this.emailAccountService.getEmailAccountsPagined({ page: environment.paginator.default_page, rowByPage: environment.paginator.row_per_page, word: null });
  }

  async loadPage(pageInfo: any) {
    console.log('pageInfo', pageInfo);
    this.page = pageInfo;
    this.accounts = null;
    this.accounts = await this.emailAccountService.getEmailAccountsPagined({ page: this.page, rowByPage: environment.paginator.row_per_page, word: this.word ? this.word : null });
  }

  /**
   * Create account
   */
  create() {
    this.selectedItem = new EmailAccount();
    this.next();
  }

  /**
 * Delete account by id
 * @param id 
 */
  async delete(id: number) {
    await this.emailAccountService.deleteAccount(id);
    this.loadPage(this.page);
  }

  /**
 * Select user
 * @param id 
 */
  async select(id: number) {
    this.selectedItem = await this.emailAccountService.getEmailAccountById(id);
    this.next();
  }

  /**
  * Handle next step
  */
  next() {
    this.step++;
  }

  /**
   * Handle step to back
   * @param item 
   */
  back(item: any) {
    this.selectedItem = item;
    this.step--;
    this.loadPage(this.page);
  }

  /**
   * search by word
   */
  search() {
    if (this.accountsRequest) {
      clearTimeout(this.accountsRequest);
      this.accountsRequest = null;
    }
    this.accountsRequest = setTimeout(() => {
      this.loadPage(environment.paginator.default_page);
    }, 300);
  }

  /**
   * Confirm delete / publish instrument
   * @param documento 
   */
  confirm(account: EmailAccount, action: string, modalRef?: TemplateRef<any>) {
    this.selectedItem = account;
    this.action = action;
    switch (action) {
      case 'delete':
        this.messageModal = 'Esta seguro que desea eliminar la cuenta de email?';
        break;
    }
    this.modalService.open(modalRef, {}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });

  }

  /**
   * Process event to confirm o not
   * @param result 
   */
  processEvent(result: boolean) {
    if (result) {
      switch (this.action) {
        case 'delete':
          this.delete(parseInt(this.selectedItem.id));
          break;
      }
    }
    this.selectedItem = null;
    this.action = null;
    this.modalService.dismissAll();
  }

}
