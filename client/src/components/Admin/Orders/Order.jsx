import { PageContainer } from '@ant-design/pro-components'
import React from 'react'
import TableOrder from './TableOrder/TableOrder'
import { Outlet, useParams } from 'react-router-dom'

const Order = () => {
  const { orderId } = useParams();
  return (
    <>
      <PageContainer
        className="site-page-header"
        title="Quản lý đơn hàng"
      >
        {!orderId && <TableOrder />} 
        <Outlet/>
      </PageContainer>
    </>
  )
}

export default Order