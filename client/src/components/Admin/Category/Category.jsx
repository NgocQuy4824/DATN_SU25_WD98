import { PageContainer } from '@ant-design/pro-components'
import { Button } from 'antd'
import React, { useState } from 'react'
import TableCategory from './TableCategory'
import { useGetAllCategory } from '../../../hooks/useCategoryHook'

const Category = () => {

    const [categoryList, setCategoryList] = useState([])

    useGetAllCategory((data) => {
        setCategoryList(data);
    });

    return (
        <>
            <PageContainer
                className="site-page-header"
                title="Quản lý danh mục"
            >
                <Button type="primary">
                    Thêm danh mục
                </Button>

                <div style={{ marginTop: '20px' }}>
                    <TableCategory category={categoryList}/>
                </div>
            </PageContainer>
        </>
    )
}

export default Category