import { Section } from './../../../../../core/models/section';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-box-section-builder',
  templateUrl: './box-section-builder.component.html',
  styleUrls: ['./box-section-builder.component.scss']
})
export class BoxSectionBuilderComponent implements OnInit {

  @Input()
  section: Section;

  @Output()
  onDeleteSection: EventEmitter<Section> = new EventEmitter<Section>();

  constructor() { }

  ngOnInit(): void {
  }


  deleteSection(section:Section){
    this.onDeleteSection.emit(section);
  }

  addQuestion(){ 
  }


}
