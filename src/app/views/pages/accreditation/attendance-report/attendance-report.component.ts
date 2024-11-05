import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { embedDashboard } from "@superset-ui/embedded-sdk";
import { SupersetService } from '../../../../core/services/superset.service';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent implements OnInit {
  id: string;

  constructor(private route: ActivatedRoute,
    public superSetService: SupersetService) { }

  ngOnInit(): void {

    /*this.route.paramMap.subscribe(params => {

      console.log(this.id); // Aquí puedes usar el valor del parámetro `id`
    });*/

    this.id = 'b7a01335-f912-4313-9f2d-d6891ebf0d83';

    this.getSupersetDashboard(this.id)

  }



  async fetchTokenFromBackend() {
    //return await this.superSetService.getTokenPublic();
  }

  async fetchGuestTokenFromBackend(token, id) {
    //return await this.superSetService.getGuestTokenPublic(token,id);
  }


  async getSupersetDashboard(id: any) {

    const data: any = (await this.superSetService.getTokenPublic()).subscribe(async (resp: any) => {
      console.log("Token 1", resp);
      if (resp.access_token) {
        (await this.superSetService.getGuestTokenPublic(resp.access_token, id)).subscribe((dataSecondToken: any) => {
          console.log("Token 2", dataSecondToken);

          if (dataSecondToken && dataSecondToken.token) {
            const dashboardContainer = document.getElementById(id);
            if (dashboardContainer) {
              embedDashboard({
                id: id, // given by the Superset embedding UI
                supersetDomain: "https://psuperset.pafar.com.ve",
                mountPoint: dashboardContainer, // any html element that can contain an iframe
                fetchGuestToken: async () => dataSecondToken.token,
                dashboardUiConfig: { hideTitle: true, hideChartControls: false }, // dashboard UI config: hideTitle, hideTab, hideChartControls (optional)
              });
            }

          }

        });


      }
    });

  }


}
