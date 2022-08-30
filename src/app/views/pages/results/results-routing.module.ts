import { ByQuestionsComponent } from './components/by-questions/by-questions.component';
import { ByCategoryComponent } from './components/by-category/by-category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'bycategory',
    component: ByCategoryComponent,
    data: {
      title: 'Resultados de evaluacion por usuario y categorias - GIEp',
    }
  },
  {
    path: 'byquestion',
    component: ByQuestionsComponent,
    data: {
      title: 'Resultados de evaluacion por preguntas - GIEp',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
