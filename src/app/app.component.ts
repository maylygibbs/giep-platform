import { environment } from './../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ChildActivationEnd, Router } from '@angular/router';
import { OnlineStatusService, OnlineStatusType } from "ngx-online-status";
import { filter } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  status: OnlineStatusType = this.onlineStatusService.getStatus(); // get initial status
  title = environment.name_system;
  constructor(public router: Router, 
    private titleService: Title, 
    private onlineStatusService: OnlineStatusService,
    private toastrService: ToastrService) {

    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      if(status == OnlineStatusType.OFFLINE){
        this.toastrService.warning('<span>Sin conexión a internet.</span><i class="feather icon-wifi-off ms-2"></i>','',{enableHtml:true});
      }else{
        this.toastrService.success('<span>Reestablecida conexión a internet.</span><i class="feather icon-wifi ms-2"></i>','',{enableHtml:true});
      };
    });


    this.router.events
        .pipe(filter(event => event instanceof ChildActivationEnd))
        .subscribe(event => {
            let snapshot = (event as ChildActivationEnd).snapshot;
            while (snapshot.firstChild !== null) {
                snapshot = snapshot.firstChild;
            }
            this.titleService.setTitle(snapshot.data.title || this.title);
        });
}

  ngOnInit(): void {}

}
