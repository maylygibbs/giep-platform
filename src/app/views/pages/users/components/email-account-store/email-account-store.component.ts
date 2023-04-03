import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmailAccountService } from '../../../../../core/services/email-account.service';
import { EmailAccount } from '../../../../../core/models/email-account';
import { SelectOption } from '../../../../../core/models/select-option';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-account-store',
  templateUrl: './email-account-store.component.html',
  styleUrls: ['./email-account-store.component.scss']
})
export class EmailAccountStoreComponent implements OnInit {

  @Input()
  account: EmailAccount;

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  accountStatus:boolean;

  data: any;
  showPassword:boolean = false;

  constructor(private emailAccountService: EmailAccountService,
    private route: ActivatedRoute) { 
    this.route.data.subscribe((data) => {
      this.data = data;
    });
  }

  ngOnInit(): void {
    if(!this.account.id){
      this.account.status = new SelectOption('1');
      this.accountStatus = true;
    }else{
      this.accountStatus = this.account.status.value == '1'? true: false;
    }
  }

  /**
 * Handle status change
 * @param event 
 */
  onChangeStatus(event: any) {
    this.account.status = this.accountStatus == true ? new SelectOption('1') : new SelectOption('2');
  }


  /**
* Handle submit form
* @param event 
*/
  async onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('account', this.account)
      console.log('post account', EmailAccount.mapForPost(this.account));
      await this.emailAccountService.storeEmailAccount(EmailAccount.mapForPost(this.account));
      this.back();
    }

  }

  /**
 * Return to back page
 */
  back() {
    this.onBack.emit(null);
  }

}
