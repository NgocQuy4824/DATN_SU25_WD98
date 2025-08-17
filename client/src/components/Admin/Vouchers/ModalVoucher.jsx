import { Form, Modal } from 'antd'
import React, { useEffect } from 'react'
import FormVoucher from './FormVoucher';
import { useCreateVoucher, useUpdateVoucher } from '../../../hooks/useVoucherHook';
import moment from 'moment';

const ModalVoucher = ({ open, onCancel, voucher = null, onSaved }) => {
    const [form] = Form.useForm();

    const { mutate: createVoucher } = useCreateVoucher();
    const { mutate: updateVoucher} = useUpdateVoucher();

    useEffect(() => {
        if (open) {
            if (voucher) {
                // map date yêu cầu từ voucher sang định dạng moment
                const start = voucher.startDate ? moment(voucher.startDate) : null;
                const end = voucher.endDate ? moment(voucher.endDate) : null;

                form.setFieldsValue({
                    code: voucher.code,
                    description: voucher.description,
                    discountType: voucher.discountType,
                    discountValue: voucher.discountValue,
                    quantity: voucher.quantity,
                    dateRange: start && end ? [start, end] : undefined,
                });
            } else {
                form.resetFields();
            }
        }
    }, [open, voucher, form]);

    const handleSubmit = (values) => {
        const [start, end] = values.dateRange || [];
        const payload = {
            ...values,
            startDate: start?.toISOString(),
            endDate: end?.toISOString(),
        };
        // nếu có voucher thì cập nhật, nếu không thì tạo mới
        if (voucher && voucher._id) {
            updateVoucher(
                { id: voucher._id, updateData: payload },
                {
                    onSuccess: () => {
                        form.resetFields();
                        onSaved?.();
                        onCancel();
                    },
                    onError: (err) => {
                        console.error("Lỗi khi cập nhật voucher", err);
                    },
                }
            );
        } else {
            //tạo voucher
            createVoucher(payload, {
                onSuccess: () => {
                    form.resetFields();
                    onSaved?.();
                    onCancel();
                },
                onError: (err) => {
                    console.error("Lỗi khi tạo voucher", err);
                },
            });
        }
    };

    return (
        <Modal
            title={voucher ? "Cập nhật voucher" : "Thông tin voucher"}
            open={open}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            footer={null}
            destroyOnClose
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{}}>
                <FormVoucher form={form} mode={voucher ? 'edit' : 'create'} />
            </Form>
        </Modal>
    )
}

export default ModalVoucher;