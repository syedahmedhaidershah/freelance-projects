import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// tslint:disable-next-line:max-line-length
import { MatListModule, MatCheckboxModule, MatSidenavModule, MatSnackBarModule, MatToolbarModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatSelectModule, MatGridListModule, MatRippleModule, MatDialogModule, MatDividerModule, MatAutocompleteModule, MatExpansionModule, MatTableModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule, MatPaginatorModule } from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';
import { MessagesService } from './messages.service';
import { DashboardComponent  } from './dashboard/dashboard.component';
import { AlloteesListComponent } from './allotees-list/allotees-list.component';
import { AllotmentComponent } from './allotment/allotment.component';
import { FileViewerComponent } from './file-viewer/file-viewer.component';
import { PlotsComponent } from './plots/plots.component';
import { SwitchFileComponent } from './switch-file/switch-file.component';
import { NewAllotteeComponent } from './new-allottee/new-allottee.component';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';
import { RefundAdjustComponent } from './refund-adjust/refund-adjust.component';
import { AdjustmentComponent } from './adjustment/adjustment.component';
import { MembersListComponent } from './members-list/members-list.component';
import { BalanceComponent } from './balance/balance.component';
import { IssuedAllotmentsComponent } from './issued-allotments/issued-allotments.component';
import { TransfersComponent } from './transfers/transfers.component';
import { RefundsComponent } from './refunds/refunds.component';
import { AdjustmentsComponent } from './adjustments/adjustments.component';
import { TransferDocComponent } from './transfer-doc/transfer-doc.component';
import { AllotmentOrderComponent } from './allotment-order/allotment-order.component';

const erpRoutes: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AlloteesListComponent,
    AllotmentComponent,
    FileViewerComponent,
    PlotsComponent,
    SwitchFileComponent,
    NewAllotteeComponent,
    PaymentDialogComponent,
    RefundAdjustComponent,
    AdjustmentComponent,
    MembersListComponent,
    BalanceComponent,
    IssuedAllotmentsComponent,
    TransfersComponent,
    RefundsComponent,
    AdjustmentsComponent,
    TransferDocComponent,
    AllotmentOrderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatStepperModule,
    MatListModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatSelectModule,
    MatGridListModule,
    MatRippleModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      erpRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    MessagesService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    FileViewerComponent,
    SwitchFileComponent,
    NewAllotteeComponent,
    PaymentDialogComponent,
    RefundAdjustComponent,
    MembersListComponent,
    BalanceComponent,
    IssuedAllotmentsComponent,
    TransfersComponent,
    RefundsComponent,
    AdjustmentsComponent,
    TransferDocComponent,
    AllotmentOrderComponent
  ]
})
export class AppModule { }
