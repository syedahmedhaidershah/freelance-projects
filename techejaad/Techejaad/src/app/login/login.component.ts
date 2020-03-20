import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MessagesService } from '../messages.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { takeUntil, startWith, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ItemsService } from '../items.service';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('listInp', { static: true }) listInp: ElementRef;

  itemsArr = [];
  itemsObs: Observable<any>;

  preferredCondition = 'used';

  private unsubscribe = new Subject();

  order: FormGroup;

  constructor(
    private messages: MessagesService,
    private fb: FormBuilder,
    private items: ItemsService,
    private snackbar: MatSnackBar,
    private orders: OrdersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.retreiveItems();
    this.initForms();
    this.setAttr();
    this.initListeners();
    this.messages.loadedState(['landing']);
  }

  initListeners() {
    this.itemsObs = this.order.controls.itemName
      .valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterItems(value)),
        takeUntil(this.unsubscribe)
      );

    this.order.controls.name.valueChanges
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe
      (name => {
        localStorage.setItem('username', name);
      });

    this.order.controls.contact.valueChanges
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe
      (contact => {
        localStorage.setItem('contact', contact);
      });

    this.listInp.nativeElement.onclick = () => {
      if (this.order.controls.itemName.value === '') {
        this.order.controls.itemName.setValue('');
      }
    }
  }

  setAttr() {
    const prevUsername = localStorage.getItem('username');
    const prevContact = localStorage.getItem('contact');

    if (prevUsername) {
      this.order.controls.name.setValue(prevUsername);
    }

    if (prevContact) {
      this.order.controls.contact.setValue(prevContact);
    }
  }

  retreiveItems() {
    this.items.getAll()
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(res => {
        if (res.error) {
          this.snackbar.open(res.message, 'close')._dismissAfter(3000);
        } else {
          this.itemsArr = res.message;
        }
      });
  }

  filterItems(itemVal: any) {
    const filterValue = itemVal.toLowerCase();

    return this.itemsArr.filter(item => item.name.toLowerCase().includes(filterValue));
  }

  initForms() {
    this.order = this.fb.group({
      itemName: ['', Validators.required],
      name: ['', Validators.required],
      contact: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  activateCondition(c: string) {
    this.preferredCondition = c;

    const cons = Array.from(document.getElementsByClassName('condition-preference'));

    cons.forEach(el => {
      if (el.classList.contains('pref-'.concat(c))) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

  }

  placeOrder() {
    if (this.order.invalid) {
      this.snackbar.open('Please input all of the required fields', 'close')._dismissAfter(3000);
    } else {
      const form = this.order.value;

      Object.assign(form, { preferredCondition: this.preferredCondition });

      this.orders.placeOrder(form)
        .pipe(
          takeUntil(this.unsubscribe)
        )
        .subscribe(res => {
          if (res.error) {
            this.snackbar.open(res.message, 'close')._dismissAfter(3000)
          } else {
            this.router.navigate(['orderplaced'], { queryParams: { message: encodeURI(res.message) } });
          }
        });
    }
  }

}
