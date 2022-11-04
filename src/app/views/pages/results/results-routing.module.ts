import { ByQuestionsComponent } from './components/by-questions/by-questions.component';
import { ByCategoryComponent } from './components/by-category/by-category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ByCounterComponent } from './components/by-counter/by-counter.component';

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
  },
  {
    path: 'bycounter',
    component: ByCounterComponent,
    data: {
      title: 'Resultados de evaluacion por usuario y contador de tipo de respuestas - GIEp',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
