import React from 'react';
import { ProjectStage } from '../types/project';

interface StageProgressProps {
  stages: ProjectStage[];
  onStageToggle?: (stageId: string) => void;
  editable?: boolean;
}

export const StageProgress: React.FC<StageProgressProps> = ({ stages, onStageToggle, editable = false }) => {
  const completedCount = stages.filter(s => s.completed).length;
  const progress = (completedCount / stages.length) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600 font-medium">Progress</span>
        <span className="text-gray-800 font-semibold">{completedCount}/{stages.length} stages</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="space-y-2 mt-4">
        {stages.map((stage) => (
          <div key={stage.id} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={stage.completed}
              onChange={() => editable && onStageToggle?.(stage.id)}
              disabled={!editable}
              className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:cursor-default"
            />
            <span className={`text-sm ${stage.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
              {stage.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
