import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { globalErrorHandler } from "../libraries";
import { Statics } from '../statics';

const { AppRoutes } = Statics;

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RoutingInterceptService } from '../services/routing-intercept.service';
import { InterceptorService } from "../services/interceptor.service";

import { DashboardComponent } from './dashboard/dashboard.component';
import { CalcComponent } from './calc/calc.component';
import { IterationsDialogComponent } from './iterations-dialog/iterations-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CalcComponent,
    IterationsDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(
      AppRoutes,
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
    MatSlideToggleModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: ErrorHandler, useClass: globalErrorHandler },
    RoutingInterceptService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
