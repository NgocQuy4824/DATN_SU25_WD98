import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategoryOptions } from '../../../../hooks/useCategoryOptions';
import { useProductFilter } from '../../../../context/ProductFilterContext';

const CategoryClient = () => {
  const { options: categoryOptions } = useCategoryOptions();
  const { setSelectedCategory } = useProductFilter();
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'nowrap', fontSize: '16px', maxWidth:"500px"}}>
      {categoryOptions.map((category) => (
        <div
          key={category.value}
          onClick={() => {
            setSelectedCategory(category.value);
            navigate('/products');
          }}
          style={{
            textDecoration: 'none',
            color: '#333',
            cursor: 'pointer',
            
          }}
        >
          {category.label}
        </div>
      ))}
    </div>
  );
};

export default CategoryClient;
