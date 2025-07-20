import React from 'react'
import { useSelector } from 'react-redux'
import { useMyCart } from '../../../../hooks/useCartHook'
import { Card } from 'antd'
import styled from 'styled-components'
import tw from 'twin.macro'
import '../checkOutStyle'
import { SubTitle } from '../checkOutStyle'

const DividerProductItems = styled.div`
    ${tw`border border-[#7f7f7f] border-solid p-6 rounded-lg`}
`

export default function ProductsCheckOutItems() {
    const {items: cartItems} = useSelector((state) => state.cart)
    const {data, isLoading} = useMyCart()
  return (
    <DividerProductItems>
        <SubTitle>Sản phẩm thanh toán</SubTitle>
        <div className='flex! '></div>
    </DividerProductItems>
  )
}
