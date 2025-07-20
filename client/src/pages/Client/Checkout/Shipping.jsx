import React from 'react'
import ProductsCheckOutItems from './_components/ProductsCheckOutItems'
import styled from 'styled-components'
import tw from 'twin.macro'
import { Title } from './checkOutStyle'
import './checkOutStyle'
const WrapperLayoutCheckout = styled.div`
    ${tw`grid grid-cols-[2fr,1fr] gap-3 mx-6 mt-8`}
`

const AddressInforWrapper = styled.div`

`
export default function Shipping() {
  return (
    <WrapperLayoutCheckout>
        {/* <AddressInforWrapper> */}
          <Title>Thông tin giao hàng</Title>
        {/* </AddressInforWrapper> */}
        <ProductsCheckOutItems/>
    </WrapperLayoutCheckout>
  )
}
