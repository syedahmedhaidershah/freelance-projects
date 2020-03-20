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
import { RoutingInterceptService } from './routing-intercept.service';
// import {
//   GoogleApiModule,
//   GoogleApiService,
//   GoogleAuthService,
//   NgGapiClientConfig,
//   NG_GAPI_CONFIG,
//   GoogleApiConfig
// } from 'ng-gapi';

import { LandingComponent } from './landing/landing.component';
import { DiscardDialogComponent } from './discard-dialog/discard-dialog.component';

// const gapiClientConfig: NgGapiClientConfig = {
//   client_id: '225894303581-6q9fkfrfke8phl0j67obaoh13da14keq.apps.googleusercontent.com',
//   discoveryDocs: ['https://classroom.googleapis.com/$discovery/rest?version=v1'],
//   scope: [
//     'https://www.googleapis.com/auth/classroom.profile.emails',
//     'https://www.googleapis.com/auth/classroom.profile.photos',
//     'https://www.googleapis.com/auth/classroom.rosters',
//     'https://www.googleapis.com/auth/classroom.rosters.readonly'
//   ].join(' ')
// };

const appRoutes: Routes = [
  {
    path: '', component: LandingComponent,
    // canActivate: [RoutingInterceptService]
  },
  {
    path: '**', component: LandingComponent,
    // canActivate: [RoutingInterceptService]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent
  ],
  imports: [
    // GoogleApiModule.forRoot({
    //   provide: NG_GAPI_CONFIG,
    //   useValue: gapiClientConfig
    // }),
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
    RoutingInterceptService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DiscardDialogComponent
  ]
})
export class AppModule { }
