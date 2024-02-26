import React from 'react';
import { BreadcrumbProps } from '../../../interfaces/general.interface';
import './Breadcrumb.scss';


export const BreadcrumbComponent: React.FC<BreadcrumbProps> = ({ categories }) => {
  return (
    <div className='breadcrumb--container'>
      {categories.map((category, index) => (
        <span key={category.id}>
          {index > 0 && ' > '}
          {category.name}
        </span>
      ))}
    </div>
  );
};
