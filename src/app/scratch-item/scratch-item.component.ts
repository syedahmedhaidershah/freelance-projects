import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SectionsService } from '../sections.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-scratch-item',
  templateUrl: './scratch-item.component.html',
  styleUrls: ['./scratch-item.component.css']
})
export class ScratchItemComponent implements OnInit {

  sectionId;
  sectionsArray = [];
  public incluseionTypes = [
    { id: 'included', name: 'Included in every report' },
    { id: 'optional', name: 'Optional - add on per-report basis' }
  ];

  newItemForm: FormGroup;

  private inclusion;

  public gebi(id) {
    const el = (<HTMLInputElement>document.getElementById(id));
    return el;
  }

  public gebiv(id) {
    const el = (<HTMLInputElement>document.getElementById(id));
    return el.value;
  }

  private getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  getSections() {
    this.sectionsSevice.getSections(this.getCookie('access_token')).subscribe(data => {
      if (data.error) {
        const message = data.message.toString() || String(data.message);
        this.matSnackBar.open(message, 'close');
      } else {
        data.message.forEach((section) => {
          this.sectionsArray.push(section);
        });
      }
    });
  }

  // tslint:disable-next-line:max-line-length
  constructor(private sectionsSevice: SectionsService, private itemf: FormBuilder, private matDialog: MatDialog, private matSnackBar: MatSnackBar, private itemsService: ItemsService) { }

  ngOnInit() {
    this.newItemForm = this.itemf.group({
      itemName: ['', [
        Validators.required
      ]],
      sectionName: ['', [
        Validators.required
      ]],
      inclusion: ['', [
        Validators.required
      ]],
      reminders: ['']
    });
    this.getSections()
  }

  private setItemName($e) {
    this.sectionId = $e.value;
  }

  private setInclusion($e) {
    this.inclusion = $e.value;
  }

  private pushNewItem() {
    if (this.newItemForm.valid) {
      const val = this.newItemForm.value;
      val.sectionId = this.sectionId;
      this.itemsService.createItem(this.getCookie('access_token'), val).subscribe((data) => {
        if (!data.error) {
          this.newItemForm.reset();
          this.matSnackBar.open('Your item has been saved', 'close');
        } else {
          this.matSnackBar.open('An error occured while saving the new item', 'close');
        }
      });
    } else {
      this.matSnackBar.open('Please input all of the fields correctly', 'close');
    }
  }

}
