import { IssueStatus, IssueType, IssuePriority } from "./issue-status";

import { PaginationResponse } from './../../../../../../../src/app/core/models/pagination-response';
import { AuthService } from './../../../../../../../src/app/core/services/auth.service';
import { environment } from './../../../../../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './../../../../../../../src/app/core/services/http.service';
import { Project } from './../../../../../../../src/app/core/models/project';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { SelectOption } from './../../../../../../../src/app/core/models/select-option';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from './../../../../../../../src/app/core/models/menu.model';
import { User } from './../../../../../../../src/app/core/models/user';
import { Spring } from './../../../../../../../src/app/core/models/spring';

export class JLane {
  id: IssueStatus;
  title: string;
  issues: JIssue[];

}

export interface JIssue {
  id: string;
  title: string;
  status: IssueStatus;
  type: IssueType;
  priority: IssuePriority;
  imagepriority: string;
  priorityactivitask: string;
}


export const MOCK_LANES: JLane[] = [
  {
    id: IssueStatus.BACKLOG,
    title: "ACTIVIDADES",
    "issues": [
      {
        id: "24",
        priority: IssuePriority.LOW,
        status: IssueStatus.BACKLOG,
        title: "Pruebas de Modulo de Gestión de Proyecto ACTIVIDAD 24",
        type: IssueType.ACTIVITY,
        imagepriority: "corner-right-up",
        priorityactivitask: "Alto"
      },
      {
        id: "1",
        priority: IssuePriority.HIGH,
        status: IssueStatus.BACKLOG,
        title: "Desarrollo de Modulo de Gestion de Proyecto ACT 1",
        type: IssueType.ACTIVITY,
        imagepriority: "corner-right-up",
        priorityactivitask: "Alto"
      }
    ]
  },
  {
    id: IssueStatus.SELECTED,
    title: "SELECCIONADO PARA DESARRO",
    "issues": [
      {
        id: "2",
        priority: IssuePriority.LOWEST,
        status: IssueStatus.SELECTED,
        title: "Crud de Proyect TAREA 1",
        type: IssueType.TASK,
        imagepriority: "corner-right-up",
        priorityactivitask: "Alto"
      },
      {
        id: "25",
        priority: IssuePriority.MEDIUM,
        status: IssueStatus.SELECTED,
        title: "Pruebas Modulo Gestión Proyecto TAREAAA 24",
        type: IssueType.TASK,
        imagepriority: "corner-right-up",
        priorityactivitask: "Alto"
      }
    ]
  },
  {
    id: IssueStatus.IN_PROGRESS,
    title: "EN PROGRESO",
    "issues": []
  },
  {
    id: IssueStatus.DONE,
    title: "LISTO",
    "issues": []
  }
];


export const MOCK_LANESorg: JLane[] = [
  {
    
    id: IssueStatus.BACKLOG,
    title: "ACTIVIDADES",
    issues: [
      {
        id: "244",
        priority: IssuePriority.LOW,
        status: IssueStatus.BACKLOG,
        title: "244",
        type: IssueType.ACTIVITY,
        imagepriority: "corner-right-up",
        priorityactivitask: "Alto"
      }
    ]
  },
  {
    id: IssueStatus.SELECTED,
    title: "SELECCIONADO123",
    issues: [
      {
        id: "245",
        priority: IssuePriority.LOW,
        status: IssueStatus.BACKLOG,
        title: "245",
        type: IssueType.ACTIVITY,
        imagepriority: "corner-right-up",
        priorityactivitask: "Alto"
      }
    ]
  },
  {
    id: IssueStatus.IN_PROGRESS,
    title: "EN PROGRESO",
    issues: [
      {
        id: "246",
        priority: IssuePriority.LOW,
        status: IssueStatus.BACKLOG,
        title: "246",
        type: IssueType.ACTIVITY,
        imagepriority: "corner-right-up",
        priorityactivitask: "Alto"
      }
    ]
  },
  {
    id: IssueStatus.DONE,
    title: "LISTO",
    issues: [
      {
        id: "247",
        priority: IssuePriority.LOW,
        status: IssueStatus.BACKLOG,
        title: "247",
        type: IssueType.ACTIVITY,
        imagepriority: "corner-right-up",
        priorityactivitask: "Alto"
      }
    ]
  }
];


export const MOCK_LANESact: JLane[] = [
  {
    id: IssueStatus.BACKLOG,
    title: "ACTIVIDADES",
    "issues": [
      {
        id: "24",
        priority: IssuePriority.LOW,
        status: IssueStatus.BACKLOG,
        title: "Pruebas de Modulo de Gestión de Proyecto ACTIVIDAD 24",
        type: IssueType.ACTIVITY,
        imagepriority: "corner-right-up",
        priorityactivitask: "Alto"
      },
      {
        id: "1",
        priority: IssuePriority.HIGH,
        status: IssueStatus.BACKLOG,
        title: "Desarrollo de Modulo de Gestion de Proyecto ACT 1",
        type: IssueType.ACTIVITY,
        imagepriority: "corner-right-up",
        priorityactivitask: "Alto"
      }
    ]
  },,
  {
    id: IssueStatus.SELECTED,
    title: "SELECCIONADO1",
    issues: [
    ]
  },
  {
    id: IssueStatus.IN_PROGRESS,
    title: "EN PROGRESO",
    issues: [
    ]
  },
  {
    id: IssueStatus.DONE,
    title: "LISTO",
    issues: [
    ]
  }
];

