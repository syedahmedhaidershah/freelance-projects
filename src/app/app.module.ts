import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

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
  MatSlideToggleModule
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingInterceptService } from './routing-intercept.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ToggleComponent } from './toggle/toggle.component';
import { DiscreteSliderComponent } from './discrete-slider/discrete-slider.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';


const appRoutes: Routes = [
  {
    path: '', component: LoginComponent,
    // canActivate: [RoutingInterceptService]
  },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [RoutingInterceptService]
  },
  {
    path: '**', component: LoginComponent,
    canActivate: [RoutingInterceptService]
  }


]

// export class globalErrorHandler implements ErrorHandler {
  // handleError = (e) => {
  //   console.warn(e);
  // }
// }



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ToggleComponent,
    DiscreteSliderComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    MatTooltipModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    // { provide: ErrorHandler, useClass: globalErrorHandler },
    RoutingInterceptService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
