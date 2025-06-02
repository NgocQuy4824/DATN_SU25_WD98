import { PageContainer } from '@ant-design/pro-components'
import React from 'react'
import TableComponent from '../../TableComponent/TableComponent.jsx'

const User = () => {
  return (
    <>
      <PageContainer
        className="site-page-header"
        title="Quản lý người dùng"
      >
        <TableComponent />
      </PageContainer>
    </>
  )
}

export default User