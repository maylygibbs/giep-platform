import { ActivatedRoute } from '@angular/router';
import { SelectOption } from './../../../../../core/models/select-option';
import { CommonsService } from './../../../../../core/services/commons.service';
import { UserService } from './../../../../../core/services/user.service';
import { AuthService } from './../../../../../core/services/auth.service';
import { User } from './../../../../../core/models/user';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CropperPosition, ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseComponent implements OnInit {

  @ViewChild('inputAvatar')
  inputAvatar: ElementRef<HTMLInputElement>;

  @ViewChild('avatar')
  avatar: ElementRef<HTMLInputElement>;

  imageCropper: ImageCropperComponent;

  user: User;

  tab: string = 'about';


  date: Date = new Date();
  data: any;
  states: Array<SelectOption>;
  cities: Array<SelectOption>;

  imageChangedEvent: any = '';
  lastCropperPosition: CropperPosition;
  lastCroppedImage: any;

  //Subcription
  user$: Subscription;

  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private userService: UserService,
    private modalService: NgbModal,
    private commonsService: CommonsService) {
      super();
    this.route.data.subscribe((data) => {
      this.data = data;
    });
  }

  ngOnInit(): void {

    this.user$ = this.authService.currentUser$.subscribe((user: User) => {
      this.user = user ? user : this.authService.currentUser;
      console.log(this.user)
    });
  }

  selectTab(tab: string) {
    
    this.tab = tab;
    if (!this.user.socialNetwork) {
      this.user.socialNetwork = new Array<SelectOption>();
      this.data.networks.forEach((net: SelectOption) => {
        this.user.socialNetwork.push({ idTipo: parseInt(net.value), label: net.label, networkDir: null });
      });

    } else {
      const arrayTemp = this.user.socialNetwork;
      this.user.socialNetwork = [];
      this.data.networks.forEach((net: SelectOption) => { 
        this.user.socialNetwork.push({ idTipo: parseInt(net.value), label: net.label, networkDir: null });
      });
      arrayTemp.forEach(element1 => {
        this.user.socialNetwork.forEach(element2 => {
          if (element1.idTipo == element2.idTipo) {
            element2.networkDir = element1.networkDir
          }          
        });
      });
    }
  }



  preUploadAvatar() {
    this.inputAvatar.nativeElement.click();
  }

  async uploadAvatar(file: File) {
    
    console.log('avatar', file);
    if (file) {
      this.avatar.nativeElement.src = URL.createObjectURL(file)
      const formData = new FormData();
      formData.append("photo", file);
      const upload$ = await this.userService.uploadAvatar(formData);
      await this.userService.getInfoUser();

    }
  }

  async onChangeCountry(event: any) {
    console.log('country', this.user.country);
    this.states = await this.commonsService.getAllStates(this.user.country.id);

  }

  async onChangeStates(event: any) {
    console.log('state', this.user.state);
    this.cities = await this.commonsService.getAllCities(this.user.state.id);

  }

  async onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('user', this.user)
      console.log('post user', User.mapForEditProfile(this.user));
      await this.userService.updateProfile(User.mapForEditProfile(this.user));
      await this.userService.getInfoUser();
      this.tab = 'about';
    }

  }

  /**
   * Event change input file
   * @param event 
   * @param content 
   */
  fileChangeEvent(event: any, content: TemplateRef<any>): void {
    this.imageChangedEvent = event;
    this.modalService.open(content, {centered: true}).result.then((result) => {
      console.log("Modal closed" + result);

    }).catch((res) => {});
    
  }

  /**
   * Event image cropped
   * @param event 
   * @param content 
   */
  imageCropped(event: ImageCroppedEvent) {
    console.log('cropped', event);
    this.lastCroppedImage = event.base64;
    this.user.avatar = this.lastCroppedImage;
    this.uploadAvatar(this.convertBase64ToFile(this.lastCroppedImage, "avatar"));
  }

    /**
   * Event load file failed
   * @param event 
   * @param content 
   */
  loadImageFailed() {
    /* show message */
  }

  /**
   * 
   */
  crop(imageCropper:ImageCropperComponent){
    imageCropper.crop();
    this.modalService.dismissAll();
  }

  ngOnDestroy() {
    if (this.user$) {
      this.user$.unsubscribe();
    }
  }

}
