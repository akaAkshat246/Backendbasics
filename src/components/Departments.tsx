import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { DEPARTMENTS } from '../data/mockData';
import { Department } from '../types';

interface DepartmentsProps {
  onSelectDepartment: (dept: Department) => void;
  onExploreAll: () => void;
}

export const Departments: React.FC<DepartmentsProps> = ({
  onSelectDepartment,
  onExploreAll,
}) => {
  return (
    <section id="curated-departments-section" className="py-12 border-t border-neutral-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-blue-600 uppercase font-sans">
              ARCHITECTURAL TAXONOMY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 mt-1">
              Curated Departments
            </h2>
          </div>

          <button
            id="explore-all-classifications-btn"
            onClick={onExploreAll}
            className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-600 hover:text-black transition-colors cursor-pointer group self-start sm:self-auto"
          >
            <span>Explore all classifications</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* 6 Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {DEPARTMENTS.map((dept) => (
            <div
              key={dept.id}
              id={`department-card-${dept.slug}`}
              onClick={() => onSelectDepartment(dept)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Container with Badge */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-100 mb-3 border border-neutral-200/60 shadow-2xs group-hover:shadow-md transition-all duration-300">
                <img
                  src={dept.image}
                  alt={dept.name}
                  className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Count Badge in top right */}
                <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-mono font-bold text-neutral-800 shadow-2xs">
                  {dept.itemCount}
                </div>

                {/* Subtle Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
              </div>

              {/* Title & Count */}
              <div>
                <h3 className="text-sm font-bold text-neutral-900 group-hover:text-blue-600 transition-colors tracking-tight">
                  {dept.name}
                </h3>
                <p className="text-xs text-neutral-500 font-normal mt-0.5">
                  {dept.itemCount} items
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
