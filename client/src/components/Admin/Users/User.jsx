import { PageContainer } from '@ant-design/pro-components'
import React from 'react'
import TableUser from './TableUser.jsx'

const User = () => {
  return (
    <>
      <PageContainer
        className="site-page-header"
        title="Quản lý người dùng"
      >
        <TableUser />
      </PageContainer>
    </>
  )
}

export default User