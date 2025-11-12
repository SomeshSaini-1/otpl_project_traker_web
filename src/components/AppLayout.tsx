import React, { useState, useMemo, useEffect } from 'react';
import { StatusCard } from './StatusCard';
import { ProjectCard } from './ProjectCard';
import { AddProjectModal } from './AddProjectModal';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import { fetchProjects } from '../data/sampleProjects';
import { Project, DEPARTMENTS } from '../types/project';
import axios from "axios";

export default function AppLayout() {
  // const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
      // console.log(data);
    };
    loadProjects(); // 👈 calls your function on component mount
  }, [projects]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const statusCounts = useMemo(() => {
    return {
      notStarted: projects.filter(p => p.status === 'not-started' || "").length,
      inProgress: projects.filter(p => p.status === 'in-progress').length,
      onHold: projects.filter(p => p.status === 'on-hold').length,
      completed: projects.filter(p => p.status === 'completed').length
    };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = filterDepartment === 'All' || project.department === filterDepartment;
      const matchesStatus = filterStatus === 'All' || project.status === filterStatus;
      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [projects, searchTerm, filterDepartment, filterStatus]);

  const handleAddProject = (newProject: Project) => {
    setProjects([...projects, newProject]);
  };

  const handleUpdateProject = async (projectId: string, updates: Partial<Project>) => {
    setProjects(projects.map(p => p.id === projectId ? { ...p, ...updates } : p));
    if (selectedProject?.id === projectId) {
      let data = { ...selectedProject, ...updates }
      setSelectedProject(data);
      console.log({ ...selectedProject, ...updates }, updates);

      try {
        console.log("json data",{
          id : data.id,
          project_name: data.name,
          department: data.department,
          // assignto : data?.assignto || "",
          status: data.status,
          project_stages: data.stages
        })
        const api = await axios.post("http://otpl_project_tacker_api.otplai.com/api/update_Project", {
          id : data.id,
          project_name: data.name,
          department: data.department,
          assignto : data?.assignto || "",
          status: data.status,
          project_stages: data.stages
        },
          { headers: { "Content-Type": "application/json" } }
        )


        console.log('Delete response:', api);
      } catch (error) {

      }
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {

      setProjects(projects.filter(p => p.id !== projectId));
      console.log(projectId);
      const prevProjects = projects;
      // Optimistically remove from UI
      setProjects(prev => prev.filter(p => p.id !== projectId));
      try {
        const { data } = await axios.post(
          "http://otpl_project_tacker_api.otplai.com/api/Delete_project",
          { id: projectId },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log('Delete response:', data);
      } catch (error) {
        // revert on failure
        setProjects(prevProjects);
        console.error('Failed to delete project', error);
      }
    } catch (error) {

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://d64gsuwffb70l.cloudfront.net/6909ffb1fd523310ff22df0f_1762263003422_92005ce6.webp"
            alt="Dashboard"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Project Management Dashboard</h1>
          <p className="text-xl text-blue-100 mb-8">Track and manage your department projects with ease</p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            + Add New Project
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatusCard
            title="Not Started"
            count={statusCounts.notStarted}
            total={projects.length}
            color="border-gray-500"
            icon={
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatusCard
            title="In Progress"
            count={statusCounts.inProgress}
            total={projects.length}
            color="border-blue-500"
            icon={
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />
          <StatusCard
            title="On Hold"
            count={statusCounts.onHold}
            total={projects.length}
            color="border-amber-500"
            icon={
              <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatusCard
            title="Completed"
            count={statusCounts.completed}
            total={projects.length}
            color="border-green-500"
            icon={
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Projects</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Departments</option>
                {DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Statuses</option>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="on-hold">On Hold</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            All Projects ({filteredProjects.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
          {filteredProjects.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <p className="text-gray-500 text-lg">No projects found matching your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProject}
      />
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        onUpdate={handleUpdateProject}
        onDelete={handleDeleteProject}
      />
    </div>
  );
}
