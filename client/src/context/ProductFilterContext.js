import React, { createContext, useState, useContext } from "react";

const ProductFilterContext = createContext();

export const ProductFilterProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const resetCategory = () => setSelectedCategory(null);

  return (
    <ProductFilterContext.Provider
      value={{ selectedCategory, setSelectedCategory, resetCategory }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
};

export const useProductFilter = () => useContext(ProductFilterContext);
