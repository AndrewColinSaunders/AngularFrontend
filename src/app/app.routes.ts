// import { Routes } from '@angular/router';
// import { ContactListComponent } from './components/contact-list/contact-list.component';
// import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
// import { ContactAddComponent } from './components/contact-add/contact-add.component';

// export const routes: Routes = [
//   { path: '', redirectTo: '/contacts', pathMatch: 'full' },
//   { path: 'contacts', component: ContactListComponent },
//   { path: 'contacts/edit/:id', component: ContactEditComponent },
//   { path: 'contacts/add', component: ContactAddComponent },
// ];



import { Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';
import { ContactAddComponent } from './components/contact-add/contact-add.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';  
import { RegisterComponent } from './components/register/register.component';  

export const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactListComponent, canActivate: [AuthGuard] },
  { path: 'contacts/edit/:id', component: ContactEditComponent, canActivate: [AuthGuard] },
  { path: 'contacts/add', component: ContactAddComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent } 
];

