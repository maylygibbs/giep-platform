import { Component, OnInit } from '@angular/core';
import { NgbActiveModal,NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
//import { UserModel } from 'src/app/models/user-model';
import { Spring } from '../../../../../../core/models/spring';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { UsersServiceService } from 'src/app/services/users-service.service';
import { SpringService } from 'src/app/core/services/spring.service';
const now = new Date();
@Component({
  selector: 'app-newspring',
  templateUrl: './newspring.component.html',
  styleUrls: ['./newspring.component.scss']
})
export class NewspringComponent implements OnInit {
  selectedSpring: Spring;
  editForm: FormGroup;
  isLoading = false;

  minDate1: NgbDateStruct = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};

  constructor(public modal: NgbActiveModal, private route: ActivatedRoute,private springService: SpringService,private formBuilder: FormBuilder, private router: Router) 
  {

   }

  ngOnInit(): void {
    this.setForm()
  }
  onSubmit() {

  }
  private setForm() {
    console.log(this.selectedSpring);
    this.editForm = this.formBuilder.group({
      id: [this.selectedSpring.id],
      startDate: [this.selectedSpring.startDate, Validators.required],
      endDate: [this.selectedSpring.endDate, Validators.required],
      iteration: [this.selectedSpring.iteration, Validators.required]
    });
  }

}
