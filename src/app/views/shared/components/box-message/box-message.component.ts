import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-box-message',
  templateUrl: './box-message.component.html',
  styleUrls: ['./box-message.component.scss']
})
export class BoxMessageComponent implements OnInit {

  @Input()
  title:string;

  @Input()
  subtitle:string;

  @Input()
  image:string;

  constructor() { }

  ngOnInit(): void {
  }

}
