import React from 'react';
import { Link } from 'react-router-dom';
import type {Course}  from '../../types/course';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white border border-gray-200 hover-lift overflow-hidden">
      <div className="h-40 bg-gray-200 relative">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        {course.isNew && (
          <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1">
            Novo
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-primary mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
        
        {course.progress !== undefined && (
          <>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-secondary h-2 rounded-full"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Progresso</span>
              <span className="text-primary font-medium">{course.progress}%</span>
            </div>
          </>
        )}
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <Link
          to={`/membro/cursos/${course.id}`}
          className="text-secondary hover:text-primary flex items-center justify-center"
        >
          <span>{course.progress !== undefined && course.progress > 0 ? 'Continuar' : 'Iniciar'}</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};