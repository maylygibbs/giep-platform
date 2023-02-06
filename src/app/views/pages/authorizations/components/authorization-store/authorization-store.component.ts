import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { AuthorizationService } from '../../../../../core/services/authorization.service';
import { Authorization } from '../../../../../core/models/authorization';
import { ActivatedRoute } from '@angular/router';
import { SelectOption } from '../../../../../core/models/select-option';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Apps } from '../../../../../core/models/apps';

@Component({
  selector: 'app-authorization-store',
  templateUrl: './authorization-store.component.html',
  styleUrls: ['./authorization-store.component.scss']
})
export class AuthorizationStoreComponent implements OnInit {

  @Input()
  authorization: Authorization;

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  data: any;

  authorizationStatus: boolean;
  selectedApp: string;

  constructor(private authorizationService: AuthorizationService,
    private route: ActivatedRoute,
    protected modalService: NgbModal) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.data = data;
    });

    if (!this.authorization.id) {
      this.authorization.app = new Apps();
      this.authorization.status = new SelectOption('1');
      this.authorizationStatus = true;
    } else {
      this.authorizationStatus = this.authorization.status.value == '1' ? true : false;

    }
  }


  /**
* Handle event change status
* @param event 
*/
  onChangeStatus(event: any) {
    this.authorization.status = this.authorizationStatus == true ? new SelectOption('1') : new SelectOption('2');
  }


  /**
 * Return to back page
 */
  back() {
    this.onBack.emit(null);
  }

  /**
* Submit form authorization
* @param form 
*/
  async onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('app', this.authorization);
       console.log('app post', Authorization.mapForPost(this.authorization));
       await this.authorizationService.storeAuthorization(Authorization.mapForPost(this.authorization));
       this.back();
    }

  }


}



