import { PageContainer } from '@ant-design/pro-components'
import React from 'react'
import TableUser from './TableUser.jsx'
import { useGetAllUsers } from '../../../hooks/useUsersHook.js';

const User = () => {

  const { data: response, isLoading: loadingUsers } = useGetAllUsers();
  const users  = response?.data ?? [];

  return (
    <>
      <PageContainer
        className="site-page-header"
        title="Quản lý người dùng"
      >
        <TableUser users={users} loading={loadingUsers} />
      </PageContainer>
    </>
  )
}

export default User