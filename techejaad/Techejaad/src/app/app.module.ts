import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { InterceptorService } from './interceptor.service';
// tslint:disable-next-line: max-line-length
import {
  MatStepperModule, MatListModule, MatSidenavModule, MatCheckboxModule, MatSelectModule, MatGridListModule, MatRippleModule,
  MatToolbarModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatDividerModule, MatAutocompleteModule, MatButtonModule,
  MatIconModule, MatSnackBarModule, MatExpansionModule, MatTableModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatProgressBarModule
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderSuccessComponent } from './order-success/order-success.component';

const appRoutes: Routes = [
  {
    path: '', component: LoginComponent,
  },
  {
    path: 'dashboard', component: DashboardComponent,
  },
  {
    path: 'orderplaced', component: OrderSuccessComponent
  },
  {
    path: '**', component: LoginComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    OrderSuccessComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false
      }
    ),
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
    DragDropModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
