import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  urlParams: any = {
    message: 'Loading ...'
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router,
    private messges: MessagesService
  ) { }

  ngOnInit() {
    this.setParams();
    this.messges.loadedState(['ordersuccess'])
  }

  setParams() {
    this.activatedRoute.queryParams.subscribe(params => {
      //  REMOVE AFTER DEV ///////////////////////////////////////////////////////////////////////////////////////////
      // params = {examId: '5da9ff1995fd263dccb11bf6'};
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      if (Object.keys(params).length === 0) {
        this.snackbar.open('Session expired, the form has been destroyed, routing back to exams page', 'close')
          ._dismissAfter(3000);
        this.router.navigate(['/']);
      }
      this.urlParams.message = decodeURI(params.message);
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
