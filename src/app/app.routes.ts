import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { EditorComponent } from './editor/editor.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'secure',
    loadChildren: () =>
      import('./secure/secure.module').then((m) => m.SecureModule),
  },
  { path: 'editor', component: EditorComponent }
];
