import React from 'react'
import tw from 'twin.macro';
import StatusOrder from './StatusOrder'
import { useParams } from 'react-router-dom';
import ServicesInfo from './ServicesInfo';
import CustomerInfo from './CustomerInfo';
import TabelOrderItems from './TabelOrderItems';


const OrderDetail = () => {
   const { orderId } = useParams();
    return (
        <div css={tw`pl-4`}>
            <h2 css={tw`text-lg text-blue-800`}>Thông tin đơn hàng #{orderId}</h2>
            <StatusOrder currentStep={3}  /><br />
            <div>
                <ServicesInfo />
                <CustomerInfo/>
                <TabelOrderItems />
            </div>
        </div>
    )
}

export default OrderDetail