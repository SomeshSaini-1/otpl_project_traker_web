
import { Project, DEFAULT_STAGES } from '../types/project';

// const createStages = (completedCount: number) => {
//   return DEFAULT_STAGES.map((name, index) => ({
//     id: `stage-${index}`,
//     name,
//     completed: index < completedCount
//   }));
// };


export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch('http://otpl_project_tacker_api.otplai.com/api/Get_project', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project_name: "all" }),
    });

    if (!response.ok) throw new Error('Failed to fetch projects');

    const result = await response.json();
    // console.log(result)
    // Ensure consistent shape with your Project type
    return result.map((item: any) => ({
      id: item._id || '', // fallback if id missing
      name: item.project_name,
      department: item.department,
      stages: item.project_stages || [], // can be JSON array
      status: item.status,
      createdAt: item.createdAt,
      assignto : item.assignto
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

  // fetchProjects();



// export const sampleProjects: Project[] = [
//   {
//     id: '1',
//     name: 'Website Redesign',
//     department: 'Design',
//     stages: createStages(5),
//     status: 'in-progress',
//     createdAt: '2025-01-15'
//   },
//   {
//     id: '2',
//     name: 'Mobile App Development',
//     department: 'Engineering',
//     stages: createStages(3),
//     status: 'in-progress',
//     createdAt: '2025-02-01'
//   },
//   {
//     id: '3',
//     name: 'Q1 Marketing Campaign',
//     department: 'Marketing',
//     stages: createStages(7),
//     status: 'completed',
//     createdAt: '2025-01-01'
//   },
//   {
//     id: '4',
//     name: 'CRM Integration',
//     department: 'Sales',
//     stages: createStages(2),
//     status: 'on-hold',
//     createdAt: '2025-02-10'
//   },
//   {
//     id: '5',
//     name: 'Employee Onboarding Portal',
//     department: 'HR',
//     stages: createStages(0),
//     status: 'not-started',
//     createdAt: '2025-03-01'
//   },
//   {
//     id: '6',
//     name: 'Budget Planning Tool',
//     department: 'Finance',
//     stages: createStages(4),
//     status: 'in-progress',
//     createdAt: '2025-01-20'
//   },
//   {
//     id: '7',
//     name: 'Inventory Management System',
//     department: 'Operations',
//     stages: createStages(6),
//     status: 'in-progress',
//     createdAt: '2025-01-10'
//   },
//   {
//     id: '8',
//     name: 'Product Roadmap 2025',
//     department: 'Product',
//     stages: createStages(7),
//     status: 'completed',
//     createdAt: '2024-12-15'
//   },
//   {
//     id: '9',
//     name: 'API Documentation',
//     department: 'Engineering',
//     stages: createStages(1),
//     status: 'on-hold',
//     createdAt: '2025-02-15'
//   },
//   {
//     id: '10',
//     name: 'Brand Identity Refresh',
//     department: 'Design',
//     stages: createStages(0),
//     status: 'not-started',
//     createdAt: '2025-03-05'
//   },
//   {
//     id: '11',
//     name: 'Sales Training Program',
//     department: 'Sales',
//     stages: createStages(5),
//     status: 'in-progress',
//     createdAt: '2025-01-25'
//   },
//   {
//     id: '12',
//     name: 'Social Media Strategy',
//     department: 'Marketing',
//     stages: createStages(4),
//     status: 'in-progress',
//     createdAt: '2025-02-05'
//   }
// ];
