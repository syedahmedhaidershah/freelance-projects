import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatInputModule, MatCardModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';
import { BoardComponent } from './board/board.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CreateNotifComponent } from './create-notif/create-notif.component';
import { EditNotifComponent } from './edit-notif/edit-notif.component';
import { InappService } from './inapp.service';
import { NewCarouselComponent } from './new-carousel/new-carousel.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'panel',
    component: PanelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'board',
    component: BoardComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoardComponent,
    PanelComponent,
    CreateNotifComponent,
    EditNotifComponent,
    NewCarouselComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    LayoutModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  providers: [AuthGuard, AuthService, InappService],
  bootstrap: [AppComponent],
  entryComponents: [CreateNotifComponent, EditNotifComponent, NewCarouselComponent]
})
export class AppModule { }
