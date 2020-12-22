import { Routes } from "@angular/router";
import { CalcComponent } from "src/app/calc/calc.component";
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { RoutingInterceptService } from '../services/routing-intercept.service';

export const appRoutes: Routes = [
  {
    path: '', component: DashboardComponent,
    // canActivate: [RoutingInterceptService]
  }, {
    path: 'dashboard', component: DashboardComponent,
    // canActivate: [RoutingInterceptService]
  },
  {
    path: 'calc', component: CalcComponent,
    // canActivate: [RoutingInterceptService]
  },
];