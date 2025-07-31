import React from 'react';
import type { ReactNode } from "react";


interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  bordered?: boolean;
  shadow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  bordered = true,
  shadow = false,
}) => {
  const hoverClass = hover ? 'hover-lift' : '';
  const borderClass = bordered ? 'border border-gray-200' : '';
  const shadowClass = shadow ? 'shadow-md' : '';
  
  return (
    <div className={`bg-white ${borderClass} ${shadowClass} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`p-4 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const CardBody: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`p-4 border-t border-gray-200 bg-gray-50 ${className}`}>
      {children}
    </div>
  );
};