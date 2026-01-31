import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonsListUnitsListResolver, CommonsListUsersResolver } from '../../../core/resolvers/commons.resolver';
import { DocumentsComponent } from './components/documents/documents.component';
import { DigitizedDocumentsComponent } from './components/digitized-documents/digitized-documents.component';

const routes: Routes = [
  {
    path:'documents',
    component: DocumentsComponent,
    data: {
      title: 'Documentos - GIEp',
    },
    resolve:{
      users: CommonsListUsersResolver
    }
  },
  {
    path:'digitalized-documents',
    component: DigitizedDocumentsComponent,
    data: {
      title: 'Documentos Digitalizados - GIEp',
    },
    resolve:{
      users: CommonsListUsersResolver,
      units: CommonsListUnitsListResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiepRepositoryRoutingModule { }
