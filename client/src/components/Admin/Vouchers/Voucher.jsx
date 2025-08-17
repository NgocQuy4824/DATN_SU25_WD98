import { PageContainer } from '@ant-design/pro-components'
import { Button } from 'antd'
import React, { useState } from 'react'
import TableVoucher from './TableVoucher'
import { useGetAllVouchers } from '../../../hooks/useVoucherHook'
import ModalVoucher from './ModalVoucher'

const Voucher = () => {

  const { data: response, isLoading: loadingVouchers } = useGetAllVouchers();
  const vouchers = response?.data ?? [];

  const [openModal, setOpenModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const handleAdd = () => {
    setSelectedVoucher(null);
    setOpenModal(true);
  };

  const handleEdit = (voucher) => {
    setSelectedVoucher(voucher);
    setOpenModal(true);
  };

  return (
    <PageContainer
      className="site-page-header"
      title="Quản lý voucher"
    >
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: '20px' }}>
        Thêm voucher
      </Button>

      <div style={{ marginTop: '20px' }}>
        <TableVoucher vouchers={vouchers} loading={loadingVouchers} onEdit={handleEdit} />
      </div>
      <ModalVoucher
        open={openModal}
        onCancel={() => setOpenModal(false)}
        voucher={selectedVoucher}
        onSaved={() => {
          setOpenModal(false);
          setSelectedVoucher(null);
        }}
      />
    </PageContainer>
  )
}

export default Voucher