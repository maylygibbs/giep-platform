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
  submitted:boolean = false;

  constructor(private instrumentsService:InstrumentsService) { }

  async ngOnInit() {
    this.instrument = await this.instrumentsService.getInstrumentsById(this.instruments[0].id);
   /* this.instrument = JSON.parse(`{
    "id": 1,
    "name": "Inventario de Competencias Gerenciales",
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "623",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "624",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "625",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "626",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "627",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "623"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "629",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "630",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "631",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "632",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "633",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "632"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "635",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "636",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "637",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "638",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "639",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "636"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "641",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "642",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "643",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "644",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "645",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "641"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "647",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "648",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "649",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "650",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "651",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "650"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "653",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "654",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "655",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "656",
                    "label": "Medianamente de Acuerdo"
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
                    "label": "Completamente de Acuerdo"
                },
                {
                    "value": "658",
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "659",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "660",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "661",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "662",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "663",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "659"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "665",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "666",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "667",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "668",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "669",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "668"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "671",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "672",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "673",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "674",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "675",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "673"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "677",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "678",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "679",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "680",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "681",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "680"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "683",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "684",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "685",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "686",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "687",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "684"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "689",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "690",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "691",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "692",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "693",
                    "label": "Completamente de Acuerdo"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "695",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "696",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "697",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "698",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "699",
                    "label": "Completamente de Acuerdo"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "701",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "702",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "703",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "704",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "705",
                    "label": "Completamente de Acuerdo"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "707",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "708",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "709",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "710",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "711",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "708"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "713",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "714",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "715",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "716",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "717",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "716"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "719",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "720",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "721",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "722",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "723",
                    "label": "Completamente de Acuerdo"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "725",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "726",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "727",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "728",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "729",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "727"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "731",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "732",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "733",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "734",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "735",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "731"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "737",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "738",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "739",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "740",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "741",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "740"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "743",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "744",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "745",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "746",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "747",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "747"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "749",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "750",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "751",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "752",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "753",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "751"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "755",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "756",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "757",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "758",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "759",
                    "label": "Completamente de Acuerdo"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "761",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "762",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "763",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "764",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "765",
                    "label": "Completamente de Acuerdo"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "767",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "768",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "769",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "770",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "771",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "768"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "773",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "774",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "775",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "776",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "777",
                    "label": "Completamente de Acuerdo"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "779",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "780",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "781",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "782",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "783",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "781"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "785",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "786",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "787",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "788",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "789",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "787"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "791",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "792",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "793",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "794",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "795",
                    "label": "Completamente de Acuerdo"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "797",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "798",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "799",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "800",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "801",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "798"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "803",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "804",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "805",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "806",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "807",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "804"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "809",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "810",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "811",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "812",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "813",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "812"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "815",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "816",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "817",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "818",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "819",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "816"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "821",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "822",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "823",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "824",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "825",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "823"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "827",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "828",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "829",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "830",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "831",
                    "label": "Completamente de Acuerdo"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "833",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "834",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "835",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "836",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "837",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "833"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "839",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "840",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "841",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "842",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "843",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "841"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "845",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "846",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "847",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "848",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "849",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "846"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "851",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "852",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "853",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "854",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "855",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "855"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "857",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "858",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "859",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "860",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "861",
                    "label": "Completamente de Acuerdo"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "863",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "864",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "865",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "866",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "867",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "864"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "869",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "870",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "871",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "872",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "873",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "871"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "875",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "876",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "877",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "878",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "879",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "877"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "881",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "882",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "883",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "884",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "885",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "883"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "887",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "888",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "889",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "890",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "891",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "888"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "893",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "894",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "895",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "896",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "897",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "895"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "899",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "900",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "901",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "902",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "903",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "900"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "905",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "906",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "907",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "908",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "909",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "907"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "911",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "912",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "913",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "914",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "915",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "913"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "917",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "918",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "919",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "920",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "921",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "919"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "923",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "924",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "925",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "926",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "927",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "927"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "929",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "930",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "931",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "932",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "933",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "930"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "935",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "936",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "937",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "938",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "939",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "936"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "941",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "942",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "943",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "944",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "945",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "943"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "947",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "948",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "949",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "950",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "951",
                    "label": "Completamente de Acuerdo"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "953",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "954",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "955",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "956",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "957",
                    "label": "Completamente de Acuerdo"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "959",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "960",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "961",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "962",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "963",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "960"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "965",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "966",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "967",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "968",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "969",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "968"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "971",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "972",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "973",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "974",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "975",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "974"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "977",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "978",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "979",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "980",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "981",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "979"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "983",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "984",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "985",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "986",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "987",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "985"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "989",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "990",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "991",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "992",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "993",
                    "label": "Completamente de Acuerdo"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "995",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "996",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "997",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "998",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "999",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "995"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1001",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1002",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1003",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1004",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1005",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1005"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1007",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1008",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1009",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1010",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1011",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1006"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1013",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1014",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1015",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1016",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1017",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1014"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1019",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1020",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1021",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1022",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1023",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1020"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1025",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1026",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1027",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1028",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1029",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1025"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1031",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1032",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1033",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1034",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1035",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1034"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1037",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1038",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1039",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1040",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1041",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1039"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1043",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1044",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1045",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1046",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1047",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1045"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1049",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1050",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1051",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1052",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1053",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1051"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1055",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1056",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1057",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1058",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1059",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1056"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1061",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1062",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1063",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1064",
                    "label": "Medianamente de Acuerdo"
                }
            ],
            "valueResp": "1063"
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
                    "label": "Completamente de Acuerdo"
                },
                {
                    "value": "1066",
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1067",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1068",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1069",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1070",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1071",
                    "label": "Completamente de Acuerdo"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1073",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1074",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1075",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1076",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1077",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1073"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1079",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1080",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1081",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1082",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1083",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1080"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1085",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1086",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1087",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1088",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1089",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1086"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1091",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1092",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1093",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1094",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1095",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1093"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1097",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1098",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1099",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1100",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1101",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1100"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1103",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1104",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1105",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1106",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1107",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1106"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1109",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1110",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1111",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1112",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1113",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1111"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1115",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1116",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1117",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1118",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1119",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1117"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1121",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1122",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1123",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1124",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1125",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1124"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1127",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1128",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1129",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1130",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1131",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1128"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1133",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1134",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1135",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1136",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1137",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1134"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1139",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1140",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1141",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1142",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1143",
                    "label": "Completamente de Acuerdo"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1145",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1146",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1147",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1148",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1149",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1147"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1151",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1152",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1153",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1154",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1155",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1154"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1157",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1158",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1159",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1160",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1161",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1160"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1163",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1164",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1165",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1166",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1167",
                    "label": "Completamente de Acuerdo"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1169",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1170",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1171",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1172",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1173",
                    "label": "Completamente de Acuerdo"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1175",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1176",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1177",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1178",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1179",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1177"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1181",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1182",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1183",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1184",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1185",
                    "label": "Completamente de Acuerdo"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1187",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1188",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1189",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1190",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1191",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1188"
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
                    "label": "Completamente en Desacuerdo"
                },
                {
                    "value": "1193",
                    "label": "Medianamente en Desacuerdo"
                },
                {
                    "value": "1194",
                    "label": "Levementen Desacuerdo"
                },
                {
                    "value": "1195",
                    "label": "Levemente de Acuerdo"
                },
                {
                    "value": "1196",
                    "label": "Medianamente de Acuerdo"
                },
                {
                    "value": "1197",
                    "label": "Completamente de Acuerdo"
                }
            ],
            "valueResp": "1196"
        }
    ]
}`);*/
  }

  /**
   * stores user responses
   * @param form 
   */
  async onSubmit(form:NgForm){
    if(form.valid){
        this.submitted = true;
      console.log('instrument resp', this.instrument);
      console.log('instrument map',Instrument.mapForPost(this.instrument));
      await this.instrumentsService.storeInstrumetsResponse(Instrument.mapForPost(this.instrument))
      this.submitted = false;
    }

  }

  reset(form:NgForm){
      form.onReset();
      this.show = false;
  }

}
