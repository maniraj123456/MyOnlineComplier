import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeadingComponent } from '../heading/heading.component';
import { EditorComponent } from '../editor/editor.component';

const routes: Routes = [
  { path: 'heading', component: HeadingComponent },
  { path: 'editor', component: EditorComponent },
  { path: '', redirectTo: 'heading', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecureRoutingModule {}