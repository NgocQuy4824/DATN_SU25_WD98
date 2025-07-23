
import React from 'react'
import tw from 'twin.macro'
import { Card, Input } from 'antd'
import {
  CreditCardOutlined,
  PercentageOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'

const { TextArea } = Input

const ServicesInfo = () => {
  return (
    <div css={tw`bg-white rounded-xl border border-gray-200 p-4 space-y-4`}>
      <div css={tw`flex justify-between items-center`}>
        <h2 css={tw`text-lg font-semibold text-gray-800`}>Thông tin dịch vụ</h2>
        <div css={tw`flex items-center text-green-600 font-medium`}>
          <CheckCircleOutlined css={tw`mr-1 text-base`} />
          Đã thanh toán
        </div>
      </div>


      <div css={tw`grid grid-cols-1 md:grid-cols-2 gap-4`}>
        <Card
          css={tw`border-gray-600 !bg-blue-50 !shadow-none`}
          bordered
          bodyStyle={{ display: 'flex', alignItems: 'center', padding: 14 }}
        >
          <CreditCardOutlined css={tw`text-blue-500 text-2xl mr-3`} />
          <div css={tw`space-y-1`}>
            <p css={tw`text-lg text-gray-600 leading-tight`}>Phương thức thanh toán</p>
            <p css={tw`font-semibold text-blue-800 leading-tight`}>Thanh toán khi nhận hàng</p>
          </div>
        </Card>


        <Card
          css={tw`border-gray-600 !bg-yellow-50 !shadow-none`}
          bordered
          bodyStyle={{ display: 'flex', alignItems: 'center', padding: 12 }}
        >
          <PercentageOutlined css={tw`text-yellow-500 text-2xl mr-3`} />
          <div css={tw`space-y-1`}>
            <p css={tw`text-lg text-gray-600 leading-tight`}>Thuế</p>
            <p css={tw`font-semibold text-yellow-800 leading-tight`}>0% VAT</p>
          </div>
        </Card>
      </div>

      <div>
        <label htmlFor="orderNote" css={tw`block text-lg font-semibold text-gray-800 mb-2`}>
          Ghi chú đơn hàng
        </label>
        <TextArea
          id="orderNote"
          rows={3}
          placeholder="Nhập ghi chú nếu có..."
          defaultValue="Cảm ơn bạn đã đặt hàng! Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất."
          className="rounded-lg"
        />
      </div>
    </div>
  )
}

export default ServicesInfo
