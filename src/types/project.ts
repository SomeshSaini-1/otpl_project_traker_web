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
  // '',
  'Hardware',
  'Firmware',
  'Software',
  'Production',
  'HR',
  'Finance',
  'Sales'
];

// export const DEFAULT_STAGES = [
//   'Planning',
//   'Design',
//   'Development',
//   'Testing',
//   'Review',
//   'Deployment',
//   'Completed'
// ];


export const  DEFAULT_STAGES = [{
    Hardware: [
      "Research",
      "Design",
      "Fabrication",
      "Testing",
      "Production",
      "Final Documentation"
    ],
    Firmware: [
      "Research",
      "Architecture Design",
      "F/W Development",
      "Integration",
      "Testing",
      "Final Documentation"
    ],
    Software: [
      "Research",
      "Architecture Design",
      "Front End Design",
      "Back End Design",
      "Integration",
      "Testing",
      "Final Documentation"
    ],
    Production: [
      "Procurement",
      "Sampling",
      "Production"
    ],
    HR: [
      "Interview",
      "Offer Letter",
      "Joining"
    ],
    Finance: [],
    Sales : []
  }]



