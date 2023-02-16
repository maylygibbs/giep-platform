import { CommonsListCategoyTypeResolver, CommonsListCountriesResolver, CommonsListInputTypeResolver, CommonsListInstrumentsResolver, CommonsListRolesResolver, CommonsListUnitsTypeResolver } from './../../../core/resolvers/commons.resolver';
import { CategoriesComponent } from './components/categories/categories.component';
import { InstrumentsComponent } from './components/instruments/instruments.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputsComponent } from './components/inputs/inputs.component';
import { UnitsComponent } from './components/units/units.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path:'inputs',
    component: InputsComponent,
    data: {
      title: 'Elementos inputs - GIEp',
    }
  },
  {
    path:'categories',
    component: CategoriesComponent,
    data: {
      title: 'Categorizacion de preguntas - GIEp',
    }
  },
  {
    path:'units',
    component: UnitsComponent,
    data: {
      title: 'Unidades de medida - GIEp',
    }
  },
  {
    path:'instruments',
    component: InstrumentsComponent,
    data: {
      title: 'Gestión de instrumentos - GIEp',
    },
    resolve:{
      roles: CommonsListRolesResolver,
      units: CommonsListUnitsTypeResolver,
      categories: CommonsListCategoyTypeResolver,
      inputTypes: CommonsListInputTypeResolver,
      countries: CommonsListCountriesResolver
    }
  },  
  {
    path:'users',
    component: UsersComponent,
    data: {
      title: 'Usuarios participantes - GIEp',
    },
    resolve:{
      instruments: CommonsListInstrumentsResolver
    }
  },
  {
    path: 'results',
    loadChildren: () => import('../results/results.module').then(m => m.ResultsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaptureInstrumentsRoutingModule { }
