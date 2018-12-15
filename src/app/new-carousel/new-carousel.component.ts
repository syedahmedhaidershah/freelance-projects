import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InappService } from '../inapp.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';

let pushCarouselButton = null;

@Component({
  selector: 'app-new-carousel',
  templateUrl: './new-carousel.component.html',
  styleUrls: ['./new-carousel.component.css']
})
export class NewCarouselComponent implements OnInit {

  public addCarouselForm: FormGroup;

  public fileReader = new FileReader();
  public imageBuffer = null;
  public imageFile = null;
  public imageSet = true;
  public nameSet = true;

  // tslint:disable-next-line:max-line-length
  constructor(private dialogRef: MatDialogRef<NewCarouselComponent>, private cn: FormBuilder, private inapp: InappService, private snackBar: MatSnackBar) { }

  gebi(id) {
    return document.getElementById(id);
  }

  ngOnInit() {
    this.addCarouselForm = this.cn.group({
      name: ['', [
        Validators.required
      ]],
      image: ['', [
        Validators.required
      ]]
    });
    pushCarouselButton = this.gebi('pushCarouselButton');
    this.fileReader.addEventListener('load', function () {
      this.imageSet = false;
      this.imageBuffer = this.fileReader.result;
    }.bind(this), false);
  }

  public getCookie(name: string) {
    const ca: Array<string> = document.cookie.split(';');
    const caLen: number = ca.length;
    const cookieName = `${name}=`;
    let c: string;

    for (let i = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  pushCarousel() {
    const useVal = this.addCarouselForm.value;
    useVal.token = this.getCookie('token');
    useVal.datetime = this.getCookie('datetime');
    useVal.image = this.imageBuffer;
    this.inapp.pushCarousel(useVal.name, useVal.image, useVal.token, useVal.datetime).subscribe(data => {
      if (!data.error) {
        this.dialogRef.close();
        this.snackBar.open(data.message, 'close');
      } else {
        window.alert(data.message);
      }
    });
  }

  saveImageToBuffer() {
    const file = (<HTMLInputElement>this.gebi('image')).files[0];
    this.fileReader.readAsDataURL(file);
  }

  setName($e) {
    if ($e.target.value !== '') {
      this.nameSet = false;
    } else {
      this.nameSet = true;
    }
  }
}
