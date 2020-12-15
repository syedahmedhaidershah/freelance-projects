import { Routes } from "@angular/router";
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { RoutingInterceptService } from '../services/routing-intercept.service';

export const appRoutes: Routes = [
  {
    path: '', component: DashboardComponent,
    // canActivate: [RoutingInterceptService]
  }, {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [RoutingInterceptService]
  },
];