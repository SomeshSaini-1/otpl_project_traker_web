import React from 'react';
import { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const statusConfig = {
  'not-started': { label: 'Not Started', color: 'bg-gray-100 text-gray-800', dot: 'bg-gray-500' },
  'in-progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-800', dot: 'bg-blue-500' },
  'on-hold': { label: 'On Hold', color: 'bg-amber-100 text-amber-800', dot: 'bg-amber-500' },
  'completed': { label: 'Completed', color: 'bg-green-100 text-green-800', dot: 'bg-green-500' }
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const completedStages = project.stages.filter(s => s.completed).length;
  const progress = (completedStages / project.stages.length) * 100;
  const config = statusConfig[project.status || 'not-started'];

  // console.log(project)
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-5 cursor-pointer border border-gray-100 hover:border-blue-300"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex-1">{project.name}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color} flex items-center gap-1.5`}>
          <span className={`w-2 h-2 rounded-full ${config.dot}`}></span>
          {config.label}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{project.assignto}({project.department})</p>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-800">{completedStages}/{project.stages.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
