import { InstrumentsService } from './../../../../core/services/instruments.service';
import { Instrument } from './../../../../core/models/instrument';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-box-instruments',
  templateUrl: './box-instruments.component.html',
  styleUrls: ['./box-instruments.component.scss']
})
export class BoxInstrumentsComponent implements OnInit {

  @Input()
  instruments: Array<any>;
  instrument:Instrument;
  show:boolean = false;

  constructor(private instrumentsService:InstrumentsService) { }

  async ngOnInit() {
    this.instrument = await this.instrumentsService.getInstrumentsById(this.instruments[0].id);
    this.instrument = JSON.parse(`{
      "id": 1,
      "name": "MOSE",
      "questions": [
          {
              "id": 1,
              "label": "Siempre quiero alcanzar metas que me exigen trabajar más y más ",
              "nameImput": "question-select-1",
              "order": 1,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "622",
                      "label": "CD"
                  },
                  {
                      "value": "623",
                      "label": "MD"
                  },
                  {
                      "value": "624",
                      "label": "LD"
                  },
                  {
                      "value": "625",
                      "label": "LA"
                  },
                  {
                      "value": "626",
                      "label": "MA"
                  },
                  {
                      "value": "627",
                      "label": "CA"
                  }
              ],
              "valueResp": "624"
          },
          {
              "id": 2,
              "label": "Para mí es muy excitante trabajar en algo difícil pero alcanzable",
              "nameImput": "question-select-2",
              "order": 2,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "628",
                      "label": "CD"
                  },
                  {
                      "value": "629",
                      "label": "MD"
                  },
                  {
                      "value": "630",
                      "label": "LD"
                  },
                  {
                      "value": "631",
                      "label": "LA"
                  },
                  {
                      "value": "632",
                      "label": "MA"
                  },
                  {
                      "value": "633",
                      "label": "CA"
                  }
              ],
              "valueResp": "631"
          },
          {
              "id": 3,
              "label": "Tengo tendencia a fijarme metas difíciles pero controlables",
              "nameImput": "question-select-3",
              "order": 3,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "634",
                      "label": "CD"
                  },
                  {
                      "value": "635",
                      "label": "MD"
                  },
                  {
                      "value": "636",
                      "label": "LD"
                  },
                  {
                      "value": "637",
                      "label": "LA"
                  },
                  {
                      "value": "638",
                      "label": "MA"
                  },
                  {
                      "value": "639",
                      "label": "CA"
                  }
              ],
              "valueResp": "637"
          },
          {
              "id": 4,
              "label": "Cuando me propongo hacer algo, estoy dispuesto a vencer todos los obstáculos",
              "nameImput": "question-select-4",
              "order": 4,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "640",
                      "label": "CD"
                  },
                  {
                      "value": "641",
                      "label": "MD"
                  },
                  {
                      "value": "642",
                      "label": "LD"
                  },
                  {
                      "value": "643",
                      "label": "LA"
                  },
                  {
                      "value": "644",
                      "label": "MA"
                  },
                  {
                      "value": "645",
                      "label": "CA"
                  }
              ],
              "valueResp": "643"
          },
          {
              "id": 5,
              "label": "Puede que no me guste una tarea, pero una vez que la comienzo no me siento tranquilo hasta termirnarla",
              "nameImput": "question-select-5",
              "order": 5,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "646",
                      "label": "CD"
                  },
                  {
                      "value": "647",
                      "label": "MD"
                  },
                  {
                      "value": "648",
                      "label": "LD"
                  },
                  {
                      "value": "649",
                      "label": "LA"
                  },
                  {
                      "value": "650",
                      "label": "MA"
                  },
                  {
                      "value": "651",
                      "label": "CA"
                  }
              ],
              "valueResp": "648"
          },
          {
              "id": 6,
              "label": "Cuando un grupo fracasa, lo más importante es identificar las fallas e implementar las correcciones",
              "nameImput": "question-select-6",
              "order": 6,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "652",
                      "label": "CD"
                  },
                  {
                      "value": "653",
                      "label": "MD"
                  },
                  {
                      "value": "654",
                      "label": "LD"
                  },
                  {
                      "value": "655",
                      "label": "LA"
                  },
                  {
                      "value": "656",
                      "label": "MA"
                  }
              ],
              "valueResp": "655"
          },
          {
              "id": 7,
              "label": "En un grupo, los mejores resultados se logran cuando cada quien se exige a sí mismo su mejor rendimiento",
              "nameImput": "question-select-7",
              "order": 7,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "657",
                      "label": "CA"
                  },
                  {
                      "value": "658",
                      "label": "CD"
                  },
                  {
                      "value": "659",
                      "label": "MD"
                  },
                  {
                      "value": "660",
                      "label": "LD"
                  },
                  {
                      "value": "661",
                      "label": "LA"
                  },
                  {
                      "value": "662",
                      "label": "MA"
                  },
                  {
                      "value": "663",
                      "label": "CA"
                  }
              ],
              "valueResp": "661"
          },
          {
              "id": 8,
              "label": "Yo creo que casi todas las tareas son interesantes si uno sabe interpretarlas apropiadamente",
              "nameImput": "question-select-8",
              "order": 8,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "664",
                      "label": "CD"
                  },
                  {
                      "value": "665",
                      "label": "MD"
                  },
                  {
                      "value": "666",
                      "label": "LD"
                  },
                  {
                      "value": "667",
                      "label": "LA"
                  },
                  {
                      "value": "668",
                      "label": "MA"
                  },
                  {
                      "value": "669",
                      "label": "CA"
                  }
              ],
              "valueResp": "666"
          },
          {
              "id": 9,
              "label": "A veces, mientras más me preparo para hacer las cosas, peor me salen",
              "nameImput": "question-select-9",
              "order": 9,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "670",
                      "label": "CD"
                  },
                  {
                      "value": "671",
                      "label": "MD"
                  },
                  {
                      "value": "672",
                      "label": "LD"
                  },
                  {
                      "value": "673",
                      "label": "LA"
                  },
                  {
                      "value": "674",
                      "label": "MA"
                  },
                  {
                      "value": "675",
                      "label": "CA"
                  }
              ],
              "valueResp": "675"
          },
          {
              "id": 10,
              "label": "Cuando tengo dificultades para resolver problemas desearía no tener que hacerlo",
              "nameImput": "question-select-10",
              "order": 10,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "676",
                      "label": "CD"
                  },
                  {
                      "value": "677",
                      "label": "MD"
                  },
                  {
                      "value": "678",
                      "label": "LD"
                  },
                  {
                      "value": "679",
                      "label": "LA"
                  },
                  {
                      "value": "680",
                      "label": "MA"
                  },
                  {
                      "value": "681",
                      "label": "CA"
                  }
              ],
              "valueResp": "679"
          },
          {
              "id": 11,
              "label": "Lo importante es empezar, después se verá cómo se termina el trabajo",
              "nameImput": "question-select-11",
              "order": 11,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "682",
                      "label": "CD"
                  },
                  {
                      "value": "683",
                      "label": "MD"
                  },
                  {
                      "value": "684",
                      "label": "LD"
                  },
                  {
                      "value": "685",
                      "label": "LA"
                  },
                  {
                      "value": "686",
                      "label": "MA"
                  },
                  {
                      "value": "687",
                      "label": "CA"
                  }
              ],
              "valueResp": "686"
          },
          {
              "id": 12,
              "label": "Me es difícil seguir un plan de acción para alcanzar las metas que me propongo",
              "nameImput": "question-select-12",
              "order": 12,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "688",
                      "label": "CD"
                  },
                  {
                      "value": "689",
                      "label": "MD"
                  },
                  {
                      "value": "690",
                      "label": "LD"
                  },
                  {
                      "value": "691",
                      "label": "LA"
                  },
                  {
                      "value": "692",
                      "label": "MA"
                  },
                  {
                      "value": "693",
                      "label": "CA"
                  }
              ],
              "valueResp": "691"
          },
          {
              "id": 13,
              "label": "De nada vale trabajar demasiado porque de todos modos nadie reconoce el esfuerzo hecho",
              "nameImput": "question-select-13",
              "order": 13,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "694",
                      "label": "CD"
                  },
                  {
                      "value": "695",
                      "label": "MD"
                  },
                  {
                      "value": "696",
                      "label": "LD"
                  },
                  {
                      "value": "697",
                      "label": "LA"
                  },
                  {
                      "value": "698",
                      "label": "MA"
                  },
                  {
                      "value": "699",
                      "label": "CA"
                  }
              ],
              "valueResp": "698"
          },
          {
              "id": 14,
              "label": "Planificar las actividades es una pérdida de tiempo; lo importante es arrancar",
              "nameImput": "question-select-14",
              "order": 14,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "700",
                      "label": "CD"
                  },
                  {
                      "value": "701",
                      "label": "MD"
                  },
                  {
                      "value": "702",
                      "label": "LD"
                  },
                  {
                      "value": "703",
                      "label": "LA"
                  },
                  {
                      "value": "704",
                      "label": "MA"
                  },
                  {
                      "value": "705",
                      "label": "CA"
                  }
              ],
              "valueResp": "703"
          },
          {
              "id": 15,
              "label": "No vale la pena establecer fechas para cumplir los planes que uno tiene, porque siempre surgen imprevistos",
              "nameImput": "question-select-15",
              "order": 15,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "706",
                      "label": "CD"
                  },
                  {
                      "value": "707",
                      "label": "MD"
                  },
                  {
                      "value": "708",
                      "label": "LD"
                  },
                  {
                      "value": "709",
                      "label": "LA"
                  },
                  {
                      "value": "710",
                      "label": "MA"
                  },
                  {
                      "value": "711",
                      "label": "CA"
                  }
              ],
              "valueResp": "710"
          },
          {
              "id": 16,
              "label": "Por lo general, dejo para el último momento las cosas que tengo que hacer",
              "nameImput": "question-select-16",
              "order": 16,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "712",
                      "label": "CD"
                  },
                  {
                      "value": "713",
                      "label": "MD"
                  },
                  {
                      "value": "714",
                      "label": "LD"
                  },
                  {
                      "value": "715",
                      "label": "LA"
                  },
                  {
                      "value": "716",
                      "label": "MA"
                  },
                  {
                      "value": "717",
                      "label": "CA"
                  }
              ],
              "valueResp": "713"
          },
          {
              "id": 17,
              "label": "El que yo llegue a ser un líder depende principalmente de mis habilidades",
              "nameImput": "question-select-17",
              "order": 17,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "718",
                      "label": "CD"
                  },
                  {
                      "value": "719",
                      "label": "MD"
                  },
                  {
                      "value": "720",
                      "label": "LD"
                  },
                  {
                      "value": "721",
                      "label": "LA"
                  },
                  {
                      "value": "722",
                      "label": "MA"
                  },
                  {
                      "value": "723",
                      "label": "CA"
                  }
              ],
              "valueResp": "721"
          },
          {
              "id": 18,
              "label": "El hecho de tener un accidente cuando voy manejando, depende principalmente de mi mismo",
              "nameImput": "question-select-18",
              "order": 18,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "724",
                      "label": "CD"
                  },
                  {
                      "value": "725",
                      "label": "MD"
                  },
                  {
                      "value": "726",
                      "label": "LD"
                  },
                  {
                      "value": "727",
                      "label": "LA"
                  },
                  {
                      "value": "728",
                      "label": "MA"
                  },
                  {
                      "value": "729",
                      "label": "CA"
                  }
              ],
              "valueResp": "726"
          },
          {
              "id": 19,
              "label": "Cuando hago planes, estoy casi seguro que los llevaré a cabo",
              "nameImput": "question-select-19",
              "order": 19,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "730",
                      "label": "CD"
                  },
                  {
                      "value": "731",
                      "label": "MD"
                  },
                  {
                      "value": "732",
                      "label": "LD"
                  },
                  {
                      "value": "733",
                      "label": "LA"
                  },
                  {
                      "value": "734",
                      "label": "MA"
                  },
                  {
                      "value": "735",
                      "label": "CA"
                  }
              ],
              "valueResp": "732"
          },
          {
              "id": 20,
              "label": "La cantidad de amigos que tengo está determinada por mi propia simpatía",
              "nameImput": "question-select-20",
              "order": 20,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "736",
                      "label": "CD"
                  },
                  {
                      "value": "737",
                      "label": "MD"
                  },
                  {
                      "value": "738",
                      "label": "LD"
                  },
                  {
                      "value": "739",
                      "label": "LA"
                  },
                  {
                      "value": "740",
                      "label": "MA"
                  },
                  {
                      "value": "741",
                      "label": "CA"
                  }
              ],
              "valueResp": "738"
          },
          {
              "id": 21,
              "label": "En la mayoría de los casos yo puedo decidir lo que sucederá en mi vida",
              "nameImput": "question-select-21",
              "order": 21,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "742",
                      "label": "CD"
                  },
                  {
                      "value": "743",
                      "label": "MD"
                  },
                  {
                      "value": "744",
                      "label": "LD"
                  },
                  {
                      "value": "745",
                      "label": "LA"
                  },
                  {
                      "value": "746",
                      "label": "MA"
                  },
                  {
                      "value": "747",
                      "label": "CA"
                  }
              ],
              "valueResp": "745"
          },
          {
              "id": 22,
              "label": "Normalmente soy capaz de defender mis intereses personales",
              "nameImput": "question-select-22",
              "order": 22,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "748",
                      "label": "CD"
                  },
                  {
                      "value": "749",
                      "label": "MD"
                  },
                  {
                      "value": "750",
                      "label": "LD"
                  },
                  {
                      "value": "751",
                      "label": "LA"
                  },
                  {
                      "value": "752",
                      "label": "MA"
                  },
                  {
                      "value": "753",
                      "label": "CA"
                  }
              ],
              "valueResp": "752"
          },
          {
              "id": 23,
              "label": "Cuando logro lo que quiero es porque he trabajado mucho en ello",
              "nameImput": "question-select-23",
              "order": 23,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "754",
                      "label": "CD"
                  },
                  {
                      "value": "755",
                      "label": "MD"
                  },
                  {
                      "value": "756",
                      "label": "LD"
                  },
                  {
                      "value": "757",
                      "label": "LA"
                  },
                  {
                      "value": "758",
                      "label": "MA"
                  },
                  {
                      "value": "759",
                      "label": "CA"
                  }
              ],
              "valueResp": "758"
          },
          {
              "id": 24,
              "label": "Mi vida está determinada por mis propias acciones",
              "nameImput": "question-select-24",
              "order": 24,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "760",
                      "label": "CD"
                  },
                  {
                      "value": "761",
                      "label": "MD"
                  },
                  {
                      "value": "762",
                      "label": "LD"
                  },
                  {
                      "value": "763",
                      "label": "LA"
                  },
                  {
                      "value": "764",
                      "label": "MA"
                  },
                  {
                      "value": "765",
                      "label": "CA"
                  }
              ],
              "valueResp": "763"
          },
          {
              "id": 25,
              "label": "Creo que puedo anticipar los resultados de lo que hago",
              "nameImput": "question-select-25",
              "order": 25,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "766",
                      "label": "CD"
                  },
                  {
                      "value": "767",
                      "label": "MD"
                  },
                  {
                      "value": "768",
                      "label": "LD"
                  },
                  {
                      "value": "769",
                      "label": "LA"
                  },
                  {
                      "value": "770",
                      "label": "MA"
                  },
                  {
                      "value": "771",
                      "label": "CA"
                  }
              ],
              "valueResp": "770"
          },
          {
              "id": 26,
              "label": "Cuando planifico una tarea no puedo predecir si la realizaré bien o no",
              "nameImput": "question-select-26",
              "order": 26,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "772",
                      "label": "CD"
                  },
                  {
                      "value": "773",
                      "label": "MD"
                  },
                  {
                      "value": "774",
                      "label": "LD"
                  },
                  {
                      "value": "775",
                      "label": "LA"
                  },
                  {
                      "value": "776",
                      "label": "MA"
                  },
                  {
                      "value": "777",
                      "label": "CA"
                  }
              ],
              "valueResp": "776"
          },
          {
              "id": 27,
              "label": "Creo que si voy a salir mal en un trabajo, ello me sucederá sin que yo pueda evitarlo",
              "nameImput": "question-select-27",
              "order": 27,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "778",
                      "label": "CD"
                  },
                  {
                      "value": "779",
                      "label": "MD"
                  },
                  {
                      "value": "780",
                      "label": "LD"
                  },
                  {
                      "value": "781",
                      "label": "LA"
                  },
                  {
                      "value": "782",
                      "label": "MA"
                  },
                  {
                      "value": "783",
                      "label": "CA"
                  }
              ],
              "valueResp": "782"
          },
          {
              "id": 28,
              "label": "La cantidad de horas que yo trabajé hoy no serán decisivas sobre lo que seré mañana",
              "nameImput": "question-select-28",
              "order": 28,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "784",
                      "label": "CD"
                  },
                  {
                      "value": "785",
                      "label": "MD"
                  },
                  {
                      "value": "786",
                      "label": "LD"
                  },
                  {
                      "value": "787",
                      "label": "LA"
                  },
                  {
                      "value": "788",
                      "label": "MA"
                  },
                  {
                      "value": "789",
                      "label": "CA"
                  }
              ],
              "valueResp": "789"
          },
          {
              "id": 29,
              "label": "Mis acciones de hoy no serán las que decidan lo que seré mañana",
              "nameImput": "question-select-29",
              "order": 29,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "790",
                      "label": "CD"
                  },
                  {
                      "value": "791",
                      "label": "MD"
                  },
                  {
                      "value": "792",
                      "label": "LD"
                  },
                  {
                      "value": "793",
                      "label": "LA"
                  },
                  {
                      "value": "794",
                      "label": "MA"
                  },
                  {
                      "value": "795",
                      "label": "CA"
                  }
              ],
              "valueResp": "793"
          },
          {
              "id": 30,
              "label": "Cuando uno desea lograr un objetivo importante los recursos son los que menos cuentan",
              "nameImput": "question-select-30",
              "order": 30,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "796",
                      "label": "CD"
                  },
                  {
                      "value": "797",
                      "label": "MD"
                  },
                  {
                      "value": "798",
                      "label": "LD"
                  },
                  {
                      "value": "799",
                      "label": "LA"
                  },
                  {
                      "value": "800",
                      "label": "MA"
                  },
                  {
                      "value": "801",
                      "label": "CA"
                  }
              ],
              "valueResp": "800"
          },
          {
              "id": 31,
              "label": "Uno no sabe cuando va a salir mal en un trabajo",
              "nameImput": "question-select-31",
              "order": 31,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "802",
                      "label": "CD"
                  },
                  {
                      "value": "803",
                      "label": "MD"
                  },
                  {
                      "value": "804",
                      "label": "LD"
                  },
                  {
                      "value": "805",
                      "label": "LA"
                  },
                  {
                      "value": "806",
                      "label": "MA"
                  },
                  {
                      "value": "807",
                      "label": "CA"
                  }
              ],
              "valueResp": "807"
          },
          {
              "id": 32,
              "label": "Aunque yo haya revisado todo el material y realizado todos los detalles, no puedo estar seguro que saldré bien en una tarea ",
              "nameImput": "question-select-32",
              "order": 32,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "808",
                      "label": "CD"
                  },
                  {
                      "value": "809",
                      "label": "MD"
                  },
                  {
                      "value": "810",
                      "label": "LD"
                  },
                  {
                      "value": "811",
                      "label": "LA"
                  },
                  {
                      "value": "812",
                      "label": "MA"
                  },
                  {
                      "value": "813",
                      "label": "CA"
                  }
              ],
              "valueResp": "813"
          },
          {
              "id": 33,
              "label": "En tiempos de incertidumbre generalmente sé queme ocurrirá lo mejor",
              "nameImput": "question-select-33",
              "order": 33,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "814",
                      "label": "CD"
                  },
                  {
                      "value": "815",
                      "label": "MD"
                  },
                  {
                      "value": "816",
                      "label": "LD"
                  },
                  {
                      "value": "817",
                      "label": "LA"
                  },
                  {
                      "value": "818",
                      "label": "MA"
                  },
                  {
                      "value": "819",
                      "label": "CA"
                  }
              ],
              "valueResp": "815"
          },
          {
              "id": 34,
              "label": "Si algo puede sucederme, seguro que me sucederá",
              "nameImput": "question-select-34",
              "order": 34,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "820",
                      "label": "CD"
                  },
                  {
                      "value": "821",
                      "label": "MD"
                  },
                  {
                      "value": "822",
                      "label": "LD"
                  },
                  {
                      "value": "823",
                      "label": "LA"
                  },
                  {
                      "value": "824",
                      "label": "MA"
                  },
                  {
                      "value": "825",
                      "label": "CA"
                  }
              ],
              "valueResp": "825"
          },
          {
              "id": 35,
              "label": "Siempre miro el lado bueno de las cosas ",
              "nameImput": "question-select-35",
              "order": 35,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "826",
                      "label": "CD"
                  },
                  {
                      "value": "827",
                      "label": "MD"
                  },
                  {
                      "value": "828",
                      "label": "LD"
                  },
                  {
                      "value": "829",
                      "label": "LA"
                  },
                  {
                      "value": "830",
                      "label": "MA"
                  },
                  {
                      "value": "831",
                      "label": "CA"
                  }
              ],
              "valueResp": "830"
          },
          {
              "id": 36,
              "label": "Siempre soy más optimista acerca de mi futuro",
              "nameImput": "question-select-36",
              "order": 36,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "832",
                      "label": "CD"
                  },
                  {
                      "value": "833",
                      "label": "MD"
                  },
                  {
                      "value": "834",
                      "label": "LD"
                  },
                  {
                      "value": "835",
                      "label": "LA"
                  },
                  {
                      "value": "836",
                      "label": "MA"
                  },
                  {
                      "value": "837",
                      "label": "CA"
                  }
              ],
              "valueResp": "836"
          },
          {
              "id": 37,
              "label": "Casi nunca anticipo que las cosas se hagan a mi manera",
              "nameImput": "question-select-37",
              "order": 37,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "838",
                      "label": "CD"
                  },
                  {
                      "value": "839",
                      "label": "MD"
                  },
                  {
                      "value": "840",
                      "label": "LD"
                  },
                  {
                      "value": "841",
                      "label": "LA"
                  },
                  {
                      "value": "842",
                      "label": "MA"
                  },
                  {
                      "value": "843",
                      "label": "CA"
                  }
              ],
              "valueResp": "840"
          },
          {
              "id": 38,
              "label": "Nunca las cosas resulten como yo quiero que resulte ",
              "nameImput": "question-select-38",
              "order": 38,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "844",
                      "label": "CD"
                  },
                  {
                      "value": "845",
                      "label": "MD"
                  },
                  {
                      "value": "846",
                      "label": "LD"
                  },
                  {
                      "value": "847",
                      "label": "LA"
                  },
                  {
                      "value": "848",
                      "label": "MA"
                  },
                  {
                      "value": "849",
                      "label": "CA"
                  }
              ],
              "valueResp": "849"
          },
          {
              "id": 39,
              "label": "Yo creo que cada experiencia negativa tiene su lado positivo",
              "nameImput": "question-select-39",
              "order": 39,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "850",
                      "label": "CD"
                  },
                  {
                      "value": "851",
                      "label": "MD"
                  },
                  {
                      "value": "852",
                      "label": "LD"
                  },
                  {
                      "value": "853",
                      "label": "LA"
                  },
                  {
                      "value": "854",
                      "label": "MA"
                  },
                  {
                      "value": "855",
                      "label": "CA"
                  }
              ],
              "valueResp": "852"
          },
          {
              "id": 40,
              "label": "Raramente cuento con que me ocurran cosas buenas",
              "nameImput": "question-select-40",
              "order": 40,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "856",
                      "label": "CD"
                  },
                  {
                      "value": "857",
                      "label": "MD"
                  },
                  {
                      "value": "858",
                      "label": "LD"
                  },
                  {
                      "value": "859",
                      "label": "LA"
                  },
                  {
                      "value": "860",
                      "label": "MA"
                  },
                  {
                      "value": "861",
                      "label": "CA"
                  }
              ],
              "valueResp": "860"
          },
          {
              "id": 41,
              "label": "Hay que conformarse con poco, pues de todas maneras quien mucho abarca poco aprieta",
              "nameImput": "question-select-41",
              "order": 41,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "862",
                      "label": "CD"
                  },
                  {
                      "value": "863",
                      "label": "MD"
                  },
                  {
                      "value": "864",
                      "label": "LD"
                  },
                  {
                      "value": "865",
                      "label": "LA"
                  },
                  {
                      "value": "866",
                      "label": "MA"
                  },
                  {
                      "value": "867",
                      "label": "CA"
                  }
              ],
              "valueResp": "862"
          },
          {
              "id": 42,
              "label": "La pobreza en la tierra garantiza la felicidad eterna en el cielo",
              "nameImput": "question-select-42",
              "order": 42,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "868",
                      "label": "CD"
                  },
                  {
                      "value": "869",
                      "label": "MD"
                  },
                  {
                      "value": "870",
                      "label": "LD"
                  },
                  {
                      "value": "871",
                      "label": "LA"
                  },
                  {
                      "value": "872",
                      "label": "MA"
                  },
                  {
                      "value": "873",
                      "label": "CA"
                  }
              ],
              "valueResp": "873"
          },
          {
              "id": 43,
              "label": "Si uno siempre ha vivido humildemente, querer enriquecerse sólo le traerá problemas",
              "nameImput": "question-select-43",
              "order": 43,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "874",
                      "label": "CD"
                  },
                  {
                      "value": "875",
                      "label": "MD"
                  },
                  {
                      "value": "876",
                      "label": "LD"
                  },
                  {
                      "value": "877",
                      "label": "LA"
                  },
                  {
                      "value": "878",
                      "label": "MA"
                  },
                  {
                      "value": "879",
                      "label": "CA"
                  }
              ],
              "valueResp": "876"
          },
          {
              "id": 44,
              "label": "Sobresalir por encima de los demás es básicamente malo ",
              "nameImput": "question-select-44",
              "order": 44,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "880",
                      "label": "CD"
                  },
                  {
                      "value": "881",
                      "label": "MD"
                  },
                  {
                      "value": "882",
                      "label": "LD"
                  },
                  {
                      "value": "883",
                      "label": "LA"
                  },
                  {
                      "value": "884",
                      "label": "MA"
                  },
                  {
                      "value": "885",
                      "label": "CA"
                  }
              ],
              "valueResp": "884"
          },
          {
              "id": 45,
              "label": "Yo estoy conforme con mi sutuación actual porque vivo cómodamente",
              "nameImput": "question-select-45",
              "order": 45,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "886",
                      "label": "CD"
                  },
                  {
                      "value": "887",
                      "label": "MD"
                  },
                  {
                      "value": "888",
                      "label": "LD"
                  },
                  {
                      "value": "889",
                      "label": "LA"
                  },
                  {
                      "value": "890",
                      "label": "MA"
                  },
                  {
                      "value": "891",
                      "label": "CA"
                  }
              ],
              "valueResp": "889"
          },
          {
              "id": 46,
              "label": "Yo prefiero la tranquilidad de la pobreza a la angustia de la riqueza",
              "nameImput": "question-select-46",
              "order": 46,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "892",
                      "label": "CD"
                  },
                  {
                      "value": "893",
                      "label": "MD"
                  },
                  {
                      "value": "894",
                      "label": "LD"
                  },
                  {
                      "value": "895",
                      "label": "LA"
                  },
                  {
                      "value": "896",
                      "label": "MA"
                  },
                  {
                      "value": "897",
                      "label": "CA"
                  }
              ],
              "valueResp": "897"
          },
          {
              "id": 47,
              "label": "No es correcto sentir orgullo por lo que uno logra, pues lo llamarán pedante",
              "nameImput": "question-select-47",
              "order": 47,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "898",
                      "label": "CD"
                  },
                  {
                      "value": "899",
                      "label": "MD"
                  },
                  {
                      "value": "900",
                      "label": "LD"
                  },
                  {
                      "value": "901",
                      "label": "LA"
                  },
                  {
                      "value": "902",
                      "label": "MA"
                  },
                  {
                      "value": "903",
                      "label": "CA"
                  }
              ],
              "valueResp": "899"
          },
          {
              "id": 48,
              "label": "Yo sé que trabajando no me haré rico y por eso no me esfuerzo mucho",
              "nameImput": "question-select-48",
              "order": 48,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "904",
                      "label": "CD"
                  },
                  {
                      "value": "905",
                      "label": "MD"
                  },
                  {
                      "value": "906",
                      "label": "LD"
                  },
                  {
                      "value": "907",
                      "label": "LA"
                  },
                  {
                      "value": "908",
                      "label": "MA"
                  },
                  {
                      "value": "909",
                      "label": "CA"
                  }
              ],
              "valueResp": "905"
          },
          {
              "id": 49,
              "label": "Yo siento que lo que pasa en mi vida está muy determinado por la gente que tiene poder (padres, jefes, políticos)",
              "nameImput": "question-select-49",
              "order": 49,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "910",
                      "label": "CD"
                  },
                  {
                      "value": "911",
                      "label": "MD"
                  },
                  {
                      "value": "912",
                      "label": "LD"
                  },
                  {
                      "value": "913",
                      "label": "LA"
                  },
                  {
                      "value": "914",
                      "label": "MA"
                  },
                  {
                      "value": "915",
                      "label": "CA"
                  }
              ],
              "valueResp": "915"
          },
          {
              "id": 50,
              "label": "A pesar de estar bien capacitado no conseguiré un buen empleo a menos que alguien influyente me ayude",
              "nameImput": "question-select-50",
              "order": 50,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "916",
                      "label": "CD"
                  },
                  {
                      "value": "917",
                      "label": "MD"
                  },
                  {
                      "value": "918",
                      "label": "LD"
                  },
                  {
                      "value": "919",
                      "label": "LA"
                  },
                  {
                      "value": "920",
                      "label": "MA"
                  },
                  {
                      "value": "921",
                      "label": "CA"
                  }
              ],
              "valueResp": "918"
          },
          {
              "id": 51,
              "label": "Yo creo que los ricos y los políticos controlan mi vida de muchas maneras diferentes",
              "nameImput": "question-select-51",
              "order": 51,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "922",
                      "label": "CD"
                  },
                  {
                      "value": "923",
                      "label": "MD"
                  },
                  {
                      "value": "924",
                      "label": "LD"
                  },
                  {
                      "value": "925",
                      "label": "LA"
                  },
                  {
                      "value": "926",
                      "label": "MA"
                  },
                  {
                      "value": "927",
                      "label": "CA"
                  }
              ],
              "valueResp": "926"
          },
          {
              "id": 52,
              "label": "La gente como yo tiene muy poca oportunidad de defender sus intereses personales cuando esos intereses entran en conflicto con los grupos poderosos (ricos-políticos)",
              "nameImput": "question-select-52",
              "order": 52,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "928",
                      "label": "CD"
                  },
                  {
                      "value": "929",
                      "label": "MD"
                  },
                  {
                      "value": "930",
                      "label": "LD"
                  },
                  {
                      "value": "931",
                      "label": "LA"
                  },
                  {
                      "value": "932",
                      "label": "MA"
                  },
                  {
                      "value": "933",
                      "label": "CA"
                  }
              ],
              "valueResp": "929"
          },
          {
              "id": 53,
              "label": "En éste país, para uno lograr lo que quiere necesariamente tiene que adularle a alguien",
              "nameImput": "question-select-53",
              "order": 53,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "934",
                      "label": "CD"
                  },
                  {
                      "value": "935",
                      "label": "MD"
                  },
                  {
                      "value": "936",
                      "label": "LD"
                  },
                  {
                      "value": "937",
                      "label": "LA"
                  },
                  {
                      "value": "938",
                      "label": "MA"
                  },
                  {
                      "value": "939",
                      "label": "CA"
                  }
              ],
              "valueResp": "938"
          },
          {
              "id": 54,
              "label": "Yo siento que la gente tiene algún poder sobre mí ( padres, familiares, jefes), tratan de decidir lo que sucederá en mi vida",
              "nameImput": "question-select-54",
              "order": 54,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "940",
                      "label": "CD"
                  },
                  {
                      "value": "941",
                      "label": "MD"
                  },
                  {
                      "value": "942",
                      "label": "LD"
                  },
                  {
                      "value": "943",
                      "label": "LA"
                  },
                  {
                      "value": "944",
                      "label": "MA"
                  },
                  {
                      "value": "945",
                      "label": "CA"
                  }
              ],
              "valueResp": "941"
          },
          {
              "id": 55,
              "label": "Si tengo un accidente cuando voy manejando, toda la culpa es del conductor",
              "nameImput": "question-select-55",
              "order": 55,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "946",
                      "label": "CD"
                  },
                  {
                      "value": "947",
                      "label": "MD"
                  },
                  {
                      "value": "948",
                      "label": "LD"
                  },
                  {
                      "value": "949",
                      "label": "LA"
                  },
                  {
                      "value": "950",
                      "label": "MA"
                  },
                  {
                      "value": "951",
                      "label": "CA"
                  }
              ],
              "valueResp": "949"
          },
          {
              "id": 56,
              "label": "Cuando quiero que mis planes me salgan bien, los elaboro de manera que complazcan a la gente que tiene influencia sobre mi (padres. Jefes)",
              "nameImput": "question-select-56",
              "order": 56,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "952",
                      "label": "CD"
                  },
                  {
                      "value": "953",
                      "label": "MD"
                  },
                  {
                      "value": "954",
                      "label": "LD"
                  },
                  {
                      "value": "955",
                      "label": "LA"
                  },
                  {
                      "value": "956",
                      "label": "MA"
                  },
                  {
                      "value": "957",
                      "label": "CA"
                  }
              ],
              "valueResp": "956"
          },
          {
              "id": 57,
              "label": "Mi vida ha sido influenciada en gran medida por sucesos inesperados ",
              "nameImput": "question-select-57",
              "order": 57,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "958",
                      "label": "CD"
                  },
                  {
                      "value": "959",
                      "label": "MD"
                  },
                  {
                      "value": "960",
                      "label": "LD"
                  },
                  {
                      "value": "961",
                      "label": "LA"
                  },
                  {
                      "value": "962",
                      "label": "MA"
                  },
                  {
                      "value": "963",
                      "label": "CA"
                  }
              ],
              "valueResp": "963"
          },
          {
              "id": 58,
              "label": "Ciertamente, a veces no puedo evitar tener mala suerte en mis asuntos personales ",
              "nameImput": "question-select-58",
              "order": 58,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "964",
                      "label": "CD"
                  },
                  {
                      "value": "965",
                      "label": "MD"
                  },
                  {
                      "value": "966",
                      "label": "LD"
                  },
                  {
                      "value": "967",
                      "label": "LA"
                  },
                  {
                      "value": "968",
                      "label": "MA"
                  },
                  {
                      "value": "969",
                      "label": "CA"
                  }
              ],
              "valueResp": "966"
          },
          {
              "id": 59,
              "label": "Como yo tengo buena suerte siempre las cosas me salen bien",
              "nameImput": "question-select-59",
              "order": 59,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "970",
                      "label": "CD"
                  },
                  {
                      "value": "971",
                      "label": "MD"
                  },
                  {
                      "value": "972",
                      "label": "LD"
                  },
                  {
                      "value": "973",
                      "label": "LA"
                  },
                  {
                      "value": "974",
                      "label": "MA"
                  },
                  {
                      "value": "975",
                      "label": "CA"
                  }
              ],
              "valueResp": "973"
          },
          {
              "id": 60,
              "label": "He descubierto que si algo va a suceder, ello sucede independientemente de lo que yo haga",
              "nameImput": "question-select-60",
              "order": 60,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "976",
                      "label": "CD"
                  },
                  {
                      "value": "977",
                      "label": "MD"
                  },
                  {
                      "value": "978",
                      "label": "LD"
                  },
                  {
                      "value": "979",
                      "label": "LA"
                  },
                  {
                      "value": "980",
                      "label": "MA"
                  },
                  {
                      "value": "981",
                      "label": "CA"
                  }
              ],
              "valueResp": "981"
          },
          {
              "id": 61,
              "label": "Si tengo un accidente automovilístico, ello se debe a mi mala suerte",
              "nameImput": "question-select-61",
              "order": 61,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "982",
                      "label": "CD"
                  },
                  {
                      "value": "983",
                      "label": "MD"
                  },
                  {
                      "value": "984",
                      "label": "LD"
                  },
                  {
                      "value": "985",
                      "label": "LA"
                  },
                  {
                      "value": "986",
                      "label": "MA"
                  },
                  {
                      "value": "987",
                      "label": "CA"
                  }
              ],
              "valueResp": "986"
          },
          {
              "id": 62,
              "label": "No siempre es apropiado para mi plantear muy por adelantado porque de todas maneras muchas cosas resultan ser asunto de buena o mala suerte",
              "nameImput": "question-select-62",
              "order": 62,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "988",
                      "label": "CD"
                  },
                  {
                      "value": "989",
                      "label": "MD"
                  },
                  {
                      "value": "990",
                      "label": "LD"
                  },
                  {
                      "value": "991",
                      "label": "LA"
                  },
                  {
                      "value": "992",
                      "label": "MA"
                  },
                  {
                      "value": "993",
                      "label": "CA"
                  }
              ],
              "valueResp": "991"
          },
          {
              "id": 63,
              "label": "El que yo llegue a ser líder dependerá de la suerte que yo tenga",
              "nameImput": "question-select-63",
              "order": 63,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "994",
                      "label": "CD"
                  },
                  {
                      "value": "995",
                      "label": "MD"
                  },
                  {
                      "value": "996",
                      "label": "LD"
                  },
                  {
                      "value": "997",
                      "label": "LA"
                  },
                  {
                      "value": "998",
                      "label": "MA"
                  },
                  {
                      "value": "999",
                      "label": "CA"
                  }
              ],
              "valueResp": "996"
          },
          {
              "id": 64,
              "label": "Tener pocos o muchos amigos depende del destino de cada uno ",
              "nameImput": "question-select-64",
              "order": 64,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1000",
                      "label": "CD"
                  },
                  {
                      "value": "1001",
                      "label": "MD"
                  },
                  {
                      "value": "1002",
                      "label": "LD"
                  },
                  {
                      "value": "1003",
                      "label": "LA"
                  },
                  {
                      "value": "1004",
                      "label": "MA"
                  },
                  {
                      "value": "1005",
                      "label": "CA"
                  }
              ],
              "valueResp": "1004"
          },
          {
              "id": 65,
              "label": "Ayudar a la gente me hace sentir importante ",
              "nameImput": "question-select-65",
              "order": 65,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1006",
                      "label": "CD"
                  },
                  {
                      "value": "1007",
                      "label": "MD"
                  },
                  {
                      "value": "1008",
                      "label": "LD"
                  },
                  {
                      "value": "1009",
                      "label": "LA"
                  },
                  {
                      "value": "1010",
                      "label": "MA"
                  },
                  {
                      "value": "1011",
                      "label": "CA"
                  }
              ],
              "valueResp": "1007"
          },
          {
              "id": 66,
              "label": "Disfruto cuando me piden consejos",
              "nameImput": "question-select-66",
              "order": 66,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1012",
                      "label": "CD"
                  },
                  {
                      "value": "1013",
                      "label": "MD"
                  },
                  {
                      "value": "1014",
                      "label": "LD"
                  },
                  {
                      "value": "1015",
                      "label": "LA"
                  },
                  {
                      "value": "1016",
                      "label": "MA"
                  },
                  {
                      "value": "1017",
                      "label": "CA"
                  }
              ],
              "valueResp": "1016"
          },
          {
              "id": 67,
              "label": "Tener la oportunidad de mandar me llena de regocijo",
              "nameImput": "question-select-67",
              "order": 67,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1018",
                      "label": "CD"
                  },
                  {
                      "value": "1019",
                      "label": "MD"
                  },
                  {
                      "value": "1020",
                      "label": "LD"
                  },
                  {
                      "value": "1021",
                      "label": "LA"
                  },
                  {
                      "value": "1022",
                      "label": "MA"
                  },
                  {
                      "value": "1023",
                      "label": "CA"
                  }
              ],
              "valueResp": "1019"
          },
          {
              "id": 68,
              "label": "Disfruto mucho cuando tengo la responsabilidad de asignar tareas a otros",
              "nameImput": "question-select-68",
              "order": 68,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1024",
                      "label": "CD"
                  },
                  {
                      "value": "1025",
                      "label": "MD"
                  },
                  {
                      "value": "1026",
                      "label": "LD"
                  },
                  {
                      "value": "1027",
                      "label": "LA"
                  },
                  {
                      "value": "1028",
                      "label": "MA"
                  },
                  {
                      "value": "1029",
                      "label": "CA"
                  }
              ],
              "valueResp": "1024"
          },
          {
              "id": 69,
              "label": "Pienso que es mejor mandar que ser mandado",
              "nameImput": "question-select-69",
              "order": 69,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1030",
                      "label": "CD"
                  },
                  {
                      "value": "1031",
                      "label": "MD"
                  },
                  {
                      "value": "1032",
                      "label": "LD"
                  },
                  {
                      "value": "1033",
                      "label": "LA"
                  },
                  {
                      "value": "1034",
                      "label": "MA"
                  },
                  {
                      "value": "1035",
                      "label": "CA"
                  }
              ],
              "valueResp": "1035"
          },
          {
              "id": 70,
              "label": "Saberme responsable de mi grupo me hace saber vivir sensaciones especiales de plenitud y de realización personal",
              "nameImput": "question-select-70",
              "order": 70,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1036",
                      "label": "CD"
                  },
                  {
                      "value": "1037",
                      "label": "MD"
                  },
                  {
                      "value": "1038",
                      "label": "LD"
                  },
                  {
                      "value": "1039",
                      "label": "LA"
                  },
                  {
                      "value": "1040",
                      "label": "MA"
                  },
                  {
                      "value": "1041",
                      "label": "CA"
                  }
              ],
              "valueResp": "1038"
          },
          {
              "id": 71,
              "label": "Sé que tengo condiciones especiales para mandar",
              "nameImput": "question-select-71",
              "order": 71,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1042",
                      "label": "CD"
                  },
                  {
                      "value": "1043",
                      "label": "MD"
                  },
                  {
                      "value": "1044",
                      "label": "LD"
                  },
                  {
                      "value": "1045",
                      "label": "LA"
                  },
                  {
                      "value": "1046",
                      "label": "MA"
                  },
                  {
                      "value": "1047",
                      "label": "CA"
                  }
              ],
              "valueResp": "1044"
          },
          {
              "id": 72,
              "label": "Pienso que alguna vez seré una persona de mucha influencia",
              "nameImput": "question-select-72",
              "order": 72,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1048",
                      "label": "CD"
                  },
                  {
                      "value": "1049",
                      "label": "MD"
                  },
                  {
                      "value": "1050",
                      "label": "LD"
                  },
                  {
                      "value": "1051",
                      "label": "LA"
                  },
                  {
                      "value": "1052",
                      "label": "MA"
                  },
                  {
                      "value": "1053",
                      "label": "CA"
                  }
              ],
              "valueResp": "1053"
          },
          {
              "id": 73,
              "label": "Sí uno es líder está autorizado para usar los aportes de los demás en beneficios propios",
              "nameImput": "question-select-73",
              "order": 73,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1054",
                      "label": "CD"
                  },
                  {
                      "value": "1055",
                      "label": "MD"
                  },
                  {
                      "value": "1056",
                      "label": "LD"
                  },
                  {
                      "value": "1057",
                      "label": "LA"
                  },
                  {
                      "value": "1058",
                      "label": "MA"
                  },
                  {
                      "value": "1059",
                      "label": "CA"
                  }
              ],
              "valueResp": "1057"
          },
          {
              "id": 74,
              "label": "Para progresar en el trabajo lo importante es conseguirse la ayuda de gente poderosa",
              "nameImput": "question-select-74",
              "order": 74,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1060",
                      "label": "CD"
                  },
                  {
                      "value": "1061",
                      "label": "MD"
                  },
                  {
                      "value": "1062",
                      "label": "LD"
                  },
                  {
                      "value": "1063",
                      "label": "LA"
                  },
                  {
                      "value": "1064",
                      "label": "MA"
                  }
              ],
              "valueResp": "1062"
          },
          {
              "id": 75,
              "label": "Hay que ser fuerte con los demás para que entiendan bien las cosas ",
              "nameImput": "question-select-75",
              "order": 75,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1065",
                      "label": "CA"
                  },
                  {
                      "value": "1066",
                      "label": "CD"
                  },
                  {
                      "value": "1067",
                      "label": "MD"
                  },
                  {
                      "value": "1068",
                      "label": "LD"
                  },
                  {
                      "value": "1069",
                      "label": "LA"
                  },
                  {
                      "value": "1070",
                      "label": "MA"
                  },
                  {
                      "value": "1071",
                      "label": "CA"
                  }
              ],
              "valueResp": "1070"
          },
          {
              "id": 76,
              "label": "A la gente hay que tratarla duramente para que salga adelante",
              "nameImput": "question-select-76",
              "order": 76,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1072",
                      "label": "CD"
                  },
                  {
                      "value": "1073",
                      "label": "MD"
                  },
                  {
                      "value": "1074",
                      "label": "LD"
                  },
                  {
                      "value": "1075",
                      "label": "LA"
                  },
                  {
                      "value": "1076",
                      "label": "MA"
                  },
                  {
                      "value": "1077",
                      "label": "CA"
                  }
              ],
              "valueResp": "1076"
          },
          {
              "id": 77,
              "label": "Para conseguir cosas importantes a veces el engaño es necesario",
              "nameImput": "question-select-77",
              "order": 77,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1078",
                      "label": "CD"
                  },
                  {
                      "value": "1079",
                      "label": "MD"
                  },
                  {
                      "value": "1080",
                      "label": "LD"
                  },
                  {
                      "value": "1081",
                      "label": "LA"
                  },
                  {
                      "value": "1082",
                      "label": "MA"
                  },
                  {
                      "value": "1083",
                      "label": "CA"
                  }
              ],
              "valueResp": "1079"
          },
          {
              "id": 78,
              "label": "En toda organización hay lineamientos que deben ser cumplidos sin ningún cuestionamiento ",
              "nameImput": "question-select-78",
              "order": 78,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1084",
                      "label": "CD"
                  },
                  {
                      "value": "1085",
                      "label": "MD"
                  },
                  {
                      "value": "1086",
                      "label": "LD"
                  },
                  {
                      "value": "1087",
                      "label": "LA"
                  },
                  {
                      "value": "1088",
                      "label": "MA"
                  },
                  {
                      "value": "1089",
                      "label": "CA"
                  }
              ],
              "valueResp": "1088"
          },
          {
              "id": 79,
              "label": "En toda organización uno debe ser fiel a su jefe ",
              "nameImput": "question-select-79",
              "order": 79,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1090",
                      "label": "CD"
                  },
                  {
                      "value": "1091",
                      "label": "MD"
                  },
                  {
                      "value": "1092",
                      "label": "LD"
                  },
                  {
                      "value": "1093",
                      "label": "LA"
                  },
                  {
                      "value": "1094",
                      "label": "MA"
                  },
                  {
                      "value": "1095",
                      "label": "CA"
                  }
              ],
              "valueResp": "1095"
          },
          {
              "id": 80,
              "label": "Me siento más confiado cuando cuento con la aprobación de mis superiores ",
              "nameImput": "question-select-80",
              "order": 80,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1096",
                      "label": "CD"
                  },
                  {
                      "value": "1097",
                      "label": "MD"
                  },
                  {
                      "value": "1098",
                      "label": "LD"
                  },
                  {
                      "value": "1099",
                      "label": "LA"
                  },
                  {
                      "value": "1100",
                      "label": "MA"
                  },
                  {
                      "value": "1101",
                      "label": "CA"
                  }
              ],
              "valueResp": "1099"
          },
          {
              "id": 81,
              "label": "Cada vez que puedo, busco la oportunidad de reunirme con mis amigos ",
              "nameImput": "question-select-81",
              "order": 81,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1102",
                      "label": "CD"
                  },
                  {
                      "value": "1103",
                      "label": "MD"
                  },
                  {
                      "value": "1104",
                      "label": "LD"
                  },
                  {
                      "value": "1105",
                      "label": "LA"
                  },
                  {
                      "value": "1106",
                      "label": "MA"
                  },
                  {
                      "value": "1107",
                      "label": "CA"
                  }
              ],
              "valueResp": "1105"
          },
          {
              "id": 82,
              "label": "En ocasiones la preocupación por mis amigos me dificulta concentrarme en lo que estoy haciendo",
              "nameImput": "question-select-82",
              "order": 82,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1108",
                      "label": "CD"
                  },
                  {
                      "value": "1109",
                      "label": "MD"
                  },
                  {
                      "value": "1110",
                      "label": "LD"
                  },
                  {
                      "value": "1111",
                      "label": "LA"
                  },
                  {
                      "value": "1112",
                      "label": "MA"
                  },
                  {
                      "value": "1113",
                      "label": "CA"
                  }
              ],
              "valueResp": "1113"
          },
          {
              "id": 83,
              "label": "Evito enfrascarme en discusiones que pueda molestar a mis amigos ",
              "nameImput": "question-select-83",
              "order": 83,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1114",
                      "label": "CD"
                  },
                  {
                      "value": "1115",
                      "label": "MD"
                  },
                  {
                      "value": "1116",
                      "label": "LD"
                  },
                  {
                      "value": "1117",
                      "label": "LA"
                  },
                  {
                      "value": "1118",
                      "label": "MA"
                  },
                  {
                      "value": "1119",
                      "label": "CA"
                  }
              ],
              "valueResp": "1116"
          },
          {
              "id": 84,
              "label": "La cualidad que más me impacta de alguien es su amabilidad",
              "nameImput": "question-select-84",
              "order": 84,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1120",
                      "label": "CD"
                  },
                  {
                      "value": "1121",
                      "label": "MD"
                  },
                  {
                      "value": "1122",
                      "label": "LD"
                  },
                  {
                      "value": "1123",
                      "label": "LA"
                  },
                  {
                      "value": "1124",
                      "label": "MA"
                  },
                  {
                      "value": "1125",
                      "label": "CA"
                  }
              ],
              "valueResp": "1123"
          },
          {
              "id": 85,
              "label": "Me duele cuando un amigo se muestra distante conmigo",
              "nameImput": "question-select-85",
              "order": 85,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1126",
                      "label": "CD"
                  },
                  {
                      "value": "1127",
                      "label": "MD"
                  },
                  {
                      "value": "1128",
                      "label": "LD"
                  },
                  {
                      "value": "1129",
                      "label": "LA"
                  },
                  {
                      "value": "1130",
                      "label": "MA"
                  },
                  {
                      "value": "1131",
                      "label": "CA"
                  }
              ],
              "valueResp": "1129"
          },
          {
              "id": 86,
              "label": "Me preocupa cuando no le caigo bien a los demás ",
              "nameImput": "question-select-86",
              "order": 86,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1132",
                      "label": "CD"
                  },
                  {
                      "value": "1133",
                      "label": "MD"
                  },
                  {
                      "value": "1134",
                      "label": "LD"
                  },
                  {
                      "value": "1135",
                      "label": "LA"
                  },
                  {
                      "value": "1136",
                      "label": "MA"
                  },
                  {
                      "value": "1137",
                      "label": "CA"
                  }
              ],
              "valueResp": "1137"
          },
          {
              "id": 87,
              "label": "Planifico actividades en las cuales puedo reunirme con personas amistosas",
              "nameImput": "question-select-87",
              "order": 87,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1138",
                      "label": "CD"
                  },
                  {
                      "value": "1139",
                      "label": "MD"
                  },
                  {
                      "value": "1140",
                      "label": "LD"
                  },
                  {
                      "value": "1141",
                      "label": "LA"
                  },
                  {
                      "value": "1142",
                      "label": "MA"
                  },
                  {
                      "value": "1143",
                      "label": "CA"
                  }
              ],
              "valueResp": "1141"
          },
          {
              "id": 88,
              "label": "Soy capaz de hacer cualquier sacrificio con tal de mantener una amistad",
              "nameImput": "question-select-88",
              "order": 88,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1144",
                      "label": "CD"
                  },
                  {
                      "value": "1145",
                      "label": "MD"
                  },
                  {
                      "value": "1146",
                      "label": "LD"
                  },
                  {
                      "value": "1147",
                      "label": "LA"
                  },
                  {
                      "value": "1148",
                      "label": "MA"
                  },
                  {
                      "value": "1149",
                      "label": "CA"
                  }
              ],
              "valueResp": "1146"
          },
          {
              "id": 89,
              "label": "El trabajo es como la familia: Hay que ayudar y proteger a los demás cuando cometen errores",
              "nameImput": "question-select-89",
              "order": 89,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1150",
                      "label": "CD"
                  },
                  {
                      "value": "1151",
                      "label": "MD"
                  },
                  {
                      "value": "1152",
                      "label": "LD"
                  },
                  {
                      "value": "1153",
                      "label": "LA"
                  },
                  {
                      "value": "1154",
                      "label": "MA"
                  },
                  {
                      "value": "1155",
                      "label": "CA"
                  }
              ],
              "valueResp": "1152"
          },
          {
              "id": 90,
              "label": "En el trabajo, el éxito depende de la amistad entre los compañeros de equipo",
              "nameImput": "question-select-90",
              "order": 90,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1156",
                      "label": "CD"
                  },
                  {
                      "value": "1157",
                      "label": "MD"
                  },
                  {
                      "value": "1158",
                      "label": "LD"
                  },
                  {
                      "value": "1159",
                      "label": "LA"
                  },
                  {
                      "value": "1160",
                      "label": "MA"
                  },
                  {
                      "value": "1161",
                      "label": "CA"
                  }
              ],
              "valueResp": "1159"
          },
          {
              "id": 91,
              "label": "Lo más importante en el trabajo es que haya un clima de ayuda",
              "nameImput": "question-select-91",
              "order": 91,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1162",
                      "label": "CD"
                  },
                  {
                      "value": "1163",
                      "label": "MD"
                  },
                  {
                      "value": "1164",
                      "label": "LD"
                  },
                  {
                      "value": "1165",
                      "label": "LA"
                  },
                  {
                      "value": "1166",
                      "label": "MA"
                  },
                  {
                      "value": "1167",
                      "label": "CA"
                  }
              ],
              "valueResp": "1165"
          },
          {
              "id": 92,
              "label": "Para progresar en el trabajo lo importante es ser querido por todos",
              "nameImput": "question-select-92",
              "order": 92,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1168",
                      "label": "CD"
                  },
                  {
                      "value": "1169",
                      "label": "MD"
                  },
                  {
                      "value": "1170",
                      "label": "LD"
                  },
                  {
                      "value": "1171",
                      "label": "LA"
                  },
                  {
                      "value": "1172",
                      "label": "MA"
                  },
                  {
                      "value": "1173",
                      "label": "CA"
                  }
              ],
              "valueResp": "1171"
          },
          {
              "id": 93,
              "label": "A mi me satisfacen los resultados cuando todo el mundo está contento con ello",
              "nameImput": "question-select-93",
              "order": 93,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1174",
                      "label": "CD"
                  },
                  {
                      "value": "1175",
                      "label": "MD"
                  },
                  {
                      "value": "1176",
                      "label": "LD"
                  },
                  {
                      "value": "1177",
                      "label": "LA"
                  },
                  {
                      "value": "1178",
                      "label": "MA"
                  },
                  {
                      "value": "1179",
                      "label": "CA"
                  }
              ],
              "valueResp": "1179"
          },
          {
              "id": 94,
              "label": "Cuando un grupo fracasa, lo más importante es consolarse entre todos, después se trata de mejorar",
              "nameImput": "question-select-94",
              "order": 94,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1180",
                      "label": "CD"
                  },
                  {
                      "value": "1181",
                      "label": "MD"
                  },
                  {
                      "value": "1182",
                      "label": "LD"
                  },
                  {
                      "value": "1183",
                      "label": "LA"
                  },
                  {
                      "value": "1184",
                      "label": "MA"
                  },
                  {
                      "value": "1185",
                      "label": "CA"
                  }
              ],
              "valueResp": "1182"
          },
          {
              "id": 95,
              "label": "Los resultados son importantes, pero es más importante todavía que reine la armonía entre los miembros del grupo",
              "nameImput": "question-select-95",
              "order": 95,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1186",
                      "label": "CD"
                  },
                  {
                      "value": "1187",
                      "label": "MD"
                  },
                  {
                      "value": "1188",
                      "label": "LD"
                  },
                  {
                      "value": "1189",
                      "label": "LA"
                  },
                  {
                      "value": "1190",
                      "label": "MA"
                  },
                  {
                      "value": "1191",
                      "label": "CA"
                  }
              ],
              "valueResp": "1187"
          },
          {
              "id": 96,
              "label": "Para lograr buenos resultados lo más importante es que la gente se sienta cómoda y segura",
              "nameImput": "question-select-96",
              "order": 96,
              "inputType": {
                  "value": "1",
                  "label": "select"
              },
              "className": null,
              "required": true,
              "score": "1",
              "options": [
                  {
                      "value": "1192",
                      "label": "CD"
                  },
                  {
                      "value": "1193",
                      "label": "MD"
                  },
                  {
                      "value": "1194",
                      "label": "LD"
                  },
                  {
                      "value": "1195",
                      "label": "LA"
                  },
                  {
                      "value": "1196",
                      "label": "MA"
                  },
                  {
                      "value": "1197",
                      "label": "CA"
                  }
              ],
              "valueResp": "1195"
          }
      ]
  }`);
  }

  /**
   * stores user responses
   * @param form 
   */
  async onSubmit(form:NgForm){
    if(form.valid){
      console.log('instrument resp', this.instrument);
      console.log('instrument map',Instrument.mapForPost(this.instrument));
      await this.instrumentsService.storeInstrumetsResponse(Instrument.mapForPost(this.instrument))
    }

  }

  reset(form:NgForm){}

}
