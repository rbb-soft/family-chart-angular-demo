import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArbolComponent } from './components/arbol/arbol.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  { path: '', component: ArbolComponent },
  { path: 'editar', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
