import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import TableComponent from '../../TableComponent/TableComponent.jsx';


const Products = () => {
  return (
    <>
      <PageContainer
        className="site-page-header"
        title="Quản lý sản phẩm"
      >
        <TableComponent />
      </PageContainer>
    </>
  )
}

export default Products