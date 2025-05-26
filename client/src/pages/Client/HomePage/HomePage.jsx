import React from 'react'
import TypeProducts from '../../../components/Client/TypeProducts/TypeProducts'
import { WrapperTypeProduct } from './style'


const HomePage = () => {
  const arrType = [
    { id: 1, name: 'Giày Nam' },
    { id: 2, name: 'Giày Nữ' },
    { id: 3, name: 'Giày Trẻ Em' },
    { id: 4, name: 'Phụ Kiện' },
    { id: 5, name: 'Khuyến Mãi' }
  ]
  return (
    <div style={{ padding: '0 120px' }}>
      <WrapperTypeProduct>
      {arrType.map((item) => (
        <TypeProducts key={item.id} name={item.name} />
      ))}
      </WrapperTypeProduct>
      HomePage
    </div>
  )
}

export default HomePage