export type ProjectStatus = 'not-started' | 'in-progress' | 'on-hold' | 'completed';

export interface ProjectStage {
  id: string;
  name: string;
  completed: boolean;
}

export interface Project {
  id: string;
  name: string;
  department: string;
  assignto : string;
  stages: ProjectStage[];
  status: ProjectStatus;
  createdAt: string;
}

export const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Sales',
  'Operations',
  'HR',
  'Finance',
  'Design',
  'Product'
];

export const DEFAULT_STAGES = [
  'Planning',
  'Design',
  'Development',
  'Testing',
  'Review',
  'Deployment',
  'Completed'
];
