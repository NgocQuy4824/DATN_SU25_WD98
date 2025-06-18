import { PageContainer } from '@ant-design/pro-components';
import React, { useState } from 'react';
import TableComponent from './TableProduct.jsx';
import { Button, Form } from 'antd';
import ModalCustom from './ModalCustom.jsx';
import { useCreateProduct, useDeleteProduct, useGetAllProducts, useHideProduct, useShowProduct, useUpdateProduct } from '../../../hooks/useProductHook.js';
import { useQueryClient } from '@tanstack/react-query';



const Products = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();
  const queryClient = useQueryClient(); 

  const { data: response, isLoading: loadingProducts } = useGetAllProducts();
  const products = response?.data ?? [];

  const { mutate: createProduct, isLoading: creating } = useCreateProduct(() => {
    form.resetFields();
    setModalOpen(false);
    setEditingProduct(null);
    queryClient.invalidateQueries(['products']);
  });

  const { mutate: updateProduct, isLoading: updating } = useUpdateProduct(() => {
    form.resetFields();
    setModalOpen(false);
    setEditingProduct(null);
    queryClient.invalidateQueries(['products']);
  });

  const { mutate: removeProduct, isLoading: deleting } = useDeleteProduct();

  const handleDeleteProduct = (productId) => {
    removeProduct(productId);
  };

  const { mutate: hideProduct } = useHideProduct();
  const { mutate: showProduct } = useShowProduct();

  //ẩn hiện sản phẩm 
  const handleToggleVisibility = (product) => {
    if (product.isActive) {
      hideProduct(product._id);
    } else {
      showProduct(product._id);
    }
  };


  const openAddModal = () => {
    setEditingProduct(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleSubmit = (productData) => {
    if (editingProduct) {
      updateProduct({ id: editingProduct._id, data: productData });
    } else {
      createProduct(productData);
    }
    setModalOpen(false);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    form.resetFields();
    setModalOpen(false);
  };


  return (
    <>
      <PageContainer
        className="site-page-header"
        title="Quản lý sản phẩm"
      >
        <Button type="primary" onClick={openAddModal}>
          Thêm sản phẩm
        </Button>

        <div style={{ marginTop: '20px' }}>
          <TableComponent onEdit={openEditModal} products={products} onDelete={handleDeleteProduct} loading={loadingProducts || deleting} handleToggleVisibility={handleToggleVisibility} />
        </div>
      </PageContainer>
      <ModalCustom
        form={form}
        open={modalOpen}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        initialValues={editingProduct ? { ...editingProduct, category: editingProduct.category?._id } : { variants: [] }}
        isEdit={!!editingProduct}
        setEditingProduct={setEditingProduct}
        isLoading={creating || updating}
      />
    </>
  )
}

export default Products