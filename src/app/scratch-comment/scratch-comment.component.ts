import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { CommentsService } from '../comments.service';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-scratch-comment',
  templateUrl: './scratch-comment.component.html',
  styleUrls: ['./scratch-comment.component.css']
})
export class ScratchCommentComponent implements OnInit {

  public itemsArray = [];
  public answerFormatExplicit = '';
  public itemName = '';
  public answerFormat = [
    { id: 'checkbox', name: 'Checkbox (i.e. Yes/No, Present/Not Present)' },
    { id: 'multiple', name: 'Multiple Choices (i.e. Checkboxes)' },
    { id: 'date', name: 'Date' },
    { id: 'number', name: 'Number' },
    { id: 'numericrange', name: 'Numeric Range' },
    { id: 'signture', name: 'Signature' },
    { id: 'text', name: 'Text' }
  ];
  newCommentForm: FormGroup;

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

  getItems() {
    this.itemsService.getItems(this.getCookie('access_token')).subscribe(data => {
      if (data.error) {
        const message = data.message.toString() || String(data.message);
        this.matSnackBar.open(message, 'close');
      } else {
        data.message.forEach((item) => {
          this.itemsArray.push(item);
        });
      }
    });
  }

  // tslint:disable-next-line:max-line-length
  constructor(private itemsService: ItemsService, private cf: FormBuilder, private matDialog: MatDialog, private matSnackBar: MatSnackBar, private commentsService: CommentsService) { }

  ngOnInit() {
    this.newCommentForm = this.cf.group({
      commentName: ['', [
        Validators.required
      ]],
      itemName: ['', [
        Validators.required
      ]],
      answerFormat: ['', [
        Validators.required
      ]],
      multiplebox: [''],
      numberbox: [''],
      location: ['', [
        Validators.required
      ]],
      defaultText: ['']
    });
    this.getItems();
  }

  public setAnswerFormat($e) {
    this.answerFormatExplicit = $e.value;
  }

  public setCommentName($e) {
    this.itemsArray.map((i) => {
      if (i._id === $e.value) {
        this.itemName = i.itemName;
      }
    });
  }

  pushNewComment() {
    const val = this.newCommentForm.value;
    if (this.newCommentForm.valid) {
      let temp = val.itemName;
      val.itemName = this.itemName;
      val.itemId = temp;
      this.commentsService.createComment(this.getCookie('access_token'), val).subscribe(data => {
        if (!data.error) {
          this.newCommentForm.reset();
          this.matSnackBar.open('Your comment has been saved', 'close');
        } else {
          this.matSnackBar.open('An error occured while saving the new comment', 'close');
        }
      });
    } else {
      this.matSnackBar.open('Please input all of the fields, correctly', 'close');
    }
  }

}
