import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SectionsService } from '../sections.service';
import { MatDialog } from '@angular/material/dialog';
import { IconsComponent } from '../icons/icons.component';

@Component({
  selector: 'app-scratch-section',
  templateUrl: './scratch-section.component.html',
  styleUrls: ['./scratch-section.component.css']
})
export class ScratchSectionComponent implements OnInit {

  public incluseionTypes = [
    { id: 'included', name: 'Included in every report' },
    { id: 'optional', name: 'Optional - add on per-report basis' }
  ];

  newSectionForm: FormGroup;

  constructor(private sectionsSevice: SectionsService, private sf: FormBuilder, private matDialog: MatDialog) { }

  ngOnInit() {
    this.newSectionForm = this.sf.group({
      sectionName: ['', [
        Validators.required
      ]],
      templateName: ['', [
        Validators.required
      ]],
      inclusion: ['', [
        Validators.required
      ]],
      icon: [''],
      notes: ['']
    });
  }

  chooseIcon() {
    this.matDialog.open(IconsComponent, {
      height: '30%',
      width: '70%'
    });
  }

}
