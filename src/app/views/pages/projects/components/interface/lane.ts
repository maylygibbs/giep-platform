import { IssueStatus, IssueType, IssuePriority } from "./issue-status";

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
}

export const MOCK_LANES: JLane[] = [
  {
    id: IssueStatus.BACKLOG,
    title: "TRABAJO PENDIENTE",
    issues: [
      {
        id: "0001",
        priority: IssuePriority.MEDIUM,
        status: IssueStatus.BACKLOG,
        title: "Mariano 1 08/2020",
        type: IssueType.STORY
      },
      {
        id: "0002",
        priority: IssuePriority.MEDIUM,
        status: IssueStatus.BACKLOG,
        title: "Mariano 1?",
        type: IssueType.STORY
      }
    ]
  },
  {
    id: IssueStatus.SELECTED,
    title: "SELECCIONADO PARA DESARROLLO",
    issues: [
      {
        id: "0003",
        priority: IssuePriority.MEDIUM,
        status: IssueStatus.SELECTED,
        title: "Mariano 2 management",
        type: IssueType.STORY
      }
    ]
  },
  {
    id: IssueStatus.IN_PROGRESS,
    title: "EN PROGRESO",
    issues: [
      {
        id: "0004",
        priority: IssuePriority.MEDIUM,
        status: IssueStatus.IN_PROGRESS,
        title: "Mariano 3",
        type: IssueType.STORY
      }
    ]
  },
  {
    id: IssueStatus.DONE,
    title: "LISTO",
    issues: [
      {
        id: "0005",
        priority: IssuePriority.MEDIUM,
        status: IssueStatus.DONE,
        title: "Mariano 5",
        type: IssueType.STORY
      }
    ]
  }
];
