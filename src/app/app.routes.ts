import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchCharacterComponent } from './search-character/search-character.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, 
  { path: 'dashboard', component: DashboardComponent },
  { path: 'search-character', component: SearchCharacterComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
