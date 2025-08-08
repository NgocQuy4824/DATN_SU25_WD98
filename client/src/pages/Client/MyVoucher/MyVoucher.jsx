import React from 'react'
import VoucherCard from './VoucherCard'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'


const MyVoucher = () => {
  
   
  return ( 
    <>
     <div style={{ padding: '12px', background: '#fff' }}>
      <Breadcrumb >
        <Breadcrumb.Item>
          <Link to="/">Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Mã giảm giá</Breadcrumb.Item>
      </Breadcrumb>
        <VoucherCard />
    </div>
    </>
   
  )
}

export default MyVoucher