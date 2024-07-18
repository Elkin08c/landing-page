import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { CrudFormComponent } from '../../crud-form/crud-form.component';
import { CrudListComponent } from '../../crud-list/crud.component';

export const WELCOME_ROUTES: Routes = [
  { 
    path: '', 
    component: WelcomeComponent,
    children: [
      { path: 'crud-form', component: CrudFormComponent },
      { path: 'crud-list', component: CrudListComponent },
    ]
  },
];