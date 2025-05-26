import { SearchOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React from 'react'

const ButtonInputSearch = () => {
    return (
        <Input.Group compact>
            <Input placeholder="Tìm kiếm" style={{ width: 150, gap: 10, height: 22 }} />
            <Button icon={<SearchOutlined />} type="primary" style={{
                padding: '0 8px',
                height: 22,
                fontSize: 12,
            }}>
            </Button>
        </Input.Group>
    )
}

export default ButtonInputSearch