import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './components/documents/documents.component';

const routes: Routes = [
  {
    path:'documents',
    component: DocumentsComponent,
    data: {
      title: 'Documentos - GIEp',
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiepRepositoryRoutingModule { }
