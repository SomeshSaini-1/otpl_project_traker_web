import React, { useState } from 'react';
import { DEPARTMENTS, DEFAULT_STAGES } from '../types/project';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (project: any) => void;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [Assignto, setAssignto] = useState('');
  const [mailstone, setmailstone] = useState([]);
  const [mailstone1, setmailstone1] = useState("");
  const [department, setDepartment] = useState(DEPARTMENTS[0]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProject = {
      id: Date.now().toString(),
      name: name.trim(),
      department,
      stages: DEFAULT_STAGES.map((stageName, index) => ({
        id: `stage-${Date.now()}-${index}`,
        name: stageName,
        completed: false
      })),
      status: 'not-started' as const,
      createdAt: new Date().toISOString().split('T')[0]
    };

    console.log(newProject);
    try {
      const jsondata = JSON.stringify({
        project_name: name.trim(),
        department: department,
        assignto: Assignto,
        status: "not-started",
        project_stages: mailstone.map((stageName, index) => ({
          id: `stage-${Date.now()}-${index}`,
          name: stageName,
          completed: false
        }))
      });

      // validate required fields
      if (!Assignto.trim() || mailstone.length === 0 || department === "") {
        alert("All fields are required.");
        return;
      }
      console.log(jsondata);

      const response = await fetch("http://otpl_project_tacker_api.otplai.com/api/Add_project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsondata
      });

      const res = await response.json();

      if (!response.ok) {
        console.error('API error', response.status, res);
        return;
      }

      console.log('API success', res);

      // onAdd(newProject);
      setName('');
      setAssignto('');
      setDepartment(DEPARTMENTS[0]);
      onClose();
    } catch (error) {
      console.error('Network or parsing error', error);
    }

  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter project name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assign to</label>
            <input
              type="text"
              value={Assignto}
              onChange={(e) => setAssignto(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Assign to"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stages </label>
            <span className='flex gap-2'>

              <input
                type="text"
                value={mailstone1}
                onChange={(e) => setmailstone1(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Assign to"
                  
              />
              
              <button type="button" onClick={() => { setmailstone(pro => [...pro, mailstone1]); setmailstone1("") }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" >
                  Add
              </button>

            </span>
            <div className='flex flex-wrap gap-2'>

              {mailstone.map((item, idx) => (

                <span className='flex gap-2'>
                  {item}
                  <button
                    type="button"
                    onClick={() => setmailstone(prev => prev.filter((_, i) => i !== idx))}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    x
                  </button>
                </span>

              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {/* <option defaultValue="" selected>Select Department</option> */}
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept || "Select Department"}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
