import React, { useState } from 'react';
import { Project, ProjectStatus } from '../types/project';
import { StageProgress } from './StageProgress';

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (projectId: string, updates: Partial<Project>) => void;
  onDelete: (projectId: string) => void;
}

const statusOptions: { value: ProjectStatus; label: string; color: string }[] = [
  { value: 'not-started', label: 'Not Started', color: 'bg-gray-100 text-gray-800' },
  { value: 'in-progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  { value: 'on-hold', label: 'On Hold', color: 'bg-amber-100 text-amber-800' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' }
];

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  isOpen,
  onClose,
  onUpdate,
  onDelete
}) => {
  const [localProject, setLocalProject] = useState<Project | null>(project);

  React.useEffect(() => {
    setLocalProject(project);
  }, [project]);

  if (!isOpen || !localProject) return null;

  const handleStageToggle = (stageId: string) => {
    const updatedStages = localProject.stages.map(stage =>
      stage.id === stageId ? { ...stage, completed: !stage.completed } : stage
    );
    const updatedProject = { ...localProject, stages: updatedStages };
    setLocalProject(updatedProject);
    onUpdate(localProject.id, { stages: updatedStages });
  };

  const handleStatusChange = (status: ProjectStatus) => {
    const updatedProject = { ...localProject, status };
    setLocalProject(updatedProject);
    onUpdate(localProject.id, { status });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this project?')) {
      onDelete(localProject.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{localProject.name}</h2>
            <p className="text-gray-600 mt-1">{localProject.department}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Project Status</label>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleStatusChange(option.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    localProject.status === option.value
                      ? option.color + ' ring-2 ring-offset-2 ring-blue-500'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Stages</h3>
            <StageProgress 
              stages={localProject.stages} 
              onStageToggle={handleStageToggle}
              editable={true}
            />
          </div>

          <div className="pt-4 border-t border-gray-200 flex gap-3">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete Project
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
