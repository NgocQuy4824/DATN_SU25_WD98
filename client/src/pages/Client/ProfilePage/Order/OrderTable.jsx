import React, { useState, useMemo } from "react";
import { Table, Tag, Input, Radio, Button } from "antd";
import { useGetMyOrder } from "../../../../hooks/useOrderHook";
import { FilterFilled } from "@ant-design/icons";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const statusMap = {
  pending: { color: "default", label: "Chờ xác nhận" },
  confirmed: { color: "blue", label: "Đã xác nhận" },
  delivered: { color: "purple", label: "Đã giao" },
  cancelled: { color: "red", label: "Đã hủy" },
  completed: { color: "green", label: "Hoàn thành" },
};

const searchFields = [
  { label: "Mã đơn hàng", value: "_id" },
  { label: "Tên người nhận", value: "receiverInfo.name" },
  { label: "SĐT người nhận", value: "receiverInfo.phone" },
  { label: "Email người nhận", value: "receiverInfo.email" },
  { label: "Tên người đặt", value: "customerInfo.name" },
  { label: "SĐT người đặt", value: "customerInfo.phone" },
];

const OrderTable = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    sortBy: null,
    sortOrder: "desc",
    search: "",
    searchField: "_id",
    status: "",
  });

  const { data, isLoading } = useGetMyOrder(params);
  const navigate = useNavigate();
  const handleTableChange = (pagination, filters, sorter) => {
    const sortField = sorter.field;
    const sortOrder =
      sorter.order === "ascend"
        ? "asc"
        : sorter.order === "descend"
        ? "desc"
        : undefined;

    setParams((prev) => {
      const updated = {
        ...prev,
        page: pagination.current,
        limit: pagination.pageSize,
        sortBy: sortField || prev.sortBy,
        sortOrder: sortOrder || prev.sortOrder,
        status: filters.status?.[0] || "",
      };

      if (!sortField || !sortOrder) {
        delete updated.sortBy;
        delete updated.sortOrder;
      }

      return updated;
    });
  };

  const handleSearch = (e) => {
    setParams((prev) => ({
      ...prev,
      page: 1,
      search: e.target.value,
    }));
  };

  const columns = useMemo(() => {
    const getSortOrder = (field) => {
      return params.sortBy === field
        ? params.sortOrder === "asc"
          ? "ascend"
          : "descend"
        : null;
    };

    return [
      {
        title: "ID",
        dataIndex: "_id",
        key: "_id",
      },
      {
        title: "Người nhận",
        dataIndex: "receiverInfo",
        key: "receiverInfo",
        render: (items) => `${items.name}`,
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Radio.Group
              value={selectedKeys[0]}
              onChange={(e) =>
                setSelectedKeys(e.target.value ? [e.target.value] : [])
              }
              style={{ display: "flex", flexDirection: "column", gap: 4 }}
            >
              {Object.entries(statusMap).map(([value, { label }]) => (
                <Radio key={value} value={value}>
                  {label}
                </Radio>
              ))}
            </Radio.Group>
            <div
              style={{
                marginTop: 8,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button type="primary" onClick={() => confirm()} size="small">
                OK
              </Button>
              <Button onClick={() => clearFilters()} size="small">
                Đặt lại
              </Button>
            </div>
          </div>
        ),
        filterIcon: (filtered) => (
          <FilterFilled style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        filteredValue: params.status ? [params.status] : null,
        onFilter: () => true, // giữ để bật icon, không dùng để lọc
        render: (status) => {
          const { color, label } = statusMap[status] || {
            color: "default",
            label: status,
          };
          return <Tag color={color}>{label}</Tag>;
        },
      },

      {
        title: "Tổng tiền",
        dataIndex: "totalPrice",
        key: "totalPrice",
        sorter: true,
        sortOrder: getSortOrder("totalPrice"),
        render: (totalPrice) => `${totalPrice.toLocaleString("vi-VN")} ₫`,
      },
      {
        title: "Ngày tạo",
        dataIndex: "createdAt",
        key: "createdAt",
        sorter: true,
        sortOrder: getSortOrder("createdAt"),
        render: (createdAt) => new Date(createdAt).toLocaleString("vi-VN"),
      },
      {
        title: "Xem chi tiết",
        key: "detail",
        render: (record) => (
          <Button
            type="primary"
            onClick={() => navigate(`/profile/orders/detail/${record._id}`)}
          >
            Xem chi tiết
          </Button>
        ),
      },
    ];
  }, [params.sortBy, params.sortOrder, params.status]);

  return (
    <div>
      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        <Input.Search
          placeholder="Tìm kiếm đơn hàng"
          onChange={handleSearch}
          value={params.search}
          allowClear
          style={{ width: 300 }}
        />
        <Select
          value={params.searchField}
          onChange={(value) =>
            setParams((prev) => ({
              ...prev,
              page: 1,
              searchField: value,
            }))
          }
          style={{ width: 180 }}
          placeholder="Chọn trường tìm kiếm"
        >
          {searchFields.map((field) => (
            <Option key={field.value} value={field.value}>
              {field.label}
            </Option>
          ))}
        </Select>
        <Button
          onClick={() =>
            setParams({
              page: 1,
              limit: 10,
              sortBy: "createdAt",
              sortOrder: "desc",
              search: "",
              status: "",
            })
          }
        >
          Đặt lại bộ lọc
        </Button>
      </div>

      <Table
        rowKey="_id"
        loading={isLoading}
        dataSource={data?.docs || []}
        columns={columns}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.totalDocs || 0,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default OrderTable;
