import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GradeListComponent } from './grade-management/grade-list/grade-list.component';
import { AddGradeComponent } from './grade-management/add-grade/add-grade.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'grades', component: GradeListComponent },
  { path: 'grades/add', component: AddGradeComponent },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders = [
  provideRouter(routes)
];